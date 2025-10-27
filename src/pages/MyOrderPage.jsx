import { useState, useEffect } from "react";
import OrdersTable from "../components/myOrderComponents/OrdersTable";
import OrderDetailModal from "../components/myOrderComponents/OrderDetailModal";
import { useAuthWithBackend } from "../hooks/useAuthWithBackend";
import apiClient from "../services/api";

export default function MyOrderPage() {
  const { isAuthenticated, user, backendUser } = useAuthWithBackend();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders for the current user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const userId = user.sub;
        const fetchedOrders = await apiClient.orders.getAll({ userId });
        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, user]);

  const handleCancelOrder = async (orderId) => {
    try {
      await apiClient.orders.update(orderId, { status: "cancelled" });
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: "cancelled" } : order
      ));
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    document.getElementById('order_detail_modal').showModal();
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-lg">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pesanan Saya</h1>
        
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
            <span>You don't have any orders yet.</span>
          </div>
        ) : (
          <OrdersTable 
            orders={orders}
            onViewDetail={handleViewDetail}
            onCancelOrder={handleCancelOrder}
          />
        )}

        <OrderDetailModal order={selectedOrder} />
      </div>
    </div>
  );
}