'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductImageGallery({ images, productName }: { images: string[], productName: string }) {
  const [activeImage, setActiveImage] = useState(images[0] || 'https://picsum.photos/seed/placeholder/1200/900');

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
        <Image
          src={activeImage}
          alt={productName}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img: string, i: number) => (
            <div 
              key={i} 
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition shadow-sm ${
                activeImage === img ? 'border-orange-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${productName} thumbnail ${i}`} fill sizes="80px" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
