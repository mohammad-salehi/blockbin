import { NextResponse } from "next/server";

const MOCK_USERNAME = "admin";
const MOCK_PASSWORD = "admin";

export async function POST(req) {
  let body = null;

  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      { data: null, en_msg: "Bad request", code: 400, status: "BAD_REQUEST", fa_msg: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const ok = body?.username === MOCK_USERNAME && body?.password === MOCK_PASSWORD;

  if (!ok) {
    return NextResponse.json(
      { data: null, en_msg: "Invalid credentials", code: 401, status: "UNAUTHORIZED", fa_msg: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { data: { access: "mock_access", refresh: "mock_refresh" }, en_msg: "Successfully", code: 200, status: "OK", fa_msg: "با موفقیت انجام شد" },
    { status: 200 }
  );
}