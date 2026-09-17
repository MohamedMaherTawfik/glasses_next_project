"use client";

import Image from "next/image";
import { ShieldCheck, Sun, Truck } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/src/types/product";
import { formatPrice, imagePath } from "@/src/types/product";

export function ProductDetail({ product }: { product: Product }) {
  const images = product.gallery.length ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  return <div className="detail-layout"><div className="detail-gallery"><div className="detail-thumbs">{images.map((image, index) => <button key={`${image}-${index}`} className={`detail-thumb ${activeImage === index ? "active" : ""}`} onClick={() => setActiveImage(index)}><Image src={imagePath(image)} alt={`${product.name} view ${index + 1}`} fill sizes="75px" /></button>)}</div><div className="detail-main-image"><Image src={imagePath(images[activeImage])} alt={product.name} fill priority sizes="(max-width: 620px) 100vw, 55vw" /></div></div><div className="detail-copy"><p className="detail-category">{product.category}</p><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)}</p><p className="detail-description">{product.description}</p><div className="option-block"><span className="option-label">Color</span><div className="color-options">{product.colors.map((item, index) => <button key={item} className={`color-option ${color === item ? "active" : ""}`} onClick={() => setColor(item)} aria-label={item} title={item}><span style={{ background: ["#181817", "#b99463", "#70533a", "#baa59b", "#315247"][index % 5] }} /></button>)}</div></div><div className="option-block"><span className="option-label">Size</span><div className="size-options">{product.sizes.map((item) => <button key={item} className={`size-option ${size === item ? "active" : ""}`} onClick={() => setSize(item)}>{item}</button>)}</div></div><button className="inquiry-button">Request Info <span style={{ marginLeft: 10 }}>→</span></button><div className="detail-benefits"><div className="detail-benefit"><ShieldCheck size={16} strokeWidth={1.2} /><span>Premium Quality</span></div><div className="detail-benefit"><Sun size={16} strokeWidth={1.2} /><span>UV Protection</span></div><div className="detail-benefit"><Truck size={16} strokeWidth={1.2} /><span>Worldwide Shipping</span></div></div></div></div>;
}
