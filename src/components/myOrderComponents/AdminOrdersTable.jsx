export default function AdminOrdersTable({ orders, onViewDetail, onInputPrice, onCancelOrder }) {
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) {
      return '-';
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "Menunggu Konfirmasi": "badge-warning",
      "Sedang Diproses": "badge-info",
      "Selesai": "badge-success",
      "Dibatalkan": "badge-error"
    };
    return statusColors[status] || "badge-ghost";
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama User</th>
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
              <td className="font-medium">{order.userName}</td>
              <td className="font-semibold">{order.productTitle}</td>
              <td>{order.quantity}</td>
              <td>{formatCurrency(order.price)}</td>
              <td>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => onViewDetail(order)}
                  >
                    Detail
                  </button>
                  {(order.price === null || order.price === undefined) && (
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => onInputPrice(order)}
                    >
                      Input Harga
                    </button>
                  )}
                  {order.status !== "Dibatalkan" && order.status !== "Selesai" && (
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
