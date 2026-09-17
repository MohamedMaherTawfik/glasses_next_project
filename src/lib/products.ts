import { demoProducts } from "@/src/data/demo-products";
import { GOOGLE_API_KEY, GOOGLE_SHEET_ID, SHEET_RANGE, hasSheetConfig } from "@/src/config/sheet.config";
import type { Product } from "@/src/types/product";

function parseList(value: string | undefined) {
  return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

function parseRow(headers: string[], row: string[]): Product {
  const values = Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""]));
  return {
    id: values.id || crypto.randomUUID(),
    name: values.name,
    slug: values.slug || values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    category: values.category,
    description: values.description,
    price: Number(values.price) || 0,
    image: values.image,
    gallery: parseList(values.gallery),
    colors: parseList(values.colors),
    sizes: parseList(values.sizes),
    featured: values.featured.toLowerCase() === "true",
    createdAt: values.createdAt,
  };
}

export async function fetchSheetProducts(): Promise<Product[]> {
  if (!hasSheetConfig) return [];
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}?key=${GOOGLE_API_KEY}`;
  const response = await fetch(endpoint, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error(`Google Sheet request failed with ${response.status}`);
  const payload = (await response.json()) as { values?: string[][] };
  const rows = payload.values ?? [];
  if (rows.length < 2) return [];
  return rows.slice(1).filter((row) => row.some(Boolean)).map((row) => parseRow(rows[0], row));
}

export async function getProducts() {
  if (hasSheetConfig) {
    try {
      const sheetProducts = await fetchSheetProducts();
      if (sheetProducts.length) return sheetProducts;
    } catch (error) {
      console.error("Unable to load Google Sheet products:", error);
    }
  }
  return demoProducts;
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
