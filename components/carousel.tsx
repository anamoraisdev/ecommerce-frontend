import { propsImages } from '@/app/page';
import Image from 'next/image';
import React, { useState } from 'react';

const Carousel = ({ images }: propsImages) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden relative w-full">
        <div className="flex w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`h-auto
               w-full ${
                index === currentSlide ? 'block' : 'hidden'
              }`}
            >
              <Image src={image} alt={`Slide ${index}`}  priority /> 
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l"
          onClick={prevSlide}
        >
          Anterior
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r"
          onClick={nextSlide}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Carousel;

