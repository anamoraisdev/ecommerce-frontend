'use client';

import service from "@/lib/service";
import { Product as ProductType } from "../components/cardProduct";
import { useEffect, useState } from "react";
import Carousel from "../components/carousel";
import { productsData } from "../api/products";
import { categoriesData } from "../api/categories";
import { FaRegCopy, FaRegHeart, FaRegStar, FaStar, FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

export interface Category {
    id: number,
    name: string,
    description: string
}

const Product = ({ searchParams }: any) => {
    const productId = searchParams.id
    const [product, setProduct] = useState<ProductType>();
    const [currentImage, setCurrentImage] = useState<string>("");
    const [productCategory, setProductCategory] = useState<Category>();
    const numbers = Array.from({ length: 43 - 33 + 1 }, (_, i) => i + 33);


    const handleScroll = (e: any) => {
        const element = e.target;
        const isMobile = window.innerWidth < 768;
        const scrollPosition = isMobile ? element.scrollLeft : element.scrollTop;
        const imageDimension = isMobile ? element.childNodes[0].clientWidth : element.childNodes[0].clientHeight;
        const index = Math.floor(scrollPosition / imageDimension);

        if (product && product.image_urls) {
            setCurrentImage(product.image_urls[index]);
        }
    };


    // const fetchProduct = async () => {
    //    try {
    //        const product = await service.getData(`products/${productId}`);
    //        setProduct(product);
    //        console.log("product", product)
    //    } catch (error) {
    //        console.error('Erro ao buscar produtos:', error);
    //    }
    //};

    useEffect(() => {
        //fetchProduct()
        let productItem = productsData.find((item) => item.id == parseInt(productId));
        let productCategory = categoriesData.find((item) => item.id === productItem?.category_id)
        setProduct(productItem);
        setProductCategory(productCategory)
    }, [productId]);


    return (
        <div className="flex flex-col justify-center items-start w-full md:flex-row md:justify-around md:p-6">
            {/* Lado Esquerdo */}
            <div className="w-[50%] flex flex-col gap-8">
                {/* carrosel de imagens do produto */}
                <div className="flex gap-2 flex-col md:flex-row ">
                    <div className="max-h-[35rem]  flex overflow-x-scroll md:flex-col md:overflow-y-scroll smooth-scroll" onScroll={(e) => handleScroll(e)}>
                        {product?.image_urls?.map((img, index) =>
                            <img
                                key={index}
                                className={`w-full transition-opacity duration-300 ${img !== currentImage ? "opacity-70" : ""}`}
                                src={img}
                                alt="imagem do produto"
                            />
                        )}
                    </div>

                    <div className="flex md:flex-col  md:overflow-y-scroll">
                        {product?.image_urls.map((img, index) =>
                            <img
                                key={index}
                                className={`w-[8rem] transition-opacity duration-300 ${img !== currentImage ? "opacity-40" : ""}`}
                                src={img}
                                alt="imagem do produto"
                            />
                        )}
                    </div>
                </div>
                {/* Sobre o produtos*/}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-gray-500">Sobre o produto</h3>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        consectetur adipisicing elit. Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.
                        Obcaecati, quos amet cumque a accusamus atque, placeat repellendus, tenetur sunt voluptates ullam temporibus suscipit consequatur. Consectetur magnam provident asperiores doloribus id.

                    </div>
                </div>
            </div>


            {/* Info do produto */}
            <div className="md:w-[40%] flex flex-col p-16 gap-6 border">

                {/* Informaçoes do produto */}
                <div className="flex flex-col gap-2">
                    <div>
                        <h1 className="text-4xl font-bold">{product?.name}</h1>
                        <p>{productCategory?.name}</p>
                    </div>
                    <div>
                        <span className="text-gray-500 text-base line-through">R$149,99</span>
                        <p className="text-4xl">{`R$ ${product?.price}`} <span className="text-lg">no pix</span></p>
                        <p className="text-sm">ou <span className="font-bold">R$115,99</span> em até 9x sem juros</p>
                    </div>
                </div>

                <div className="">
                    <h3 className="font-bold flex justify-between text-gray-500">Selecione um tamanho <span className="text-sm underline font-normal">Tabela de medidas</span></h3>
                    <div className="flex flex-wrap gap-1.5">
                        {numbers.map((item) =>
                            <div className="bg-gray-50 border w-[6rem] h-[3rem] flex items-center justify-center">{item}</div>

                        )}
                    </div>
                </div>

                <div>

                    <h3 className="font-bold text-gray-500">Selecione uma cor</h3>
                    <div className="flex gap-2">
                        {product?.color.map((item) =>
                            <div className="flex flex-col items-center">
                                <img className="w-[4rem] h-[4rem] border" src={item.src} key={item.name} />
                                <p className="text-sm">{item.name}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-500">Quantidade</h3>
                    <div className="flex gap-5 items-center border rounded-full w-[8rem]">
                        <div className="rounded-full bg-gray-100 py-1 px-4">-</div>
                        <p>4</p>
                        <div className="rounded-full bg-gray-200 py-1 px-4">+</div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                    <button className="rounded-full text-white bg-black py-3">Adicionar ao carrinho</button>
                    <button className="rounded-full border border-black py-3 flex items-center justify-center gap-2">Adicionar aos favoritos <FaRegHeart size={20} /></button>
                </div>

                <p className="flex gap-4 justify-center">Compartilhar:<span className="flex gap-1 items-center"><FaWhatsapp/>Whatsapp</span> <span className="flex gap-1 items-center"><FaRegCopy />copiar link</span></p>


                {/* Frete */}
                <div className="flex flex-col gap-4 justify-start ">
                    <p className="font-bold text-gray-500">Calcule o frete</p>
                    <div className="flex justify-between border rounded-full px-2 hover:border-black flex py-1">
                        <input className="border-none outline-none p-2 rounded-full" type="text" placeholder="00000-000"></input>
                        <p className="border rounded-full px-4 py-1 flex items-center hover:bg-black hover:text-white">calcular</p>
                    </div>

                    <p className="text-sm underline">Não sei meu cep</p>
                </div>

                {/* Avaliacoes */}

                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-gray-500 flex justify-between">Avaliaçoes <span className="text-sm underline font-normal">ver todas </span></h3>
                    <div className="border p-4 rounded-lg">
                        <div className="flex flex-col">
                            <p className="text-sm">Monica Simara</p>
                            <div className="flex">
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaRegStar color="gray" />
                                <FaRegStar color="gray" />
                            </div>
                            <h4 className="">Perfeito! Lindo e confortavel.</h4>
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg">
                        <div className="flex flex-col">
                            <p className="text-sm">Michely priscila</p>
                            <div className="flex">
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                            </div>
                            <h4 className="">Muito confortal! SEM PALAVRAS</h4>
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg">
                        <div className="flex flex-col">
                            <p className="text-sm">Patricia Ferreira</p>
                            <div className="flex">
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaStar color="gray" />
                                <FaRegStar color="gray" />
                            </div>
                            <h4 className="">Gostei muito! parece gigante mas, pessoalmente caiu como uma luva.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product