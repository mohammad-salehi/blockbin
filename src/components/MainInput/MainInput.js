"use client";
import React, { useEffect } from "react";

export default function MainInput({
  onSubmit,
  inputText,
  SetInputText,
  placeholder,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = inputText.trim();
    if (!q) return;
    onSubmit?.(q);
  };

  useEffect(() => {
    document.getElementById("mainExplorerInput").focus()
  },[inputText])

  return (
    <form onSubmit={handleSubmit} dir="rtl" className="w-full mx-auto px-1">
      <div
        className="
          flex items-center gap-2
          rounded-full bg-boxColor border border-boxBorderColor
          p-1 overflow-hidden
        "
      >
        <input
          value={inputText}
          onChange={(e) => SetInputText(e.target.value)}
          type="text"
          placeholder={placeholder}
          id="mainExplorerInput"
          className="
            flex-1 min-w-0
            outline-none px-4 py-3
            text-sm font-iranSans
            placeholder-gray-400 text-textColor
            bg-boxColor rounded-full
          "
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="
            shrink-0 whitespace-nowrap
            cursor-pointer
            flex items-center gap-1
            px-3 sm:px-4 py-2.5
            rounded-full bg-primary text-white
            font-iranSans transition
            hover:brightness-95 active:brightness-90
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          جست‌وجو
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M21.53 20.47l-4.76-4.76a8 8 0 10-1.06 1.06l4.76 4.76a.75.75 0 101.06-1.06zM10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
