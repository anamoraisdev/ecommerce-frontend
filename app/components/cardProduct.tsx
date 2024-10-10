import Link from "next/link";
import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
interface Color {
    name: string,
    src: string
}
export interface Product {
    name: string,
    id: number,
    description: string,
    image_urls: string[],
    category_id: number,
    price: number,
    collection_of_product_id: number,
    size: number,
    color: Color[],
}

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <>
            <div className=" relative border rounded-lg flex flex-col items-center w-[15rem] h-[21rem]">
                <Link href={`product?id=${product.id}`}>
                    <img src={product.image_urls[0]} className="w-[15rem] h-[15rem] rounded-t-lg hover:scale-95" />
                </Link>

                <button onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-2 right-2 rounded-full bg-white p-4 cursor-pointer">
                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>

                <div className="flex flex-col items-start px-4 py-2">
                    <h1>{product.name}</h1>
                    <div className="flex">
                        <FaStar color="gray" size={10} />
                        <FaStar color="gray" size={10} />
                        <FaStar color="gray" size={10} />
                        <FaStar color="gray" size={10} />
                        <FaStar color="gray" size={10} />
                    </div>
                    <p className="text-xs font-bold">{`R$${product?.price}`}<span className="text-xs font-normal"> no pix</span> <span className="text-gray-500 text-xs line-through">R$149,99</span></p>
                    <p className="text-xs">ou <span className="font-bold">R$115,99</span> em até 9x sem juros</p>

                </div>

            </div>
        </>
    )
}

export default CardProduct;