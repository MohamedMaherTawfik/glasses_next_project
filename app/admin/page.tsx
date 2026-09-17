import { AdminDashboard } from "@/app/admin/AdminDashboard";
import { getProducts } from "@/src/lib/products";

export default async function AdminPage() {
  const products = await getProducts();
  return <main className="admin-page"><AdminDashboard initialProducts={products} /></main>;
}
