export function readSearchParams(req) {
    const { searchParams } = new URL(req.url);
    const obj = {};
    for (const [k, v] of searchParams.entries()) obj[k] = v;
    return obj;
  }
  
  export function ok(data) {
    return {
      data,
      en_msg: "Successfully",
      code: 200,
      status: "OK",
      fa_msg: "با موفقیت انجام شد",
    };
  }
  
  export function pickCase(cases, ctx) {
    return cases.find((c) => c.match(ctx))?.result ?? null;
  }