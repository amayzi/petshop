// src/layout.tsx
// Layout principal com menu de navegação simplificado.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Controle de Estoque - PetShop",
  description: "Gerenciamento de produtos do PetShop Amor & Cuidado",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="w-full py-4 px-8 shadow-md flex justify-between items-center bg-gray-800 text-white">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/image.png" alt="Logo Petshop" width={40} height={40} />
            <h1 className="text-xl font-bold tracking-tight">PetShop Estoque</h1>
          </Link>
          <nav className="flex items-center gap-6 font-medium">
            <Link href="/produtos" className="hover:text-blue-400">Ver Estoque</Link>
            <Link href="/admin/produtos/novo" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Cadastrar Produto
            </Link>
          </nav>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="w-full p-4 bg-gray-100 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PetShop Amor & Cuidado.</p>
        </footer>
      </body>
    </html>
  );
}