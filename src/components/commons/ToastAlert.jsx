import React from 'react';
import { toast } from 'react-toastify';

export function ToastAlert(message, type = 'default') {
  const options = {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case 'info':
      toast.info(message, options);
      break;
    case 'warn':
      toast.warn(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    default:
      toast(message, options);
  }
}
