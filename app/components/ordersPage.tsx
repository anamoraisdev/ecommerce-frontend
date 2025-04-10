'use client'
import { useEffect, useState } from "react"
import { ordersData } from "../api/pedidos"
import { productsData } from "../api/products"
import { Product } from "./cardProduct";
import MenuOrders from "./menuOrders";
import CardOrders from "./cardOrders";

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
                        <div className="flex items-start border rounded-lg">
                            <div className="w-[30%] border-r h-full m-4">
                                <h2 className="font-semibold text-gray-500">Dados do Pedido</h2>
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
                            <div className="m-4">
                                <h3 className=" font-semibold text-gray-500">Dados do Envio</h3>
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


                    </div>
                </div>
            )}
        </div>
    )
}


export default Orders;