"use client";
import React from "react";

export default function MainInput({ onSubmit, inputText, SetInputText }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get("q")?.toString() ?? "";
        if (onSubmit) onSubmit(q);
    };

    return (
        <form
            onSubmit={handleSubmit}
            dir="rtl"
            className="w-full  mx-auto px-1 mt-6"
        >
            {/* ظرف اصلی با سایه و حالت کپسولی */}
            <div className="flex items-center gap-2 rounded-full bg-boxColor border border-boxBorderColor shadow-[0_4px_18px_rgba(0,0,0,0.08)] overflow-hidden p-1 m-0">
                <input
                    onChange={(e) => {SetInputText(e.target.value)}}
                    value={inputText}
                    type="text"
                    name="q"
                    placeholder="آدرس یا شناسه تراکنش..."
                    className="flex-1  outline-none border px-4 py-3 text-sm font-iranSans placeholder-gray-400 text-textColor bg-boxColor rounded-full border-boxColor "
                />
                {/* دکمه جستجو */}
                <button
                    type="submit"
                    className="outline-none border-none cursor-pointer shrink-0 flex items-center gap-2 px-4 py-2.5 ms-1 rounded-full bg-primary text-white font-iranSans transition-colors hover:brightness-95 active:brightness-90 focus:outline-none  ring-primary/40"
                    aria-label="جست‌وجو"
                    title="جست‌وجو"
                >
                    جست‌وجو
                    {/* آیکن ذره‌بین */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                    >
                        <path d="M21.53 20.47l-4.76-4.76a8 8 0 10-1.06 1.06l4.76 4.76a.75.75 0 101.06-1.06zM10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z" />
                    </svg>
                </button>

                {/* ورودی متن */}

            </div>
        </form>
    );
}
