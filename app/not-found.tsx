import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return <div className="site-page"><Navbar /><main className="not-found"><div><p className="eyebrow">A different point of view</p><h1>Frame not found</h1><p style={{ color: "var(--muted)", marginBottom: 24 }}>The frame you are looking for may have moved.</p><Link className="button-gold" href="/products">Explore Collection <span>→</span></Link></div></main></div>;
}
