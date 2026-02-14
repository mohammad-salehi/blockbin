"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { serverAddress } from "@/functions/ServerAddress";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GetRequest } from "@/functions/GetRequest";
import React from "react";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [Loading, SetLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Login = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      return toast.error("مقادیر را به درستی وارد کنید!", {
        position: "bottom-left",
      });
    }

    try {
      SetLoading(true);

      const response = await axios.post(
        `${serverAddress}/accounts/token/`,
        { username, password },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            // اگر واقعاً CSRF لازم داری:
            // "X-CSRFTOKEN": Cookies.get("csrftoken") || "",
          },
          withCredentials: true, // اگر بک‌اند کوکی ست می‌کند/CSRF داری
        }
      );

      // ✅ طبق خروجی curl شما:
      const payload = response?.data?.data;

      if (payload?.refresh && payload?.access) {
        Cookies.set("refresh", payload.refresh, { expires: 1 });
        Cookies.set("access", payload.access, { expires: 1 });

        Cookies.set("role_id", payload.role?.role_id || "");
        Cookies.set("role_name", payload.role?.role_name || "");
        Cookies.set("name", payload.user_firstname || "");
        Cookies.set("lastname", payload.user_lastname || "");
        Cookies.set("ip", payload.user_ip || "");

        const lastPath = Cookies.get("lastPath");
        if (lastPath) {
          Cookies.remove("lastPath");
          window.location.assign(lastPath);
          return;
        }

        // چون role_id شما UUID هست، این شرط عددی حذف شد:
        window.location.assign("/panel/dashboard");
      } else {
        toast.error("ورود ناموفق", { position: "bottom-left" });
      }
    } catch (err) {
      console.log(err);

      if (err?.message === "Network Error") {
        return toast.error("اتصال به اینترنت وجود ندارد", {
          position: "bottom-left",
        });
      }

      const apiMsg = err?.response?.data?.error;
      if (apiMsg === "recaptcha error occured") {
        return toast.error("کپچا گوگل ناموفق", { position: "bottom-left" });
      }

      if (err?.response?.status === 401) {
        return toast.error("ورود ناموفق", { position: "bottom-left" });
      }

      return toast.error("ورود ناموفق", { position: "bottom-left" });
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("access");
    if (token && token !== "0") {
      GetRequest(`${serverAddress}/explorer/backendversion`)
        .then((response) => {
          if (response.status === 200) {
            window.location.assign("/panel/dashboard");
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="container">
      <div className="right">
        <form className="login-form" id="my_login_form" onSubmit={Login}>
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <svg
              fill="#fff"
              width="200px"
              height="200px"
              viewBox="-4.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "auto" }}
            >
              <title>blockbin</title>
              <path d="M11.24 14.76c0.88-0.8 1.44-2 1.44-3.28 0-2.48-2-4.48-4.48-4.48s-4.48 2-4.48 4.48c0 1.32 0.56 2.48 1.44 3.28-1 0.36-1.88 0.92-2.64 1.72-2.68 2.88-2.52 7.52-2.52 7.72 0.040 0.48 0.4 0.84 0.88 0.8s0.8-0.4 0.8-0.88c0-0.040-0.16-4.12 2.12-6.52 1.080-1.12 2.56-1.72 4.44-1.72 1.84 0 3.32 0.56 4.4 1.68 2.28 2.36 2.12 6.48 2.12 6.52-0.040 0.48 0.32 0.84 0.8 0.88 0 0 0.040 0 0.040 0 0.44 0 0.8-0.36 0.84-0.8 0-0.2 0.2-4.84-2.6-7.72-0.72-0.76-1.6-1.32-2.6-1.68zM5.44 11.48c0-1.52 1.24-2.8 2.8-2.8s2.8 1.24 2.8 2.8c0 1.52-1.24 2.8-2.8 2.8s-2.8-1.28-2.8-2.8zM21.4 13.36c-0.4-0.44-0.88-0.76-1.4-1 0.44-0.56 0.72-1.24 0.72-2 0-1.76-1.4-3.16-3.16-3.16s-3.16 1.4-3.16 3.16c0 0.76 0.28 1.44 0.72 2-0.4 0.2-0.8 0.44-1.12 0.76-0.36 0.32-0.36 0.84-0.080 1.2 0.32 0.36 0.84 0.36 1.2 0.080 0.64-0.56 1.44-0.84 2.44-0.84 1.12 0 1.96 0.32 2.6 1 1.36 1.44 1.28 3.92 1.28 3.96-0.040 0.48 0.32 0.84 0.8 0.88 0 0 0.040 0 0.040 0 0.44 0 0.8-0.36 0.84-0.8 0.040-0.16 0.12-3.28-1.72-5.24zM16.080 10.4c0-0.8 0.68-1.48 1.48-1.48s1.48 0.68 1.48 1.48-0.68 1.48-1.48 1.48c-0.8 0-1.48-0.68-1.48-1.48z"></path>
            </svg>
          </div>

          <div className="icon-group">
            <PersonOutlineOutlinedIcon className="icon" />
            <input
              type="text"
              id="username"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="icon-group">
            <HttpsOutlinedIcon className="icon" />
            <input
              type="password"
              id="password"
              placeholder="رمزعبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="options">
            <a href="/recovery" className="forgot">
              رمزعبور خود را فراموش کرده‌اید؟
            </a>
          </div>

          <button type="submit" className="btn-login" disabled={Loading}>
            {Loading ? (
              <CircularProgress
                style={{ color: "white" }}
                size="30px"
                className="mt-2"
              />
            ) : (
              <span>ورود</span>
            )}
          </button>
        </form>
      </div>

      <div className="left">
        <img src="/images/logo22.png" alt="Logo" className="logo" />
      </div>
    </div>
  );
}
