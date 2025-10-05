"use client"

import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '@/functions/ServerAddress';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GetRequest } from '@/functions/GetRequest';
import React from 'react';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

  const [Loading, SetLoading] = useState(false);

  const Login = (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (username === '' || password === '') {
      return toast.error('مقادیر را به درستی وارد کنید!', {
        position: 'bottom-left'
      })
    } else {
      SetLoading(true)
      axios.post(serverAddress + "/dashboard/accounts/api/token/", {
        username: username,
        password: password,
      })
        .then((response) => {
          if (response.data.refresh && response.data.access) {
            Cookies.set('refresh', response.data.refresh, { expires: 1 })
            Cookies.set('access', response.data.access, { expires: 1 })
            Cookies.set('roll', response.data.role.role_id)
            Cookies.set('roll_name', response.data.role.role_name)
            Cookies.set('name', response.data.user_firstname)
            Cookies.set('ip', response.data.user_ip)
            Cookies.set('lastname', response.data.user_lastname)
            if (Cookies.get('lastPath') !== undefined) {
              const getLastPath = Cookies.get('lastPath')
              Cookies.remove('lastPath')
              window.location.assign(getLastPath)
            }
            else if (Number(response.data.role.role_id) === 2 || Number(response.data.role.role_id) === 3) {
              window.location.assign('/panel/dashboard')
            }
          } else {
            SetLoading(false)
            return toast.error('ورود ناموفق', {
              position: 'bottom-left'
            })
          }
          SetLoading(false)
        })
        .catch((err) => {
          SetLoading(false)
          console.log(err)
          if (err.message === 'Network Error') {
            SetLoading(false)
            return toast.error('اتصال به اینترنت وجود ندارد', {
              position: 'bottom-left'
            })
          }
          if (err.response.data.error === "recaptcha error occured") {
            SetLoading(false)
            return toast.error('کپچا گوگل ناموفق', {
              position: 'bottom-left'
            })
          }
          if (err.response.statusText === 'Unauthorized') {
            SetLoading(false)
            return toast.error('ورود ناموفق', {
              position: 'bottom-left'
            })
          } else {
            SetLoading(false)
            return toast.error('ورود ناموفق', {
              position: 'bottom-left'
            })
          }
        })
    }
  }

  useEffect(() => {
    const token = Cookies.get('access')
    if (token !== undefined && token !== 0 && token !== '0') {
      GetRequest(`${serverAddress}/explorer/backendversion`)
        .then((response) => {
          if (response.status === 200) {
            window.location.assign('/researcher')
          }
        })
    }
  }, [])

  return (
    <div className="container">
      <div className="right">
        <form className="login-form" id="my_login_form" 
          onSubmit={(e) => {
            e.preventDefault()
            Login()
          }}
        >
          <div style={{ textAlign: 'center', alignItems:'center' }}>
            <svg fill="#fff" width="200px" height="200px" viewBox="-4.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{margin:'auto'}}>
              <title>blockbin</title>
              <path d="M11.24 14.76c0.88-0.8 1.44-2 1.44-3.28 0-2.48-2-4.48-4.48-4.48s-4.48 2-4.48 4.48c0 1.32 0.56 2.48 1.44 3.28-1 0.36-1.88 0.92-2.64 1.72-2.68 2.88-2.52 7.52-2.52 7.72 0.040 0.48 0.4 0.84 0.88 0.8s0.8-0.4 0.8-0.88c0-0.040-0.16-4.12 2.12-6.52 1.080-1.12 2.56-1.72 4.44-1.72 1.84 0 3.32 0.56 4.4 1.68 2.28 2.36 2.12 6.48 2.12 6.52-0.040 0.48 0.32 0.84 0.8 0.88 0 0 0.040 0 0.040 0 0.44 0 0.8-0.36 0.84-0.8 0-0.2 0.2-4.84-2.6-7.72-0.72-0.76-1.6-1.32-2.6-1.68zM5.44 11.48c0-1.52 1.24-2.8 2.8-2.8s2.8 1.24 2.8 2.8c0 1.52-1.24 2.8-2.8 2.8s-2.8-1.28-2.8-2.8zM21.4 13.36c-0.4-0.44-0.88-0.76-1.4-1 0.44-0.56 0.72-1.24 0.72-2 0-1.76-1.4-3.16-3.16-3.16s-3.16 1.4-3.16 3.16c0 0.76 0.28 1.44 0.72 2-0.4 0.2-0.8 0.44-1.12 0.76-0.36 0.32-0.36 0.84-0.080 1.2 0.32 0.36 0.84 0.36 1.2 0.080 0.64-0.56 1.44-0.84 2.44-0.84 1.12 0 1.96 0.32 2.6 1 1.36 1.44 1.28 3.92 1.28 3.96-0.040 0.48 0.32 0.84 0.8 0.88 0 0 0.040 0 0.040 0 0.44 0 0.8-0.36 0.84-0.8 0.040-0.16 0.12-3.28-1.72-5.24zM16.080 10.4c0-0.8 0.68-1.48 1.48-1.48s1.48 0.68 1.48 1.48-0.68 1.48-1.48 1.48c-0.8 0-1.48-0.68-1.48-1.48z"></path>
            </svg>
          </div>
          <div className="icon-group">
            <PersonOutlineOutlinedIcon className="icon" />
            <input type="text" id='username' placeholder="نام کاربری" />
          </div>
          <div className="icon-group">
            <HttpsOutlinedIcon className="icon" />
            <input type="password" id='password' placeholder="رمزعبور" />
          </div>
          <div className="options">
            <a href="/recovery" className="forgot">رمزعبور خود را فراموش کرده‌اید؟</a>
          </div>
          <button type="submit" className="btn-login" onClick={(e) => {Login(e)}}>
            {
              Loading? 
                <CircularProgress style={{color:'white'}} size="30px" className='mt-2'/>
              :
              <span>ورود</span>
            }
          </button>
        </form>
      </div>
      <div className="left">
        {/* لوگو */}
        <img src="/images/logo22.png" alt="Logo" className="logo" />
      </div>

    </div>
  )
}
