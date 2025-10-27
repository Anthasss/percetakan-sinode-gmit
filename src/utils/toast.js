// Toast utility for displaying notifications
export const toast = {
  success: (message) => {
    showToast(message, 'alert-success');
  },
  
  error: (message) => {
    showToast(message, 'alert-error');
  },
  
  info: (message) => {
    showToast(message, 'alert-info');
  },
  
  warning: (message) => {
    showToast(message, 'alert-warning');
  },
};

const showToast = (message, alertType) => {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast toast-top toast-end z-50';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toastElement = document.createElement('div');
  toastElement.className = `alert ${alertType} shadow-lg`;
  toastElement.innerHTML = `
    <div>
      <span>${message}</span>
    </div>
  `;

  // Add to container
  toastContainer.appendChild(toastElement);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toastElement.style.transition = 'opacity 0.3s ease-out';
    toastElement.style.opacity = '0';
    
    setTimeout(() => {
      toastElement.remove();
      
      // Remove container if no more toasts
      if (toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    }, 300);
  }, 3000);
};

export default toast;
