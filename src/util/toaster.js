import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ToastNotification component to set up global configuration
const ToastNotification = () => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    );
};

// Success toast
const success = (msg) => {
    toast.success(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            border: '2px solid #4CAF50',
            padding: '16px',
            color: '#4CAF50',
            backgroundColor: '#e0f4e0',
        },
    });
};

// Error toast
const errorMsg = (msg) => {
    toast.error(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            border: '2px solid #f44336',
            padding: '16px',
            color: '#f44336',
            backgroundColor: '#ffd4d4',
        },
    });
};

// Warning toast
const warning = (msg) => {
    toast.warn(msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            border: '2px solid #FF9800',
            padding: '16px',
            color: '#FF9800',
            backgroundColor: '#FFF4E0',
        },
    });
};

// Loading toast
const loading = (msg) => {
    toast.loading(msg, {
        style: {
            background: "#1877f2",
            color: "white",
        },
    });
};

// Custom toast
const custom = (msg) => {
    toast(msg, {
        style: {
            border: '2px solid #1877f2',
            padding: '16px',
            color: '#1877f2',
            backgroundColor: '#e0f4e0',
        },
    });
};

// Dismiss toast
const dismiss = (toastId) => {
    toast.dismiss(toastId);
};

// Remove toast
const remove = (toastId) => {
    toast.remove(toastId);
};

export { ToastNotification, success, errorMsg, warning, loading, custom, dismiss, remove };
