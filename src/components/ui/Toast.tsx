"use client";

import toast, { Toaster as HotToaster } from "react-hot-toast";

export { toast };

export function showSuccess(message: string) {
  return toast.success(message, {
    style: {
      background: "#3D2B1F",
      color: "#FFF8F0",
      border: "1px solid rgba(224,124,36,0.3)",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "14px",
    },
    iconTheme: {
      primary: "#6B8F71",
      secondary: "#FFF8F0",
    },
    duration: 3000,
  });
}

export function showError(message: string) {
  return toast.error(message, {
    style: {
      background: "#3D2B1F",
      color: "#FFF8F0",
      border: "1px solid rgba(193,105,79,0.4)",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "14px",
    },
    iconTheme: {
      primary: "#C1694F",
      secondary: "#FFF8F0",
    },
    duration: 4000,
  });
}

export function showLoading(message: string) {
  return toast.loading(message, {
    style: {
      background: "#3D2B1F",
      color: "#FFF8F0",
      border: "1px solid rgba(224,124,36,0.3)",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "14px",
    },
  });
}

export function dismissToast(toastId?: string) {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
}

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      gutter={12}
      toastOptions={{
        style: {
          background: "#3D2B1F",
          color: "#FFF8F0",
          border: "1px solid rgba(224,124,36,0.3)",
          borderRadius: "12px",
          padding: "12px 16px",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "14px",
          boxShadow: "0 10px 40px rgba(61,43,31,0.25)",
        },
        success: {
          iconTheme: {
            primary: "#6B8F71",
            secondary: "#FFF8F0",
          },
        },
        error: {
          iconTheme: {
            primary: "#C1694F",
            secondary: "#FFF8F0",
          },
        },
      }}
    />
  );
}
