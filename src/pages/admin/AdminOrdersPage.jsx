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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderForPrice, setSelectedOrderForPrice] = useState(null);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders for admin
  useEffect(() => {
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

    fetchOrders();
  }, [isAuthenticated]);

  const handleCancelOrder = async (orderId) => {
    try {
      await orderApi.update(orderId, { status: "cancelled" });
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: "cancelled" } : order
      ));
      
      toast.success('Order cancelled successfully');
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error('Failed to cancel order. Please try again.');
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
      await orderApi.updatePrice(orderId, price);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, price: price } : order
      ));
      
      toast.success('Price updated successfully');
    } catch (err) {
      console.error('Error updating price:', err);
      toast.error('Failed to update price. Please try again.');
    }
  };

  const handleSaveStatus = async (orderId, status) => {
    try {
      await orderApi.update(orderId, { status });
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: status } : order
      ));
      
      toast.success('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status. Please try again.');
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
        <h1 className="text-3xl font-bold mb-6">Kelola Pesanan</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="alert alert-info">
            <span>No orders found.</span>
          </div>
        ) : (
          <AdminOrdersTable 
            orders={orders}
            onViewDetail={handleViewDetail}
            onInputPrice={handleInputPrice}
            onChangeStatus={handleChangeStatus}
            onCancelOrder={handleCancelOrder}
          />
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
