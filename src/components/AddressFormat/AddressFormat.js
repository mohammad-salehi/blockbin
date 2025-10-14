"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
// اگر از next/link استفاده می‌کنی:
// import Link from "next/link";

export function AddressFormat(str, number = 8, type, network, showCopy = true) {
  if (!str || typeof str !== "string") return null;

  const isShort = str.length <= number * 2;
  const firstPart = isShort ? str : str.substring(0, number);
  const lastPart = isShort ? "" : str.substring(str.length - number);
  const displayText = isShort ? str : `${firstPart}...${lastPart}`;
  const href = `/panel/dashboard/${type}/${network}/${str}/`;

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(str);
        toast.success("در کلیپ‌بورد ذخیره شد!", { position: "bottom-left" });
      } else {
        // فallback برای مرورگرهای قدیمی
        const tmp = document.createElement("textarea");
        tmp.value = str;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        document.body.removeChild(tmp);
        toast.success("در کلیپ‌بورد ذخیره شد!", { position: "bottom-left" });
      }
    } catch {
      toast.error("کپی ناموفق بود");
    }
  };

  return (
    <span className="inline-flex items-center gap-1 align-middle">
      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="کپی آدرس"
          className="p-0 m-0 border-0 bg-transparent cursor-pointer text-textColor"
          title="کپی"
        >
          <ContentCopyIcon style={{ fontSize: 16 }} />
        </button>
      )}

      {/* اگر Next.js داری از Link استفاده کن */}
      {/* <Link href={href} className="text-primary outline-none border-none no-underline"> */}
      <a
        href={href}
        className="text-primary outline-none border-none no-underline"
      >
        {displayText}
      </a>
      {/* </Link> */}
    </span>
  );
}
