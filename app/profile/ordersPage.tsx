'use client'
import { useEffect, useState } from "react"
import { ordersData } from "../api/pedidos"
import { productsData } from "../api/products"
import { Product } from "../components/cardProduct";
import MenuOrders from "../components/menuOrders";
import CardOrders from "../components/cardOrders";
import { OrdersDetails } from "./orderDetails";

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
        <div className="">
            {/* Lista de Pedidos */}
            <div className={`flex flex-col gap-4 ${showDetails && "hidden"}`}>
                <MenuOrders filter={filter} setFilter={setFilter} />
                <div className="flex flex-col gap-2">
                    {filteredOrders.map((order) => (
                        <CardOrders key={order.id} order={order} handleCardClick={handleCardClick} filter={filter} />
                    ))}
                </div>
            </div>

            {/* Detalhes do Pedido */}
            {
                showDetails &&
                <OrdersDetails selectedOrder={selectedOrder} setShowDetails={setShowDetails} showDetails={showDetails} />
            }

        </div>
    )
}


export default Orders;