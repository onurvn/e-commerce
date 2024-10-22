'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    Swal.fire({
      title: 'Başarılı!',
      text: 'Ürün favorilerden kaldırıldı.',
      icon: 'success',
      confirmButtonText: 'Tamam'
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>Your favorites list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
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
              <button
                onClick={() => removeFromFavorites(item.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
