import { useState } from "react";
import adminOrdersData from "../../json/adminOrders.json";
import AdminOrdersTable from "../../components/myOrderComponents/AdminOrdersTable";
import OrderDetailModal from "../../components/myOrderComponents/OrderDetailModal";
import PriceInputModal from "../../components/myOrderComponents/PriceInputModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(adminOrdersData.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderForPrice, setSelectedOrderForPrice] = useState(null);

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "Dibatalkan" } : order
    ));
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    document.getElementById('order_detail_modal').showModal();
  };

  const handleInputPrice = (order) => {
    setSelectedOrderForPrice(order);
    document.getElementById('price_input_modal').showModal();
  };

  const handleSavePrice = (orderId, price) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, price: price, status: "Sedang Diproses" } : order
    ));
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Kelola Pesanan</h1>
        
        <AdminOrdersTable 
          orders={orders}
          onViewDetail={handleViewDetail}
          onInputPrice={handleInputPrice}
          onCancelOrder={handleCancelOrder}
        />

        <OrderDetailModal order={selectedOrder} />
        <PriceInputModal 
          order={selectedOrderForPrice} 
          onSavePrice={handleSavePrice}
        />
      </div>
    </div>
  );
}
