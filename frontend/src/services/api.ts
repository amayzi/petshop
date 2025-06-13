// src/services/api.ts

// Interface que define a "forma" dos dados que o formulário de criação envia
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock_quantity: string;
  category: string;
  image_url: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchData(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || 'Ocorreu um erro na API.');
    }
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }
  } catch (error) {
    console.error(`Falha ao processar a requisição para ${endpoint}:`, error);
    throw error;
  }
}

// --- Funções Exportadas ---

// Busca todos os produtos
export const getProducts = () => fetchData('/products');

// Cria um novo produto, agora com a tipagem correta para 'data'
export const createProduct = (data: ProductFormData) => fetchData('/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});