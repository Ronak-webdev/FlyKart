"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Define default options
        className: "",
        duration: 4000,
        style: {
          background: "#18181b", // zinc-900
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #27272a", // zinc-800
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontFamily: "var(--font-sans)",
        },
        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#10b981", // emerald-500
            secondary: "#fff",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#ef4444", // red-500
            secondary: "#fff",
          },
        },
      }}
    />
  );
};
