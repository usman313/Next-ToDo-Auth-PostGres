'use client'

import { toast } from 'react-toastify';

function Toaster({ type, message }) {
    toast(message || 'hi im toast', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      type: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
  });
}

export default Toaster