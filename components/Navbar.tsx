"use client";

import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`navbar ${overlay ? "navbar-overlay nav-overlay-light" : ""}`}>
      <Link className="wordmark" href="/">VISIONA</Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/">Home</Link><Link href="/products">Collection</Link><Link href="/#story">About</Link><Link href="/#contact">Contact</Link>
      </nav>
      <div className="nav-actions">
        <button className="nav-icon" aria-label="Search"><Search size={15} strokeWidth={1.5} /></button>
        <button className="nav-icon" aria-label="Saved frames"><Heart size={15} strokeWidth={1.5} /></button>
        <button className="nav-icon" aria-label="View bag"><ShoppingBag size={15} strokeWidth={1.5} /></button>
        <button className="nav-icon menu-button" aria-label="Open menu" onClick={() => setOpen((value) => !value)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {open && <div className="mobile-menu"><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/products" onClick={() => setOpen(false)}>Collection</Link><Link href="/#story" onClick={() => setOpen(false)}>About</Link><Link href="/#contact" onClick={() => setOpen(false)}>Contact</Link></div>}
    </header>
  );
}
