import React from 'react';
import ProductList from '@/app/components/productList';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};


const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

const HomePage = async () => {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">E-commerce Store</h1>
      <ProductList products={products} />
    </main>
  );
};

export default HomePage;
