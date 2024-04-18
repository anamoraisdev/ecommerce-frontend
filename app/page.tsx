"use client";
import Carousel from "@/components/carousel";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import { StaticImageData } from "next/image";
import service from "@/lib/service";
import { useEffect, useState } from "react";
import { Product } from "@/components/cardProduct";
import Collection from "@/components/collection";

export interface propsImages {
  images: StaticImageData[]
}
export interface CollectionProduct {
  name: string,
  id: number,
  products: Product[]
}

export default function Home() {
  const imagesBanner = [banner1, banner2]
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<CollectionProduct[]>();

  const fetchProducts = async () => {
    try {
      const products = await service.getData("products");
      setProducts(products.products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchCollections = async () => {
    try {
      const collections = await service.getData("collections_of_products");
      setCollections(collections.collections_of_products);
    } catch (error) {
      console.error('Erro ao buscar coleções:', error);
    }
  };


  useEffect(() => {
    fetchProducts()
    fetchCollections()
  }, []);


  return (
    <div className="flex min-h-screen flex-col items-center">
      <Carousel images={imagesBanner} />
      {collections && collections?.map((colletion) =>
        <Collection key={colletion.id} products={colletion.products} name={colletion.name} />
      )}
    </div>

  );
}
