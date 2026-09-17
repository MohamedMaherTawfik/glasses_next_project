import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductBySlug } from "@/src/lib/products";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <div className="site-page"><Navbar /><main className="detail-main"><div className="section-shell"><Link href="/products" className="text-link" style={{ marginBottom: 28 }}><ArrowLeft size={15} /> Back to collection</Link><ProductDetail product={product} /></div></main><Footer /></div>;
}
