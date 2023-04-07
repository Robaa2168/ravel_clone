import { toast } from 'react-toastify';

export const showToast = (type, message) => {
  const options = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
    case 'danger':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'warning':
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
  }
};
