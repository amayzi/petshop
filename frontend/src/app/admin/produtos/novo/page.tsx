// src/app/admin/produtos/novo/page.tsx
'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { createProduct } from '@/services/api';
import Link from 'next/link';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
  category: string;
  image_url: string;
}

export default function NovoProdutoPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    stock_quantity: '0',
    category: 'Alimentação',
    image_url: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('Cadastrando produto...');
    try {
      const result = await createProduct(formData);
      setMessage(`Produto "${result.name}" cadastrado com sucesso!`);
      setFormData({ name: '', description: '', price: '', stock_quantity: '0', category: 'Alimentação', image_url: '' });
    } catch (error: any) {
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Produto</h1>
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
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
          {message && <p className="text-center mt-4 p-2 bg-gray-100 rounded">{message}</p>}
        </form>
      </section>
    </div>
  );
}