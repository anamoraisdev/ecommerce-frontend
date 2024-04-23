'use client';

import service from "@/lib/service";
import { Product } from "../components/cardProduct";
import { useEffect, useState } from "react";
import Carousel from "../components/carousel";

const Product = ({ searchParams }: any) => {
    const productId = searchParams.id
    const [product, setProduct] = useState<Product>();
    const [currentImage, setCurrentImage] = useState<string>("");

    const handleScroll = (e: any) => {
        const element = e.target;
        const scrollTop = element.scrollTop;
        const imageHeight = element.childNodes[0].clientHeight;
        const index = Math.floor(scrollTop / imageHeight);
        if (product && product.image_urls) {
            setCurrentImage(product.image_urls[index]);
        }
    };

    const fetchProduct = async () => {
        try {
            const product = await service.getData(`products/${productId}`);
            setProduct(product);
            console.log("product", product)
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <div className="flex justify-around p-4">
            <div className="flex gap-2 m-10 ">
                <div className="max-h-[30rem] overflow-y-scroll smooth-scroll" onScroll={(e) => handleScroll(e)}>
                    {product?.image_urls.map((img, index) =>
                        <img
                            key={index}
                            className={`w-[30rem] transition-opacity duration-300 ${img !== currentImage ? "opacity-70" : ""}`}
                            src={img}
                            alt="imagem do produto"
                        />
                    )}
                </div>
                
                <div className="max-h-[30rem] overflow-y-scroll">
                    {product?.image_urls.map((img, index) =>
                        <img
                            key={index}
                            className={`w-[6rem] transition-opacity duration-300 ${img !== currentImage ? "opacity-50" : ""}`}
                            src={img}
                            alt="imagem do produto"
                        />
                    )}
                </div>
               
            </div>

            <div className="w-[30%] border border-slate-500 rounded flex flex-col gap-4 text-slate-500 m-10">
                <div className="p-4">
                    <h1 className="text-lg">{product?.name}</h1>
                    <p className="text-sm">{`R$ ${product?.price}`}</p>
                </div>
                <p className="p-4">{product?.description}</p>
                <button className="border-t border-slate-500">Adicionar</button>
            </div>
        </div>
    )
}

export default Product