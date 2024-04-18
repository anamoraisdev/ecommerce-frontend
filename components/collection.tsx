import React from "react";
import CardProduct, { Product } from "./cardProduct";

const Collection: React.FC<{ products: Product[], name: string }> = ({ products, name }) => {
    return (
        <div>
            <section className="flex flex-col justify-center items-center gap-4 p-10  ">
            <h1 className="text-lg font-bold">{name}</h1>
                <div className="flex w-ful gap-10 p-4">
                    {products.length > 0 && products.map((product) =>  <CardProduct key={product.id} product={product} />)}
                </div>
            <p className="underline text-gray-400 text-sm">visualizar todos os produtos </p>
            </section>
      </div>
    )
}

export default Collection ;