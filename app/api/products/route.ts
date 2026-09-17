import { NextResponse } from "next/server";
import { getProducts } from "@/src/lib/products";

export async function GET() {
  return NextResponse.json(await getProducts());
}

async function forwardWrite(request: Request, method: string) {
  const writeEndpoint = process.env.GOOGLE_SHEETS_WRITE_URL;
  if (!writeEndpoint) return NextResponse.json({ error: "Google Sheets write endpoint is not configured." }, { status: 501 });
  const body = await request.json();
  const response = await fetch(writeEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ method, product: body }) });
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: Request) { return forwardWrite(request, "create"); }
export async function PATCH(request: Request) { return forwardWrite(request, "update"); }
export async function DELETE(request: Request) { return forwardWrite(request, "delete"); }
