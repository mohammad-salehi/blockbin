import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "بلاک‌بین",
    template: "%s | بلاک‌بین",
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/images/eye.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-bgColor dark:bg-bgColor-dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
