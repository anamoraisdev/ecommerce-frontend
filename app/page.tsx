"use client";
import Carousel from "@/app/components/carousel";
import banner1 from "/public/assets/banner1.png";
import banner2 from "/public/assets/banner2.png";
import { StaticImageData } from "next/image";
import service from "@/lib/service";
import { useEffect, useState } from "react";
import { Product } from "@/app/components/cardProduct";
import Collection from "@/app/components/collection";
import { useUser } from "./context/userContext";
import { collectionsData } from "./api/collections";

export interface propsImages {
  images: StaticImageData[]
}
export interface CollectionProduct {
  id: number,
  name: string,
  description: string
  products: Product[]
}

export default function Home() {
  const imagesBanner = [banner1, banner2]
  const {user} = useUser();
  const [collections, setCollections] = useState<CollectionProduct[]>(collectionsData);

  useEffect(() => {
    if (user) {
      console.log('User logado:', user);
    } else {
      console.log('Nenhum usuário logado');
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Carousel images={imagesBanner} />
      {collections && collections?.map((collection) =>
        <Collection key={collection.id} products={collection.products} name={collection.name} id={collection.id} />
      )}
    </div>
  );
}

