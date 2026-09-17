import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ArrowDown } from "lucide-react";
import { getProducts } from "@/src/lib/products";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string | string[]; sort?: string | string[] }> }) {
  const products = await getProducts();
  const query = await searchParams;
  const initialCategory = Array.isArray(query.category) ? query.category[0] : query.category;
  const initialSort = Array.isArray(query.sort) ? query.sort[0] : query.sort;
  return <div className="site-page"><Navbar /><main className="page-main collection-page"><div className="section-shell"><header className="page-header collection-header"><div className="collection-header-copy"><p className="eyebrow">The complete edit</p><h1 className="page-title">Our Collection</h1><p className="page-intro">Timeless designs for every vision. Explore considered frames made to become part of your everyday.</p><span className="collection-scroll-cue"><ArrowDown size={14} /> Discover the collection</span></div><div className="collection-header-visual"><span>VISIONA / 2026</span><strong>Clarity<br />in every<br />detail.</strong><small>{products.length} considered frames</small></div></header><ProductCatalog products={products} initialCategory={initialCategory} initialSort={initialSort} /></div></main><Footer /></div>;
}
