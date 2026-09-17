import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/src/types/product";
import { formatPrice, imagePath } from "@/src/types/product";

export function AdminTable({ products, onEdit, onDelete }: { products: Product[]; onEdit: (product: Product) => void; onDelete: (product: Product) => void }) {
  return <div className="admin-card admin-table-wrap"><table className="admin-table"><thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td><Image className="admin-table-image" src={imagePath(product.image)} alt="" width={50} height={40} /></td><td>{product.name}</td><td>{product.category}</td><td>{formatPrice(product.price)}</td><td><div className="admin-actions"><button className="small-button" onClick={() => onEdit(product)}><Pencil size={12} /> Edit</button><button className="small-button danger" onClick={() => onDelete(product)}><Trash2 size={12} /> Delete</button></div></td></tr>)}</tbody></table></div>;
}
