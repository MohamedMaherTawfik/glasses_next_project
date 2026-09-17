import Image from "next/image";
import { ArrowRight, Diamond, Eye, Globe2, Leaf, Quote, Star } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionReveal } from "@/components/SectionReveal";
import { getProducts } from "@/src/lib/products";

const categories = [
  { name: "Sunglasses", eyebrow: "For brighter days", image: "/images/products/rayban-classic.jpg" },
  { name: "Optical", eyebrow: "Everyday clarity", image: "/images/products/oakley-minimal.jpg" },
  { name: "Women", eyebrow: "Elegant & modern", image: "/images/products/gucci-urban.jpg" },
  { name: "Men", eyebrow: "Bold & timeless", image: "/images/products/persol-legacy.jpg" },
];

export default async function Home() {
  const products = await getProducts();
  const latest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const bestSellers = featured.length ? featured : products.slice(0, 4);
  const newArrivals = latest.length ? latest : products.slice(-4);

  return (
    <div className="site-page">
      <Navbar overlay />
      <main>
        <Hero products={latest} />

        <section className="brand-intro" aria-label="Visiona design philosophy">
          <p>Independent design</p><span aria-hidden="true" />
          <h2>Frames that change<br />the way you see yourself.</h2>
          <p>New York · Since 2018</p>
        </section>

        <SectionReveal>
          <section className="section-shell categories-section" id="collection">
            <div className="section-heading section-heading-inline">
              <div><p className="eyebrow">Made for every point of view</p><h2>Featured Collections</h2><p className="section-subtitle">Four distinct edits, one unmistakable design language.</p></div>
              <Link className="text-link" href="/products">Explore all collections <ArrowRight size={16} strokeWidth={1.5} /></Link>
            </div>
            <div className="category-grid">{categories.map((category, index) => <CategoryCard key={category.name} {...category} index={index} />)}</div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="best-sellers-section">
            <div className="section-shell">
              <div className="section-heading section-heading-inline">
                <div><p className="eyebrow">The icons</p><h2>Best Sellers</h2><p className="section-subtitle">Signature silhouettes, chosen again and again.</p></div>
                <Link className="text-link" href="/products">View the edit <ArrowRight size={16} strokeWidth={1.5} /></Link>
              </div>
              <ProductGrid products={bestSellers} />
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="story-editorial" id="story">
            <div className="story-editorial-image"><Image src="/images/banners/story-eyewear.jpg" alt="Visiona eyewear in a bold editorial setting" fill sizes="(max-width: 760px) 100vw, 52vw" /></div>
            <div className="story-editorial-copy">
              <p className="eyebrow eyebrow-light">Our point of view</p>
              <h2>More than eyewear.<br />A way of seeing.</h2>
              <p>Visiona began with a simple belief: the right frame does more than sharpen your sight—it changes how you enter a room. We bring architectural lines, expressive materials, and human comfort into perfect balance.</p>
              <div className="story-signature"><span>VISIONA</span><small>Designed with clarity and character</small></div>
              <Link className="light-link" href="/products">Discover our frames <ArrowRight size={16} strokeWidth={1.5} /></Link>
              <div className="story-stat"><strong>08</strong><span>years of independent<br />frame design</span></div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="section-shell why-section" aria-labelledby="why-title">
            <div className="section-heading why-heading"><p className="eyebrow">Designed around you</p><h2 id="why-title">Why Choose Visiona</h2><p className="section-subtitle">The details you feel long after the first impression.</p></div>
            <div className="why-grid">
              <article><span>01</span><Diamond size={30} strokeWidth={1.1} /><h3>Quality materials</h3><p>Considered acetate, precision metals, and components chosen for lasting beauty.</p></article>
              <article><span>02</span><Eye size={30} strokeWidth={1.1} /><h3>Modern design</h3><p>Clean, expressive silhouettes with just enough character to feel unmistakably yours.</p></article>
              <article><span>03</span><Leaf size={30} strokeWidth={1.1} /><h3>Comfortable fit</h3><p>Balanced proportions and lightweight construction, refined for all-day wear.</p></article>
              <article><span>04</span><Globe2 size={30} strokeWidth={1.1} /><h3>Premium experience</h3><p>Thoughtful guidance and considered service, wherever in the world you see us from.</p></article>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="new-arrivals-section">
            <div className="new-arrivals-intro">
              <p className="eyebrow eyebrow-light">Just landed</p>
              <h2>New<br />Arrivals</h2>
              <p>Fresh proportions and refined materials, created for a new season of seeing.</p>
              <Link className="light-link" href="/products?sort=newest">Shop new arrivals <ArrowRight size={16} strokeWidth={1.5} /></Link>
              <span className="new-arrivals-index">Edition 04 — 2026</span>
            </div>
            <div className="new-arrivals-products"><ProductGrid products={newArrivals} /></div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="section-shell reviews-section">
            <div className="reviews-heading"><p className="eyebrow">Worn with confidence</p><h2>Seen through<br />their eyes.</h2><div className="review-rating"><span>4.9</span><div>{[0,1,2,3,4].map((star) => <Star key={star} size={13} fill="currentColor" strokeWidth={1} />)}<small>from 240+ reviews</small></div></div></div>
            <div className="reviews-grid">
              <article><Quote size={28} strokeWidth={1} /><p>“The proportions feel incredibly considered. They make a statement without trying too hard—and I can wear them all day.”</p><footer><strong>Amelia R.</strong><span>London · Cartier Élite</span></footer></article>
              <article><Quote size={28} strokeWidth={1} /><p>“Beautiful packaging, a remarkably light frame, and the kind of finish you notice more every time you put them on.”</p><footer><strong>Daniel K.</strong><span>New York · Ray-Ban Classic</span></footer></article>
              <article><Quote size={28} strokeWidth={1} /><p>“Visiona feels modern and personal. The frame arrived exactly as pictured and the fit was right from the first wear.”</p><footer><strong>Sofia M.</strong><span>Milan · Gucci Urban</span></footer></article>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="community-section">
            <div><p className="eyebrow">The Visiona community</p><h2>A clearer world,<br />delivered quietly.</h2></div>
            <div className="community-form-wrap"><p>New releases, design stories, and private previews—sent with intention.</p><form className="community-form"><label className="sr-only" htmlFor="community-email">Email address</label><input id="community-email" type="email" placeholder="Your email address" /><button type="submit" aria-label="Join the Visiona community"><ArrowRight size={18} /></button></form><small>By subscribing, you agree to receive Visiona news.</small></div>
          </section>
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
