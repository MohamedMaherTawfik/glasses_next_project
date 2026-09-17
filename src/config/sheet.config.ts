export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY ?? "";
export const SHEET_NAME = process.env.SHEET_NAME ?? "Products";

export const SHEET_RANGE = `${SHEET_NAME}!A:K`;
export const hasSheetConfig = Boolean(GOOGLE_SHEET_ID && GOOGLE_API_KEY);
