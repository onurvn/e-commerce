'use client';
import Swal from 'sweetalert2';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
};

const addToFavorites = (product: Product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isAlreadyFavorite = favorites.some((item: Product) => item.id === product.id);
    if (isAlreadyFavorite) {
        Swal.fire({
            title: 'Başarısız!',
            text: `${product.title} zaten favorilere eklendi.`,
            icon: 'error',
            confirmButtonText: 'Tamam'
        });
        return;
    }

    const updatedFavorites = [...favorites, product];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    Swal.fire({
        title: 'Başarılı!',
        text: `${product.title} favorilere eklendi.`,
        icon: 'success',
        confirmButtonText: 'Tamam'
    });
};

const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const productWithQuantity = { ...product, quantity: 1 };
        cart.push(productWithQuantity);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        title: 'Başarılı!',
        text: `${product.title} sepete eklendi.`,
        icon: 'success',
        confirmButtonText: 'Tamam'
    });
};

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <Link href={`/products/${product.id}`}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            className="w-96 h-96 object-cover mb-4"
                            width={300}
                            height={300}
                        />
                    </Link>
                    <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                            <h2 className="font-semibold hover:text-blue-500 cursor-pointer text-nowrap">{product.title}</h2>
                        </Link>
                        <p className="text-gray-500 text-xl font-bold">${product.price}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600 transition duration-200"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => addToFavorites(product)}
                                className="px-4 py-2 bg-sky-900 text-white rounded hover:bg-red-600 transition duration-200"
                            >
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
