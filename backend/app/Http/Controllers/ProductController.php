<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products
    public function index() {
        return Product::all();
    }

    // POST /api/products
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0.01',
            'stock_quantity' => 'required|integer|min:0',
            'category' => 'required|string|in:Alimentação,Acessórios,Brinquedos,Saúde',
            'image_url' => 'nullable|url',
            'is_active' => 'boolean'
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    // GET /api/products/{id}
    public function show($id) {
        return Product::findOrFail($id);
    }

    // PUT /api/products/{id}
    public function update(Request $request, $id) {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return $product;
    }

    // DELETE /api/products/{id}
    public function destroy($id) {
        Product::destroy($id);
        return response()->json(['message' => 'Produto deletado']);
    }
}