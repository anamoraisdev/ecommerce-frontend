import Link from "next/link";
import React from "react";

export interface Product {
    name: string,
    id: number,
    description: string,
    image_urls: string[],
    category_id: number,
    price: number,
    collection_of_product_id: number,
    size: number,
    color: string,
    delivery_time: string
}

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
    
    return(
        <>
        <Link href={`product?id=${product.id}`}>
            <div className="border rounded-lg flex flex-col justify-between items-center w-[12rem] h-[14rem]">
                <img src={product.image_urls[0]} className="w-[12rem] h-[12rem] rounded-t-lg"/>
                
                <h1>{product.name}</h1>
            
            </div>
        </Link>
        </>
    )
}

export default CardProduct;