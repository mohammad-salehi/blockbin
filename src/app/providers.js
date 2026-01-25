"use client";

import { ThemeProvider, moonDesignLight } from "@heathmont/moon-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={moonDesignLight}>
      {children}
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "0.5rem",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />
    </ThemeProvider>
  );
}
