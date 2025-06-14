// src/app/admin/produtos/novo/page.tsx
// Página com formulário para cadastrar um novo produto.

// Marca este como um "Componente de Cliente" para poder usar interatividade e estado (useState).
'use client';
// Importa hooks do React para gerenciar estado e eventos.
import { useState, FormEvent, ChangeEvent } from 'react';
// Importa a função que envia os dados do novo produto para a API.
import { createProduct } from '@/services/api';

// Define a estrutura de dados (tipagem) para o formulário.
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
  category: string;
  image_url: string; // Embora não usado no form, está aqui para a estrutura.
}

// Componente da página de Novo Produto.
export default function NovoProdutoPage() {
  // Cria um estado para armazenar os dados do formulário.
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    stock_quantity: '0',
    category: 'Alimentação', // Categoria padrão.
    image_url: '',
  });
  // Estado para guardar a mensagem de feedback (sucesso ou erro).
  const [message, setMessage] = useState('');
  // Estado para controlar se o formulário está sendo enviado (para desabilitar o botão).
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função chamada sempre que um campo do formulário muda.
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Atualiza o estado 'formData' com o novo valor do campo que mudou.
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Função chamada quando o formulário é enviado.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Impede o recarregamento padrão da página.
    setIsSubmitting(true); // Desabilita o botão de submit.
    setMessage('Cadastrando produto...'); // Mostra uma mensagem de carregamento.
    try {
      // Chama a função da API para criar o produto com os dados do formulário.
      const result = await createProduct(formData);
      // Define a mensagem de sucesso.
      setMessage(`Produto "${result.name}" cadastrado com sucesso!`);
      // Limpa o formulário para um novo cadastro.
      setFormData({ name: '', description: '', price: '', stock_quantity: '0', category: 'Alimentação', image_url: '' });
    } catch (error: any) {
      // Se der erro, define a mensagem de erro.
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } finally {
      // Reabilita o botão, independentemente de sucesso ou erro.
      setIsSubmitting(false);
    }
  };

  return (
    // Container principal com fundo cinza claro.
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Produto</h1>
        {/* Formulário que chama handleSubmit ao ser enviado. */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded p-2" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full border-gray-300 rounded p-2"></textarea>
          </div>
           <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (ex: 80.00)</label>
            <input type="number" id="price" step="0.01" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded p-2" />
          </div>
          <div>
            <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
            <input type="number" id="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded p-2" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
            <select id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded p-2">
              <option value="Alimentação">Alimentação</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Brinquedos">Brinquedos</option>
              <option value="Saúde">Saúde</option>
              <option value="Serviços">Serviços</option>
            </select>
          </div>
          {/* Botão de submit, que fica desabilitado durante o envio. */}
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
          {/* Mostra a mensagem de feedback, se houver alguma. */}
          {message && <p className="text-center mt-4 p-2 bg-gray-100 rounded">{message}</p>}
        </form>
      </section>
    </div>
  );
}