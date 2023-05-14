import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Required At The End of Render 
export const ToastDependency = ToastContainer;

// Sends Colored Toast Notification
export const sendToast = async (type, message, timer) => {
    const toastConfig = {
        position: "top-right",
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    };

    switch (type) {
        case "info":
            return toast.info(message, toastConfig);
        case "success":
            return toast.success(message, toastConfig);
        case "warning":
            return toast.warning(message, toastConfig);
        case "error":
            return toast.error(message, toastConfig);
        case "default":
            return toast.default(message, toastConfig);
    }
}

