'use client';
import Swal from 'sweetalert2';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

const CartPage = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    const increaseQuantity = (id: number) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (id: number) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        Swal.fire({
            title: 'Başarılı!',
            text: 'Ürün sepetten kaldırıldı.',
            icon: 'success',
            confirmButtonText: 'Tamam'
        });
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {cart.map((item) => (
                            <div key={item.id} className="border p-4 rounded-lg shadow-sm">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-96 h-96 object-cover mb-4"
                                    width={300}
                                    height={300}
                                />
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-500">${item.price}</p>
                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                <div className="flex items-center space-x-2 mt-4">
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
