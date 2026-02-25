import { getMockAddressTx } from "@/mocks/addressTx.mock";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const network = searchParams.get("network") || "TRX";
  const address = searchParams.get("address");
  const page_number = Number(searchParams.get("page_number") || 1);

  const data = getMockAddressTx({ network, address, page_number });
  return Response.json(data);
}