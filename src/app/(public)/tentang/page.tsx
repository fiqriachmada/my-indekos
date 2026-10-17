import { PublicHeader } from "@/components/public-header";
import { TentangHero } from "./_components/tentang-hero";
import { TentangValues } from "./_components/tentang-values";
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami — My Indekos",
  description:
    "Mengenal visi, misi, dan tim di balik platform manajemen kos terintegrasi My Indekos.",
};

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <main>
        <TentangHero />
        <TentangValues />
      </main>
      <footer className="border-t border-border bg-card py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} My Indekos. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground">
              Beranda
            </Link>
            <Link href="/fitur" className="hover:text-foreground">
              Fitur
            </Link>
            <Link href="/properties" className="hover:text-foreground">
              Cari Kos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
