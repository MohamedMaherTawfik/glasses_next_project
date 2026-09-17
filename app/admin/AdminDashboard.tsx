"use client";

import { LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { AdminTable } from "@/components/AdminTable";
import { ProductForm } from "@/components/ProductForm";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/src/config/admin.config";
import type { Product } from "@/src/types/product";

type ProductDraft = Omit<Product, "id"> & { id?: string };

export function AdminDashboard({ initialProducts }: { initialProducts: Product[] }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | undefined>();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const login = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); if (form.get("username") === ADMIN_USERNAME && form.get("password") === ADMIN_PASSWORD) { setAuthenticated(true); setError(""); } else setError("The username or password is incorrect."); };
  const save = (draft: ProductDraft) => { const next = { ...draft, id: draft.id ?? crypto.randomUUID() } as Product; setProducts((current) => draft.id ? current.map((item) => item.id === draft.id ? next : item) : [next, ...current]); setAdding(false); setEditing(undefined); };
  const remove = (product: Product) => { if (window.confirm(`Delete ${product.name}?`)) setProducts((current) => current.filter((item) => item.id !== product.id)); };
  if (!authenticated) return <div className="login-card"><span className="wordmark">VISIONA</span><h1>Admin access</h1>{error && <div className="login-error">{error}</div>}<form onSubmit={login}><div className="form-field" style={{ marginBottom: 15 }}><label htmlFor="username">Username</label><input id="username" name="username" autoComplete="username" required /></div><div className="form-field" style={{ marginBottom: 23 }}><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div><button className="button-gold" type="submit" style={{ width: "100%", justifyContent: "center" }}>Sign In</button></form></div>;
  return <div className="admin-shell"><div className="admin-topbar"><div><p className="eyebrow">Visiona catalog</p><h1>Product dashboard</h1><p>Manage the frames shown across your collection.</p></div><div className="admin-actions"><button className="small-button" onClick={() => setAuthenticated(false)}><LogOut size={12} /> Sign out</button><button className="button-gold" onClick={() => { setAdding(true); setEditing(undefined); }}><Plus size={14} /> Add product</button></div></div>{adding || editing ? <ProductForm product={editing} onSubmit={save} onCancel={() => { setAdding(false); setEditing(undefined); }} /> : <AdminTable products={products} onEdit={(product) => setEditing(product)} onDelete={remove} />}</div>;
}
