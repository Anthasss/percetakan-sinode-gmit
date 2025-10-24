import { useState } from "react";
import ordersData from "../json/orders.json";
import OrdersTable from "../components/myOrderComponents/OrdersTable";
import OrderDetailModal from "../components/myOrderComponents/OrderDetailModal";

export default function MyOrderPage() {
  const [orders, setOrders] = useState(ordersData.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "Dibatalkan" } : order
    ));
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    document.getElementById('order_detail_modal').showModal();
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pesanan Saya</h1>
        
        <OrdersTable 
          orders={orders}
          onViewDetail={handleViewDetail}
          onCancelOrder={handleCancelOrder}
        />

        <OrderDetailModal order={selectedOrder} />
      </div>
    </div>
  );
}