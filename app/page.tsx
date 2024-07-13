"use client";
import Carousel from "@/app/components/carousel";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import { StaticImageData } from "next/image";
import service from "@/lib/service";
import { useEffect, useState } from "react";
import { Product } from "@/app/components/cardProduct";
import Collection from "@/app/components/collection";


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

  const fetchCollections = async () => {
    try {
      const collections = await service.getData("collections_of_products");
      setCollections(collections.collections_of_products);
    } catch (error) {
      console.error('Erro ao buscar coleções:', error);
    }
  };

  useEffect(() => {
    fetchCollections()
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Carousel images={imagesBanner} />
      {collections && collections?.map((collection) =>
        <Collection key={collection.id} products={collection.products} name={collection.name} id={collection.id} />
      )}
    </div>
  );
}

