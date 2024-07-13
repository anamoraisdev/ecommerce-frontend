import React from "react";
import CardProduct, { Product } from "./cardProduct";
import Link from "next/link";

const Collection: React.FC<{ products: Product[], name: string , id:number}> = ({ products, name, id }) => {
    console.log("key colletiomn", id)
    return (
        <div>
            <section className="flex flex-col justify-center items-center gap-4 p-10  ">
            <h1 className="text-lg font-bold">{name}</h1>
                <div className="flex w-ful gap-10 p-4">
                    {products.length > 0 && products.map((product) =>  <CardProduct key={product.id} product={product} />)}
                </div>
                <Link href={`/products?colletion=${id}`}>
                         <p className="underline text-gray-400 text-sm">visualizar todos os produtos </p>
                </Link>
            </section>
      </div>
    )
}

export default Collection ;