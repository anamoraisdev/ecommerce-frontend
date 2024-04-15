"use client";
import Carousel from "@/components/carousel";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import { StaticImageData } from "next/image";
import service from "@/lib/service";
import { useEffect, useState } from "react";

export interface propsImages {
  images: StaticImageData[]
}
export default function Home() {
  const images = [banner1, banner2]
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await service.getData("products");
        setProducts(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Carousel images={images} />
    </div>

  );
}
