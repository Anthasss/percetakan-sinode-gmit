import PropTypes from 'prop-types';

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
      "Sedang Diproses": "badge-warning",
      "Selesai": "badge-success",
      "Menunggu Pembayaran": "badge-info",
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
              <td className="font-semibold">{order.productTitle}</td>
              <td>{order.quantity}</td>
              <td>{formatCurrency(order.price)}</td>
              <td>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {order.status}
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

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    productTitle: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onViewDetail: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
};
