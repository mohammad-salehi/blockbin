"use client";

import { useEffect, useState } from "react";
import Navbar from "@/layouts/Navbar/Navbar";
import Header from "@/layouts/Header/Header";
import Head from "next/head";

export default function DashboardLayout({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobileOpen, SetisMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(null);

  // لود اولیه از localStorage (و sync با <html>)
  useEffect(() => {
    const stored = localStorage.getItem("dark-mode");
    const doc = document.documentElement.classList;
    if (stored === "true") {
      doc.add("dark");
      setIsDarkMode(true);
    } else if (stored === "false") {
      doc.remove("dark");
      setIsDarkMode(false);
    } else {
      // اگر چیزی ذخیره نشده بود، وضعیت فعلی html را بخوان
      setIsDarkMode(doc.contains("dark"));
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    const doc = document.documentElement.classList;
    if (next) {
      doc.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      doc.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  };

  // واکنش به تغییر اندازه برای سایدبار
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsNavbarOpen(mq.matches);
    const onChange = (e) => setIsNavbarOpen(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (isDarkMode === null) return null;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <style>{`html{transition:background-color .3s ease}`}</style>
      </Head>

      <div className={`bg-bgColor flex-1 flex flex-col transition-all  ${"mr-0"} ${isNavbarOpen ? "p-8 pb-0" : "p-0"} pt-0`}>
        <Header
          isOpen={isNavbarOpen}
          setIsOpen={setIsNavbarOpen}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={SetisMobileOpen}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <main className="flex-1 overflow-auto pt-0 mt-4 mb-2">
          <div className="max-w-screen-2xl mx-auto w-full px-4">
            {children}
          </div>
        </main>

        <footer className="text-textColor mx-auto w-full max-w-screen-xl text-sm py-1">
          <div className="text-center">
            <p>© طراحی‌ و توسعه توسط شرکت پردازش داده های زنجیره امین (پنتا)</p>
          </div>
        </footer>
      </div>

      {/* <Navbar
        isOpen={isNavbarOpen}
        setIsOpen={setIsNavbarOpen}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={SetisMobileOpen}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      /> */}
    </div>
  );
}
