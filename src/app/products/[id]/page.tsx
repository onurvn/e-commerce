'use client';
import Swal from 'sweetalert2';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
};

const getProduct = async (id: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    return res.json();
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

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const resolvedParams = await params;
            const fetchedProduct = await getProduct(resolvedParams.id);
            setProduct(fetchedProduct);
        };

        fetchProduct();
    }, [params]);

    useEffect(() => {
        if (product) {
            gsap.fromTo(
                '.product-detail',
                { opacity: 0, y: -50 },
                { duration: 1, opacity: 1, y: 0 }
            );
        }
    }, [product]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className="p-8 product-detail">
            <div className="flex flex-col md:flex-row gap-8">
                <Image
                    src={product.image}
                    alt={product.title}
                    className="h-auto w-auto object-cover"
                    width={300}
                    height={300}
                />
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-500 text-lg mb-4">${product.price}</p>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <button
                        onClick={() => addToCart(product)} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;
