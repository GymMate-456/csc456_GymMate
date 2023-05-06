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
        case 0:
            return toast.info(message, toastConfig);
        case 1:
            return toast.success(message, toastConfig);
        case 2:
            return toast.warning(message, toastConfig);
        case 3:
            return toast.error(message, toastConfig);
        case 4:
            return toast.default(message, toastConfig);
    }
}

