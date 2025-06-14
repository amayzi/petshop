// src/app/produtos/page.tsx
// Página para exibir a lista de produtos em estoque.

// Importa a função que busca os produtos da nossa API.
import { getProducts } from '@/services/api';

// Define a estrutura de dados (tipagem) para um único produto.
interface Product {
  id: number;
  name: string;
  category: string;
  price: string | number; // O preço pode ser texto ou número.
  stock_quantity: number;
}

// Componente da página de Estoque. É assíncrono para poder buscar dados antes de renderizar.
export default async function EstoquePage() {
  // Chama a API para buscar os produtos.
  //const response = await getProducts();
  // Extrai a lista de produtos da resposta da API. Se não houver, usa um array vazio.
  //const products: Product[] = response?.data || [];
  const products: Product[] = await getProducts();

  console.log('Produtos recebidos:', products);

  return (
    // Container principal da página com fundo branco.
    <div className="min-h-screen px-6 py-10 bg-white">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Estoque de Produtos</h1>
        {/* Container da tabela com sombra e bordas arredondadas. */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Tabela para listar os produtos. */}
          <table className="min-w-full divide-y divide-gray-200">
            {/* Cabeçalho da tabela. */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
              </tr>
            </thead>
            {/* Corpo da tabela. */}
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Verifica se existem produtos para exibir. */}
              {products.length > 0 ? (
                // Se houver produtos, mapeia cada um para uma linha da tabela.
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    {/* Formata o preço para o padrão brasileiro (R$ 123,45). */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {Number(product.price).toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{product.stock_quantity}</td>
                  </tr>
                ))
              ) : (
                // Se não houver produtos, exibe uma mensagem.
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">Nenhum produto em estoque.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}