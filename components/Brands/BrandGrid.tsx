import React, { useEffect, useState } from 'react';
import SingleBrand from './SingleBrand';
import { Brand } from '@/types/brand';

const BrandGrid = ({ brands }: { brands: Brand[] }) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefetchImages = async () => {
      // Create an array of promises for image loading
      const imagePromises = brands.map((brand) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = brand.image;
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, brand.image]));
            resolve(brand.image);
          };
          img.onerror = reject;
        });
      });

      try {
        // Load all images concurrently with Promise.allSettled
        await Promise.allSettled(imagePromises);
      } finally {
        setIsLoading(false);
      }
    };

    prefetchImages();
  }, [brands]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="bg-slate-200 w-36 h-36 sm:w-28 sm:h-28 lg:w-48 lg:h-48 rounded"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {brands.map((brand) => (
        <SingleBrand 
          key={brand.id}
          brand={{
            ...brand,
            isLoaded: loadedImages.has(brand.image)
          }}
        />
      ))}
    </div>
  );
};

export default BrandGrid;