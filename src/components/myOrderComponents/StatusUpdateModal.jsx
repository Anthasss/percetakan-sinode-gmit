import { useState } from 'react';
import { X } from "lucide-react";
import { ORDER_STATUS, getAvailableStatuses, getStatusBadge } from '../../utils/orderStatus';

export default function StatusUpdateModal({ order, onSaveStatus }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [error, setError] = useState('');

  if (!order) return null;

  // Get available statuses based on current status
  const availableStatuses = getAvailableStatuses(order.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedStatus) {
      setError('Harap pilih status');
      return;
    }

    onSaveStatus(order.id, selectedStatus);
    setSelectedStatus('');
    setError('');
    document.getElementById('status_update_modal').close();
  };

  const handleClose = () => {
    setSelectedStatus('');
    setError('');
  };

  const getCurrentStatusLabel = (status) => {
    const statusLabels = {
      "pending": "Menunggu harga dari admin",
      "processing": "Dalam progres",
      "completed": "Siap diambil",
      "cancelled": "Dibatalkan"
    };
    return statusLabels[status] || status;
  };

  return (
    <dialog id="status_update_modal" className="modal" onClose={handleClose}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X />
          </button>
        </form>
        
        <h3 className="font-bold text-2xl mb-4">Ubah Status Pesanan</h3>
        
        <div className="space-y-4">
          <div className="bg-base-200 p-4 rounded-lg space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Order ID:</div>
              <div className="text-sm break-all">{order.id}</div>
              
              <div className="font-semibold">Nama User:</div>
              <div>{order.user?.name || order.userName || 'Unknown User'}</div>
              
              <div className="font-semibold">Produk:</div>
              <div>{order.productTitle || order.product?.title || `Product #${order.productId}`}</div>
              
              <div className="font-semibold">Status Saat Ini:</div>
              <div>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {availableStatuses.length === 0 ? (
            <div className="alert alert-warning">
              <span>Tidak ada status yang dapat diubah dari status saat ini.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Status Baru</span>
                </label>
                <select
                  className={`select select-bordered w-full ${error ? 'select-error' : ''}`}
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setError('');
                  }}
                  autoFocus
                >
                  <option value="">Pilih status</option>
                  {availableStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {error && (
                  <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                  </label>
                )}
            </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    document.getElementById('status_update_modal').close();
                    handleClose();
                  }}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Status
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
