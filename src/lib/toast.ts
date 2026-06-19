import { toast as hotToast, ToastOptions } from "react-hot-toast";

const defaultOptions: ToastOptions = {
  style: {
    background: "#18181b", // zinc-900
    color: "#fff",
    borderRadius: "8px",
    border: "1px solid #27272a", // zinc-800
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
};

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    hotToast.success(message, { ...defaultOptions, ...options }),
    
  error: (message: string, options?: ToastOptions) =>
    hotToast.error(message, { ...defaultOptions, ...options }),
    
  loading: (message: string, options?: ToastOptions) =>
    hotToast.loading(message, { ...defaultOptions, ...options }),
    
  custom: (message: string, options?: ToastOptions) =>
    hotToast(message, { ...defaultOptions, ...options }),
    
  dismiss: (toastId?: string) => hotToast.dismiss(toastId),
  
  promise: <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string | ((data: T) => string); error: string | ((err: any) => string) },
    options?: ToastOptions
  ) =>
    hotToast.promise(promise, msgs, { ...defaultOptions, ...options }),
};
