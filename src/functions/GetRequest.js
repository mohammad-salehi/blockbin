import axios from "axios";
import Cookies from "js-cookie";
import { serverAddress } from "./ServerAddress";

const reloadToken = async () => {
  const bodyFormData = new FormData();
  bodyFormData.append('refresh', Cookies.get('refresh'));
  try {
    const response = await axios.post(
      `${serverAddress}/accounts/api/token/refresh/`,
      bodyFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    console.log(response)
    if (response.status === 403) {
      Cookies.remove('access');
      Cookies.remove('refresh');
      window.location.assign('/');
      return false;
    }
    console.log(response.data.access)
    Cookies.set('access', response.data.access);
    return true;
  } catch (err) {
    console.error('Error refreshing token:', err);
    return false;
  }
};

export async function GetRequest(
  url,
  params = {},
  attemptedRefresh = false,
  attempted500 = false
) {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${Cookies.get("access")}` },
      params: params,
    });
    return response;
  } catch (err) {
    console.error(err);
    if (
      !attemptedRefresh &&
      (err.response?.status === 401 || err.response?.data?.detail === "Token is expired")
    ) {
      const tokenRefreshed = await reloadToken();
      if (tokenRefreshed) {
        await new Promise(resolve => setTimeout(resolve, 200)); 
        return await GetRequest(url, params, true, attempted500);
      }
    } else if (
      attemptedRefresh &&
      (err.response?.status === 401 || err.response?.data?.detail === "Token is expired")
    ) {
      Cookies.remove('access');
      Cookies.remove('refresh');
      window.location.assign('/');
    }
    if (
      !attempted500 &&
      (err.response?.status >= 500 || err.message === "Network Error")
    ) {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // کمی زمان تأخیر
      return await GetRequest(url, params, attemptedRefresh, true);
    }
    throw err; // ارورهای دیگر را پرتاب کنید
  }
}