import { NextResponse } from "next/server";

const BLOCK_BY_NETWORK = {
  BTC: { block_number: 938266, hash: "0xbtc_mock_hash" },
  LTC: { block_number: 3062368, hash: "0xltc_mock_hash" },
  BCH: { block_number: 939917, hash: "0xbch_mock_hash" },
  DOGE: { block_number: 6100008, hash: "0xdoge_mock_hash" },
  MATIC: { block_number: 83446997, hash: "0xmatic_mock_hash" },
  XRP: { block_number: 0, hash: "0xxrp_mock_hash" },
  TON: { block_number: 0, hash: "0xton_mock_hash" }, 
  SOL: { block_number: 0, hash: "0xsol_mock_hash" },
  BSC: { block_number: 1025363, hash: "0xbsc_mock_hash" },
  ETH: { block_number: 24533138, hash: "0xeth_mock_hash" },
  TRX: { block_number: 80448836, hash: "0xtrx_mock_hash" },
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const network = (searchParams.get("network") || "").toUpperCase();

  const item = BLOCK_BY_NETWORK[network] || BLOCK_BY_NETWORK.BTC;

  return NextResponse.json({
    data: {
      status_code: 200,
      hash: item.hash,
      block_number: item.block_number,
      message: "ok",
    },
    en_msg: "Successfully",
    code: 200,
    status: "OK",
    fa_msg: "با موفقیت انجام شد",
  });
}