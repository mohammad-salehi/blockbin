import { Button, Label } from "@heathmont/moon-core-tw";
import React, { JSX, useState } from "react";
import toast from "react-hot-toast";
import { Modal, Input } from "@heathmont/moon-core-tw";
import { Dropdown, MenuItem } from "@heathmont/moon-core-tw";

const DetailBox = ({ data }) => {

    const [AddFileModal, SetAddFileModal] = useState(false)
    return (
        <div className="shadow-lg rounded-lg overflow-x-hidden bg-boxColor border border-boxBorderColor dark:border-boxColor-dark mt-2 pb-2">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 bg-boxColor">
                {data.map((section, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className={`${sectionIndex !== data.length - 1
                            ? "border-l border-boxBorderColor dark:border-boxColor-dark"
                            : ""
                            }`}
                    >
                        <h3 className="text-xl font-semibold mb-4 bg-boxBorderColor dark:bg-boxColor-dark text-textColor p-2 text-center">
                            {section.title}
                        </h3>
                        <ul className="px-4 bg-boxColor ">
                            {section.content.map((item, index) => (
                                <li
                                    key={index}
                                    className={`py-2 flex items-center bg-boxColor text-textColor
                                        ${sectionIndex === data.length - 1
                                          ? 'justify-center text-center'
                                          : 'justify-between'}
                                      `}
                                >
                                    {item.image ? (
                                        <div className="flex items-center gap-2 min-w-0">
                                            <img src={item.image} alt="Logo" className="w-8 h-8 ml-2" />
                                            <div className="flex flex-col min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <strong className="break-words">{item.title}</strong>
                                                </div>
                                                <div className="flex items-center gap-1 ">
                                                    <span className="whitespace-normal break-words ">
                                                        {item.content}
                                                    </span>
                                                    {sectionIndex < 2 ? (
                                                        <button
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(String(item.content))
                                                            }
                                                            className="p-1 hover:text-blue-500"
                                                            title="کپی محتوا"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path d="M8 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-2" />
                                                                <rect
                                                                    x="9"
                                                                    y="3"
                                                                    width="13"
                                                                    height="13"
                                                                    rx="2"
                                                                    ry="2"
                                                                />
                                                            </svg>
                                                        </button>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col min-w-0">
                                            {item.title ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold break-words">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            ) : null}
                                            <div className="flex items-center gap-1">
                                                <span className="whitespace-normal break-words">
                                                    {item.content}
                                                </span>
                                                {sectionIndex < 2 ? (
                                                    <button
                                                        onClick={() => {
                                                            toast.success("در کلیپ‌بورد ذخیره شد.", {
                                                                position: "bottom-left",
                                                            });
                                                            navigator.clipboard.writeText(String(item.content));
                                                        }}
                                                        className="p-1 hover:text-blue-500"
                                                        title="کپی محتوا"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path d="M8 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-2" />
                                                            <rect
                                                                x="9"
                                                                y="3"
                                                                width="13"
                                                                height="13"
                                                                rx="2"
                                                                ry="2"
                                                            />
                                                        </svg>
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DetailBox;
