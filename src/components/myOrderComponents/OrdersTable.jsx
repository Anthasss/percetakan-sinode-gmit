import { FileText } from "lucide-react";

export default function OrdersTable({ orders, onViewDetail, onCancelOrder, currentPage = 1, itemsPerPage = 10 }) {
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
            <th>Files</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
            const fileCount = order.orderSpecifications?.files?.length || 0;
            return (
              <tr key={order.id}>
                <td>{globalIndex}</td>
                <td className="font-semibold">{order.productTitle || order.product?.title || `Product #${order.productId}`}</td>
              <td>{order.orderSpecifications?.quantity || order.quantity || '-'}</td>
              <td>
                {fileCount > 0 ? (
                  <div className="flex items-center gap-1 text-sm">
                    <FileText className="h-4 w-4" />
                    <span>{fileCount}</span>
                  </div>
                ) : (
                  <span className="text-base-content/50">-</span>
                )}
              </td>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
