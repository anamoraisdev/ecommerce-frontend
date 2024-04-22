import React from "react";

export interface Product {
    name: string,
    id: number,
    description: string,
    image_urls: string[],
    category_id: number,
    price: string,
}

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
    
    return(
        <div className="border rounded-lg flex flex-col justify-between items-center w-[12rem] h-[14rem]">
            <img src={product.image_urls[0]} className="w-[12rem] h-[12rem] rounded-t-lg"/>
            
            <h1>{product.name}</h1>
          
        </div>
    )
}

export default CardProduct;