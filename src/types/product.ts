export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  featured: boolean;
  createdAt: string;
};

export function imagePath(filename: string) {
  if (filename.startsWith("/") || filename.startsWith("http")) return filename;
  return `/images/products/${filename}`;
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}
