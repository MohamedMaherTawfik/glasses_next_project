"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/src/types/product";
import { ProductGrid } from "@/components/ProductGrid";

export function ProductCatalog({ products, initialCategory, initialSort }: { products: Product[]; initialCategory?: string; initialSort?: string }) {
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
  const [category, setCategory] = useState(initialCategory && categories.includes(initialCategory) ? initialCategory : "All");
  const allowedSorts = ["featured", "newest", "price-low", "price-high"];
  const [sort, setSort] = useState(initialSort && allowedSorts.includes(initialSort) ? initialSort : "featured");
  const filtered = useMemo(() => {
    const result = category === "All" ? [...products] : products.filter((product) => product.category === category);
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "newest") result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "featured") result.sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [category, products, sort]);
  return <><div className="catalog-toolbar"><div><span className="catalog-toolbar-label">Filter by</span><div className="filter-list">{categories.map((item) => <button key={item} className={`filter-button ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="catalog-toolbar-end"><span className="product-count">{filtered.length} {filtered.length === 1 ? "frame" : "frames"}</span><label className="sort-control"><span>Sort</span><select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option></select></label></div></div><div className="catalog-grid"><ProductGrid products={filtered} /></div></>;
}
