// src/layout.tsx
// Este é o layout principal que envolve todas as páginas.

// Importa o tipo Metadata para definir os metadados da página.
import type { Metadata } from "next";
// Importa as fontes Geist Sans e Geist Mono do Google Fonts.
import { Geist, Geist_Mono } from "next/font/google";
// Importa o arquivo de estilos globais.
import "./globals.css";
// Importa o componente Link para navegação entre páginas.
import Link from "next/link";
// Importa o componente Image para otimização de imagens.
import Image from "next/image";

// Carrega a fonte Geist Sans, associando-a a uma variável CSS.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Carrega a fonte Geist Mono, associando-a a uma variável CSS.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Define os metadados da página, como título e descrição.
export const metadata: Metadata = {
  title: "Controle de Estoque - PetShop",
  description: "Gerenciamento de produtos do PetShop Amor & Cuidado",
};

// Define o componente RootLayout que recebe `children` (o conteúdo da página).
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Define o idioma da página como português do Brasil.
    <html lang="pt-BR">
      {/* Aplica as variáveis de fonte e suavização de serrilhado ao corpo. */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Cabeçalho da página com fundo escuro e itens alinhados. */}
        <header className="w-full py-4 px-8 shadow-md flex justify-between items-center bg-gray-800 text-white">
          {/* Link para a página inicial com logo e título. */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/image.png" alt="Logo Petshop" width={40} height={40} />
            <h1 className="text-xl font-bold tracking-tight">PetShop Estoque</h1>
          </Link>
          {/* Menu de navegação. */}
          <nav className="flex items-center gap-6 font-medium">
            <Link href="/produtos" className="hover:text-blue-400">Ver Estoque</Link>
            {/* Botão para cadastrar um novo produto. */}
            <Link href="/admin/produtos/novo" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Cadastrar Produto
            </Link>
          </nav>
        </header>

        {/* O conteúdo principal da página será renderizado aqui. */}
        <main className="flex-grow">{children}</main>

        {/* Rodapé da página. */}
        <footer className="w-full p-4 bg-gray-100 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PetShop Amor & Cuidado.</p>
        </footer>
      </body>
    </html>
  );
}