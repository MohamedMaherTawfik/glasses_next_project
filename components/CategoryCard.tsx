"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CategoryCard({ name, eyebrow, image, index }: { name: string; eyebrow: string; image: string; index: number }) {
  return (
    <motion.article className="category-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .22 }} transition={{ delay: index * .07, duration: .6, ease: [0.22, 1, 0.36, 1] }}>
      <Link className="category-card-link" href={`/products?category=${encodeURIComponent(name)}`}>
        <span className="category-number">0{index + 1}</span>
        <div className="category-card-copy"><p>{eyebrow}</p><h3>{name}</h3></div>
        <span className="category-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.4} /></span>
        <Image src={image} alt={`${name} eyewear`} fill sizes="(max-width: 620px) 100vw, 25vw" />
      </Link>
    </motion.article>
  );
}
