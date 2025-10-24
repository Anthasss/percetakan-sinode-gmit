import { useState } from 'react';
import { X } from "lucide-react";

export default function PriceInputModal({ order, onSavePrice }) {
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  if (!order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numericPrice = parseFloat(price);
    
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      setError('Harap masukkan harga yang valid');
      return;
    }

    onSavePrice(order.id, numericPrice);
    setPrice('');
    setError('');
    document.getElementById('price_input_modal').close();
  };

  const handleClose = () => {
    setPrice('');
    setError('');
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const number = parseFloat(value.toString().replace(/[^0-9]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value);
    setError('');
  };

  return (
    <dialog id="price_input_modal" className="modal" onClose={handleClose}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X />
          </button>
        </form>
        
        <h3 className="font-bold text-2xl mb-4">Input Harga</h3>
        
        <div className="space-y-4">
          <div className="bg-base-200 p-4 rounded-lg space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Order ID:</div>
              <div>#{order.id}</div>
              
              <div className="font-semibold">Nama User:</div>
              <div>{order.userName}</div>
              
              <div className="font-semibold">Produk:</div>
              <div>{order.productTitle}</div>
              
              <div className="font-semibold">Kuantitas:</div>
              <div>{order.quantity}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Harga (IDR)</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan harga"
                className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
                value={formatCurrency(price)}
                onChange={handlePriceChange}
                autoFocus
              />
              {error && (
                <label className="label">
                  <span className="label-text-alt text-error">{error}</span>
                </label>
              )}
              {price && !error && (
                <label className="label">
                  <span className="label-text-alt">
                    Preview: Rp {formatCurrency(price)}
                  </span>
                </label>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  document.getElementById('price_input_modal').close();
                  handleClose();
                }}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Harga
              </button>
            </div>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
