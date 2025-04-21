'use client'
import { useEffect, useState } from "react"
import { ordersData } from "../api/pedidos"
import { productsData } from "../api/products"
import { Product } from "../components/cardProduct";
import MenuOrders from "../components/menuOrders";
import CardOrders from "../components/cardOrders";
import Image from "next/image";

export type Order = {
    id: number;
    code: string;
    status: string;
    price: number;
    date: string;
    products: (Product & { amount: number })[];
    recipientName: string;
    shippingAddress: string;
    shippingMethod: string;
    trackingUrl: string;
    trackingNumber: string
};

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [filter, setFilter] = useState("")
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showDetails, setShowDetails] = useState(false);


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
        setOrders(updatedOrders);
    };

    const filteredOrders = orders.filter((order) =>
        filter ? order.status === filter : true
    );

    const handleCardClick = (order: Order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    useEffect(() => {
        getOrdersProducts()
    }, [])


    return (
        <div className="relative overflow-hidden min-h-screen h-full">
            <div className={` flex flex-col gap-4 transition-transform duration-500 ease-in-out transform ${showDetails ? "-translate-x-full" : "translate-x-0"}`}>

                <MenuOrders filter={filter} setFilter={setFilter} />
                <div className="flex flex-col gap-2">
                    {filteredOrders.map((order) =>
                        <CardOrders order={order} handleCardClick={handleCardClick} filter={filter} />
                    )}
                </div>


            </div>
            {selectedOrder && (
                <div className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${showDetails ? "translate-x-0" : "translate-x-full"}`}>
                    <button onClick={() => setShowDetails(false)} className="">Voltar</button>
                    <div className="w-full h-full flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold text-sky-950">Detalhes do Pedido</h2>
                        { /* Informacoes basicas do pedido*/}
                        <div className="flex items-start border rounded-lg p-4 gap-2">
                            <div className="w-[30%] border-r h-full">
                                <h2 className="font-bold text-gray-500 text-lg">Dados do Pedido</h2>
                                <div className="text-gray-700 gap-1">
                                    <p className="">
                                        <span className="">Número do Pedido:</span> {selectedOrder.code}
                                    </p>
                                    <p className="">
                                        <span className="">Data do Pedido:</span> {selectedOrder.date}
                                    </p>
                                    <p className="">
                                        <span className="">Status do Pedido:</span> {selectedOrder.status}
                                    </p>
                                </div>

                            </div>
                            <div className="">
                                <h3 className=" font-bold text-gray-500 text-lg">Dados do Envio</h3>
                                <div className="text-gray-700 gap-1">
                                    <p className="">
                                        <span className="font-medium">Nome do Destinatário:</span> {selectedOrder.recipientName}
                                    </p>
                                    <p className="">
                                        <span className="font-medium">Endereço de Entrega:</span> {selectedOrder.shippingAddress}
                                    </p>
                                    <p className="">
                                        <span className="font-medium">Transportadora:</span> {selectedOrder.shippingMethod}
                                    </p>
                                    <p className="">
                                        <span className="font-medium">Rastreamento:</span>
                                        <a href={selectedOrder.trackingUrl} className="text-sky-950 underline">
                                            {selectedOrder.trackingNumber}
                                        </a>
                                    </p>
                                </div>
                            </div>


                        </div>


                        {/* detalhe do pedido */}

                        <div className="flex flex-col items-start border rounded-lg h-full">
                            <h2 className="font-bold text-gray-500 text-lg m-4">Produtos</h2>

                            {/*cabecalho */}
                            <div className="flex w-[100%] m-4 ">
                                <h3 className="w-[60%]">item</h3>
                                <h3 className="w-[10%]">preço</h3>
                                <h3 className="w-[20%]">quantidade</h3>
                                <h3 className="w-[10%]">total</h3>
                            </div>

                            {/* produtos */}
                            <div className="flex flex-col gap-10 m-4 w-[100%] ">
                                {selectedOrder.products.map((product) =>

                                    <div className="flex w-[100%]">
                                        {/* item */}
                                        <div className="flex gap-5 w-[60%]">
                                            <Image src={product.image_urls[0]} alt={product.name} width={100} height={100}></Image>
                                            <h4 className="font-bold text-gray-500 text-md">{product.name}</h4>
                                        </div>

                                        {/* preco */}
                                        <h3 className="w-[10%]">{product.price}</h3>

                                        {/* quantidade */}
                                        <h3 className="w-[20%]">{product.amount}</h3>
                                        {/* total */}
                                        <h3 className="w-[10%]">{product.amount*product.price}</h3>
                                    </div>
                                )}

                            </div>

                            <div className="flex w-[100%] m-4"><h3 className="w-[85%]">total da compra</h3> <h3 className="w-[15%] text-center">{selectedOrder.price}</h3></div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}


export default Orders;