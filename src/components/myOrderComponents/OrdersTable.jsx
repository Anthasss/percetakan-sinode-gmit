export default function OrdersTable({ orders, onViewDetail, onCancelOrder }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "pending": "badge-info",
      "processing": "badge-warning",
      "completed": "badge-success",
      "cancelled": "badge-error",
      // Legacy Indonesian status (for backward compatibility)
      "Sedang Diproses": "badge-warning",
      "Selesai": "badge-success",
      "Menunggu Pembayaran": "badge-info",
      "Dibatalkan": "badge-error"
    };
    return statusColors[status] || "badge-ghost";
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      "pending": "Menunggu Pembayaran",
      "processing": "Sedang Diproses",
      "completed": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return statusLabels[status] || status;
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>No.</th>
            <th>Produk</th>
            <th>Kuantitas</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td className="font-semibold">{order.productTitle || order.product?.title || `Product #${order.productId}`}</td>
              <td>{order.orderSpecifications?.quantity || order.quantity || '-'}</td>
              <td>{order.price ? formatCurrency(order.price) : 'Belum ditentukan'}</td>
              <td>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => onViewDetail(order)}
                  >
                    Detail
                  </button>
                  {order.status !== "cancelled" && order.status !== "completed" && 
                   order.status !== "Dibatalkan" && order.status !== "Selesai" && (
                    <button 
                      className="btn btn-sm btn-error"
                      onClick={() => onCancelOrder(order.id)}
                    >
                      Batalkan
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
