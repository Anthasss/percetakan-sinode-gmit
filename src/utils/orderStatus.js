// Order Status Constants
export const ORDER_STATUS = {
  WAITING_PRICE: 'Menunggu Harga dari Admin',
  WAITING_APPROVAL: 'Menunggu Persetujuan Pembeli',
  PROCESSING: 'Sedang Diproses',
  WAITING_PAYMENT: 'Menunggu Pembayaran',
  COMPLETED: 'Selesai',
  CANCELLED: 'Dibatalkan'
};

// Status badge colors for DaisyUI
export const STATUS_COLORS = {
  [ORDER_STATUS.WAITING_PRICE]: 'badge-warning',
  [ORDER_STATUS.WAITING_APPROVAL]: 'badge-info',
  [ORDER_STATUS.PROCESSING]: 'badge-primary',
  [ORDER_STATUS.WAITING_PAYMENT]: 'badge-warning',
  [ORDER_STATUS.COMPLETED]: 'badge-success',
  [ORDER_STATUS.CANCELLED]: 'badge-error'
};

// Valid status transitions
export const STATUS_TRANSITIONS = {
  [ORDER_STATUS.WAITING_PRICE]: [ORDER_STATUS.WAITING_APPROVAL, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.WAITING_APPROVAL]: [ORDER_STATUS.PROCESSING, ORDER_STATUS.WAITING_PAYMENT, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PROCESSING]: [ORDER_STATUS.COMPLETED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.WAITING_PAYMENT]: [ORDER_STATUS.PROCESSING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.COMPLETED]: [],
  [ORDER_STATUS.CANCELLED]: []
};

// Check if status transition is valid
export const isValidTransition = (currentStatus, newStatus) => {
  const allowedTransitions = STATUS_TRANSITIONS[currentStatus] || [];
  return allowedTransitions.includes(newStatus);
};

// Get all available next statuses for a given current status
export const getAvailableStatuses = (currentStatus) => {
  return STATUS_TRANSITIONS[currentStatus] || [];
};

// Helper to get status badge class
export const getStatusBadge = (status) => {
  return STATUS_COLORS[status] || 'badge-ghost';
};
