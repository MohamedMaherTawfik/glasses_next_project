"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/src/types/product";
import { formatPrice, imagePath } from "@/src/types/product";

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.article className="product-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="product-card-image">
        <Link className="product-image-link" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <span className="product-badge">{product.featured ? "Signature" : "New season"}</span>
          <Image src={imagePath(product.image)} alt={product.name} fill sizes="(max-width: 620px) 50vw, 25vw" />
          <span className="product-quick-link">View frame <ArrowUpRight size={14} strokeWidth={1.5} /></span>
        </Link>
        <button className={`product-card-heart ${saved ? "saved" : ""}`} aria-label={`${saved ? "Remove" : "Save"} ${product.name}`} aria-pressed={saved} onClick={() => setSaved((value) => !value)}><Heart size={16} fill={saved ? "currentColor" : "none"} strokeWidth={1.35} /></button>
      </div>
      <Link className="product-card-info" href={`/products/${product.slug}`}>
        <div><p>{product.category}</p><h3>{product.name}</h3></div><span className="product-price">{formatPrice(product.price)}</span>
      </Link>
    </motion.article>
  );
}
