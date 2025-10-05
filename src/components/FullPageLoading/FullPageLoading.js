import React from "react";
import { useEffect, useState } from "react";

export default function FullPageLoading() {
    const text = "BLOCKBIN";
    const letters = text.split("");
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % letters.length);
        }, 300);
        return () => clearInterval(interval);
    }, [letters.length]);

    return (
        <div className="fixed inset-0 z-500 grid place-items-center bg-boxColor/50  backdrop-blur-sm w-full">
            <div className="pointer-events-none">
                <div className="flex justify-center items-center h-screen ">
                    <h1 className="text-[64px] sm:text-[96px] font-bold tracking-[8px] text-white font-sans block">
                        {letters.map((letter, i) => (
                            <span
                                key={i}
                                className={`transition-all duration-500 ease-in-out ml-0 text-left ${i === activeIndex ? "opacity-100 text-[deepskyblue]" : "opacity-30 text-black"
                                    }`}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
        </div>
    );
}
