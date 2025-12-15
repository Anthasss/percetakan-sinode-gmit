import { X, FileText, Image, Download } from "lucide-react";

export default function OrderDetailModal({ order }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (mimeType) => {
    if (mimeType?.startsWith('image/')) {
      return <Image className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const isImageFile = (mimeType) => {
    return mimeType?.startsWith('image/');
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "pending": "badge-info",
      "processing": "badge-warning",
      "completed": "badge-success",
      "cancelled": "badge-error",
      // Legacy Indonesian status
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

  if (!order) return null;

  const specifications = order.orderSpecifications || order.details || {};
  const uploadedFiles = specifications.files || [];
  
  // Create a copy of specifications without the files array for display
  const specsWithoutFiles = { ...specifications };
  delete specsWithoutFiles.files;
  
  
  const productTitle = order.productTitle || order.product?.title || `Product #${order.productId}`;
  const quantity = order.orderSpecifications?.quantity || order.quantity || '-';
  const orderDate = order.createdAt || order.orderDate;

  return (
    <dialog id="order_detail_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X />
          </button>
        </form>
        <div>
          <h3 className="font-bold text-2xl mb-4">Detail Pesanan</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Order ID:</div>
              <div className="text-sm break-all">{order.id}</div>
              
              <div className="font-semibold">Produk:</div>
              <div>{productTitle}</div>
              
              <div className="font-semibold">Kuantitas:</div>
              <div>{quantity}</div>
              
              <div className="font-semibold">Harga:</div>
              <div>{order.price ? formatCurrency(order.price) : 'Belum ditentukan'}</div>
              
              <div className="font-semibold">Status:</div>
              <div>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              
              <div className="font-semibold">Tanggal Pesan:</div>
              <div>{orderDate ? new Date(orderDate).toLocaleDateString('id-ID') : '-'}</div>
            </div>

            {Object.keys(specsWithoutFiles).length > 0 && (
              <>
                <div className="divider"></div>
                
                <h4 className="font-bold text-lg">Spesifikasi Pesanan</h4>
                <div className="bg-base-200 p-4 rounded-lg space-y-2">
                  {Object.entries(specsWithoutFiles).map(([key, value]) => {
                    // Format key dengan spasi
                    const formattedKey = key
                      .replace(/([A-Z])/g, ' $1') // Tambah spasi sebelum huruf kapital
                      .replace(/^./, str => str.toUpperCase()) // Kapitalisasi huruf pertama
                      .trim();
                    
                    return (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <div className="font-semibold">{formattedKey}:</div>
                        <div>{typeof value === 'object' ? JSON.stringify(value) : value}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {uploadedFiles.length > 0 && (
              <>
                <div className="divider"></div>
                
                <h4 className="font-bold text-lg">File yang Diunggah</h4>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="border border-base-300 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {getFileIcon(file.mimeType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{file.fileName}</div>
                          <div className="text-sm text-base-content/70">
                            {formatFileSize(file.fileSize)} • {file.mimeType}
                          </div>
                          {isImageFile(file.mimeType) && (
                            <div className="mt-2">
                              <img 
                                src={file.publicUrl} 
                                alt={file.fileName}
                                className="max-w-full h-auto max-h-48 rounded-lg object-contain bg-base-200"
                              />
                            </div>
                          )}
                        </div>
                        <a 
                          href={file.publicUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-ghost btn-square"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
