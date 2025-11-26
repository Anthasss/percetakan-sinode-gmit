import { FileText } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function AdminOrdersTable({ orders, onViewDetail, onInputPrice, onCancelOrder, onChangeStatus, currentPage = 1, itemsPerPage = 10 }) {
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, orderId: null });
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
      "pending": "badge-warning",
      "processing": "badge-info",
      "completed": "badge-success",
      "cancelled": "badge-error",
      // Legacy Indonesian status
      "Menunggu Konfirmasi": "badge-warning",
      "Sedang Diproses": "badge-info",
      "Selesai": "badge-success",
      "Dibatalkan": "badge-error"
    };
    return statusColors[status] || "badge-ghost";
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      "pending": "Menunggu harga dari admin",
      "processing": "Dalam progres",
      "completed": "Siap diambil",
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
            <th>Nama User</th>
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
                <td className="font-medium">{order.user?.name || order.userName || 'Unknown User'}</td>
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
              <td>{formatCurrency(order.price)}</td>
              <td>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {getStatusLabel(order.status)}
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
                  {order.status !== "cancelled" && order.status !== "Dibatalkan" && 
                  order.status !== "completed" && order.status !== "Selesai" && (
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => onInputPrice(order)}
                    >
                      Tetapkan Harga
                    </button>
                  )}
                  {order.status !== "cancelled" && order.status !== "Dibatalkan" && (
                    <>
                      <button 
                        className="btn btn-sm btn-accent"
                        onClick={() => onChangeStatus(order)}
                      >
                        Ubah Status
                      </button>
                      <button 
                        className="btn btn-sm btn-error"
                        onClick={() => setConfirmModal({ isOpen: true, orderId: order.id })}
                      >
                        Batalkan
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, orderId: null })}
        onConfirm={() => {
          onCancelOrder(confirmModal.orderId);
          setConfirmModal({ isOpen: false, orderId: null });
        }}
        title="Konfirmasi Pembatalan"
        message="Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
