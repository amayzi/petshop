// src/page.tsx
// Esta é a página inicial (Home) do site.

// Marca este componente como um "Client Component" para interatividade no navegador.
"use client";

// Define o componente da página Home.
export default function Home() {
  return (
    // Container principal da página, centralizado e com espaçamento.
    <main className="flex-grow p-6 sm:p-12 flex flex-col items-center text-center gap-10">
      {/* Seção de boas-vindas. */}
      <section className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Bem-vindo ao PetShop Amor & Cuidado!</h2>
        <p className="text-lg text-gray-700">
          Oferecemos os melhores serviços e produtos para o seu pet com carinho, segurança e confiança.
        </p>
      </section>

      {/* Seção que lista os serviços oferecidos, em formato de grid. */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10" id="servicos">
        {/* Card do serviço de Banho & Tosa. */}
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Banho & Tosa</h3>
          <p className="text-sm text-gray-700">Higiene e beleza com profissionais especializados.</p>
        </div>
        {/* Card do serviço de Consulta Veterinária. */}
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Consulta Veterinária</h3>
          <p className="text-sm text-gray-700">Cuidados com a saúde do seu pet com total atenção.</p>
        </div>
        {/* Card da seção de Produtos. */}
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Produtos</h3>
          <p className="text-sm text-gray-700">Rações, brinquedos e acessórios de alta qualidade.</p>
        </div>
      </section>
    </main>
  );
}