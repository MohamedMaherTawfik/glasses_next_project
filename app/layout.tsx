import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VISIONA — Premium Eyewear",
  description: "Timeless frames designed for every vision.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
