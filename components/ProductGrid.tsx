import type { Product } from "@/src/types/product";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <div className="empty-state">Your collection will appear here once products are added to the connected sheet.</div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
