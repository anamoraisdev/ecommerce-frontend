import { Order } from "../profile/ordersPage";
type CardOrdersProps = {
    order: Order;
    handleCardClick: (order: Order) => void;
    filter: string;
  };
const CardOrders: React.FC<CardOrdersProps> = ({ order, handleCardClick, filter }) => {
    return (

        <div className="flex gap-2 items-center w-full border" onClick={() => handleCardClick(order)}>
            {/*images*/}
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

    )
}

export default CardOrders;