import { useState, useEffect } from "react";
import AdminOrdersTable from "../../components/myOrderComponents/AdminOrdersTable";
import OrderDetailModal from "../../components/myOrderComponents/OrderDetailModal";
import PriceInputModal from "../../components/myOrderComponents/PriceInputModal";
import StatusUpdateModal from "../../components/myOrderComponents/StatusUpdateModal";
import { useAuthWithBackend } from "../../hooks/useAuthWithBackend";
import { orderApi } from "../../services/orderApi";
import toast from "../../utils/toast";

export default function AdminOrdersPage() {
  const { isAuthenticated, backendUser } = useAuthWithBackend();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderForPrice, setSelectedOrderForPrice] = useState(null);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all orders for admin
  const fetchOrders = async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch all orders (no filter for admin)
      const fetchedOrders = await orderApi.getAll();
      setOrders(fetchedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  // Filter orders whenever orders or statusFilter changes
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
    // Reset to first page when filter changes
    setCurrentPage(1);
  }, [orders, statusFilter]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = () => {
    fetchOrders();
    toast.success('Orders refreshed');
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCancelOrder = async (orderId) => {
    const reason = prompt('Alasan pembatalan (opsional):');
    if (reason === null) return; // User cancelled the prompt
    
    try {
      await orderApi.cancel(orderId, reason);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: "Dibatalkan" } : order
      ));
      
      toast.success('Pesanan berhasil dibatalkan');
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error(err.message || 'Gagal membatalkan pesanan');
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    document.getElementById('order_detail_modal').showModal();
  };

  const handleInputPrice = (order) => {
    setSelectedOrderForPrice(order);
    document.getElementById('price_input_modal').showModal();
  };

  const handleChangeStatus = (order) => {
    setSelectedOrderForStatus(order);
    document.getElementById('status_update_modal').showModal();
  };

  const handleSavePrice = async (orderId, price) => {
    try {
      // Use new setPrice endpoint which automatically changes status
      const updatedOrder = await orderApi.setPrice(orderId, price);
      
      // Update local state with the updated order
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      toast.success('Harga berhasil ditetapkan dan status diubah ke "Menunggu Persetujuan Pembeli"');
    } catch (err) {
      console.error('Error setting price:', err);
      toast.error(err.message || 'Gagal menetapkan harga');
    }
  };

  const handleSaveStatus = async (orderId, status) => {
    try {
      const updatedOrder = await orderApi.updateStatus(orderId, status);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      toast.success('Status berhasil diupdate');
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error(err.message || 'Gagal mengupdate status');
    }
  };

  // Check if user is admin
  if (!isLoading && isAuthenticated && backendUser?.role !== 'admin') {
    return (
      <div className="w-full min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-lg">You need to be logged in as an admin to view orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Pesanan</h1>
          <button 
            className="btn btn-primary"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Memuat...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-medium">Filter by Status:</label>
          <select 
            className="select select-bordered w-full max-w-xs"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="all">Semua Status</option>
            <option value="Menunggu Harga dari Admin">Menunggu Harga dari Admin</option>
            <option value="Menunggu Persetujuan Pembeli">Menunggu Persetujuan Pembeli</option>
            <option value="Sedang Diproses">Sedang Diproses</option>
            <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
          <span className="badge badge-neutral whitespace-nowrap">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="alert alert-info">
            <span>
              {statusFilter === "all" 
                ? "No orders found." 
                : `No orders found with status "${statusFilter}".`}
            </span>
          </div>
        ) : (
          <>
            <AdminOrdersTable 
              orders={currentOrders}
              onViewDetail={handleViewDetail}
              onInputPrice={handleInputPrice}
              onChangeStatus={handleChangeStatus}
              onCancelOrder={handleCancelOrder}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button 
                  className="btn btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          className={`btn btn-sm ${currentPage === pageNumber ? 'btn-primary' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button 
                  className="btn btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <OrderDetailModal order={selectedOrder} />
        <PriceInputModal 
          order={selectedOrderForPrice} 
          onSavePrice={handleSavePrice}
        />
        <StatusUpdateModal 
          order={selectedOrderForStatus} 
          onSaveStatus={handleSaveStatus}
        />
      </div>
    </div>
  );
}
