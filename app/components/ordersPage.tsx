'use client'
import { useEffect, useState } from "react"
import { ordersData } from "../api/pedidos"
import { productsData } from "../api/products"
import { Product } from "./cardProduct";

type Order = {
    id: number;
    code: string;
    status: string;
    price: number;
    products: (Product & { amount: number })[];
};

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [filter, setFilter] = useState("")

    const getOrdersProducts = () => {
        const updatedOrders = ordersData.map(order => {
            const productsOrder = order.products.map((product) => {
                const productDetails = productsData.find(item => item.id === product.id);
                return {
                    ...productDetails,
                    amount: product.amount
                };
            });
            return {
                ...order,
                products: productsOrder
            };
        });

        // Atualiza o estado com os pedidos formatados
        console.log(updatedOrders)
        setOrders(updatedOrders);
    };

    const filteredOrders = orders.filter((order) =>
        filter ? order.status === filter : true
    );

    useEffect(() => {
        getOrdersProducts()
    }, [])


    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-sky-950 text-2xl font-bold">Meus pedidos</h1>
                <p className="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur mollitia quas vitae?</p>
            </div>

            <div className="flex w-full gap-4">
                <div className={`border rounded-r-full w-[9rem] h-[2.5rem] flex items-center justify-center ${filter === "pending" ? "text-white bg-sky-950": "bg-gray-100"}  text-gray-500 `}  onClick={() => setFilter('pending')}>Em preparação</div>
                <div className={`border rounded-r-full w-[9rem] h-[2.5rem] flex items-center justify-center ${filter === "progress" ? "text-white bg-sky-950": "bg-gray-100"}  text-gray-500 `} onClick={() => setFilter('progress')}>A caminho</div>
                <div className={`border rounded-r-full w-[9rem] h-[2.5rem] flex items-center justify-center ${filter === "done" ? "text-white bg-sky-950": "bg-gray-100"}  text-gray-500 `}  onClick={() => setFilter('done')}>Entregue</div>
            </div>

            <div>

                <div className="flex flex-col gap-2">
                    {filteredOrders.map((order) =>

                        <div className="flex gap-2 items-center w-full border">
                            <div
                                className={`grid ${order.products.length === 1
                                    ? "grid-cols-1" // 1 produto, ocupa toda a largura
                                    : order.products.length === 2 || order.products.length === 3
                                        ? "grid-cols-2" // 2 ou 3 produtos, divide em 2 colunas
                                        : "grid-cols-2" // 4 produtos, divide em 2 colunas
                                    } w-[12rem] h-[10rem]`}
                            >
                                {order.products.slice(0, order.products.length === 3 ? 2 : order.products.length).map((product) => (
                                    <img
                                        key={product.id}
                                        src={product.image_urls[0]}
                                        alt={product.name}
                                        className="w-full object-cover h-full"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between w-full text-gray-500 ">
                                <div className="flex flex-col ">
                                    <h3 className="font-bold text-lg">{order.code} </h3>
                                    <h3 className="text-sm">Detalhe da compra</h3>
                                    {order.products.map((product) =>
                                        <div className="flex flex-col text-gray-500 text-xs gap-0.5">
                                            <p><span>{product.amount}</span> {product.name}</p>
                                        </div>

                                    )}

                                    <p className=" mt-1 text-sm"> Total: R${order.price},00</p>
                                    <p className="undeline">ver mais</p>
                                </div>
                                <div className="flex flex-col gap-2 items-end justify-center pr-6">
                                    <button className="border rounded-full w-[9rem] py-2">{filter === "done" ? "Confimar entrega" : filter === "pending" ? "Cancelar compra" : "Rastreiar pedido"}</button>
                                    <button className="bg-sky-950 text-white rounded-full w-[9rem] py-2">Pedir reembolso</button>
                                </div>


                            </div>
                        </div>





                    )}
                </div>
            </div>
        </>

    )
}

export default Orders