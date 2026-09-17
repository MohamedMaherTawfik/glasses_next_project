"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/src/types/product";
import { imagePath } from "@/src/types/product";

export function Hero({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const current = products[active] ?? products[0];
  useEffect(() => {
    if (products.length < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % products.length), 6200);
    return () => window.clearInterval(timer);
  }, [products.length]);

  const move = (direction: number) => setActive((index) => (index + direction + products.length) % products.length);
  return (
    <section className="hero" aria-label="Visiona latest collection">
      <div className="hero-copy">
        <div className="hero-edition"><span>New collection</span><span>2026 / 04</span></div>
        <p className="eyebrow">See a better you</p>
        <AnimatePresence mode="wait"><motion.h1 key={current?.id ?? "hero"} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>Discover<br />Your Perfect<br />Frame</motion.h1></AnimatePresence>
        <p>Premium eyewear shaped with intention—designed for modern life, made to become unmistakably yours.</p>
        <div className="hero-actions"><Link className="button-gold" href="/products">Explore Collection <ArrowRight size={16} strokeWidth={1.4} /></Link><Link className="hero-secondary-link" href="/#story">Our philosophy <ArrowRight size={14} strokeWidth={1.4} /></Link></div>
        <div className="hero-controls">
          <span className="hero-counter">{String(active + 1).padStart(2, "0")}</span>
          <div className="hero-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / Math.max(products.length, 1)) * 100}%` }} /></div>
          <span className="hero-counter hero-counter-muted">{String(products.length).padStart(2, "0")}</span>
          <div className="hero-arrow-group"><button aria-label="Previous frame" onClick={() => move(-1)}><ChevronLeft size={16} /></button><button aria-label="Next frame" onClick={() => move(1)}><ChevronRight size={16} /></button></div>
        </div>
      </div>
      <div className="hero-image-wrap">
        <AnimatePresence mode="wait">
          {current ? <motion.div key={current.id} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }} style={{ position: "absolute", inset: 0 }}><Image className="hero-image" src={imagePath(current.image)} alt={current.name} fill priority sizes="(max-width: 620px) 100vw, 53vw" /></motion.div> : <div className="hero-image-fallback" />}
        </AnimatePresence>
        {current && <div className="hero-product-meta"><span>{current.category}</span><strong>{current.name}</strong><Link href={`/products/${current.slug}`}>View this frame <ArrowRight size={13} /></Link></div>}
        <div className="hero-phrase">Style<br />Clarity<br />Confidence</div>
      </div>
    </section>
  );
}
