import { Dispatch, SetStateAction } from "react"
import { Order } from "./ordersPage"
import Image from "next/image"

interface OrderProps {
  setShowDetails: Dispatch<SetStateAction<boolean>>
  showDetails: boolean
  selectedOrder: Order | null
}

export const OrdersDetails: React.FC<OrderProps> = ({ setShowDetails, selectedOrder }) => {
  return (
    <div className="p-4 flex flex-col gap-6 min-h-screen">
      <button onClick={() => setShowDetails(false)} className="text-blue-600 underline self-start">← Voltar</button>
      <h2 className="text-2xl font-semibold text-sky-950">Detalhes do Pedido</h2>

      {/* Dados do Pedido e Envio */}
      <div className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
        {/* Dados do Pedido */}
        <div className="md:w-1/3 border-r pr-4">
          <h3 className="font-bold text-gray-500 text-lg mb-2">Dados do Pedido</h3>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-medium">Número:</span> {selectedOrder?.code}</p>
            <p><span className="font-medium">Data:</span> {selectedOrder?.date}</p>
            <p><span className="font-medium">Status:</span> {selectedOrder?.status}</p>
          </div>
        </div>

        {/* Dados do Envio */}
        <div className="md:flex-1">
          <h3 className="font-bold text-gray-500 text-lg mb-2">Dados do Envio</h3>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-medium">Destinatário:</span> {selectedOrder?.recipientName}</p>
            <p><span className="font-medium">Endereço:</span> {selectedOrder?.shippingAddress}</p>
            <p><span className="font-medium">Transportadora:</span> {selectedOrder?.shippingMethod}</p>
            <p>
              <span className="font-medium">Rastreamento:</span>
              <a href={selectedOrder?.trackingUrl} className="">{selectedOrder?.trackingNumber}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className="flex flex-col border rounded-lg p-4">
        <h3 className="font-bold text-gray-500 text-lg mb-4">Produtos</h3>

        {/* Cabeçalho */}
        <div className="flex w-[100%] font-semibold text-gray-600 mb-2 text-center">
          <div className="w-[60%] text-start">Item</div>
          <div className="w-[40%] flex">
            <div className="w-[33%] ">Preço</div>
            <div className="w-[33%] ">Quantidade</div>
            <div className="w-[33%]">Total</div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="flex flex-col gap-6">
          {selectedOrder?.products.map((product) => (
            <div key={product.id} className="flex border-b pb-4 flex-col md:flex-row w-full items-start md:items-center gap-4">
              <div className="flex gap-4 w-[60%]">
                <Image src={product.image_urls[0]} alt={product.name} width={100} height={100} className="object-cover rounded" />
                <span className="font-bold text-gray-700">{product.name}</span>
              </div>
              <div className="flex w-[40%] text-center text-gray-800">
                <span className="w-[33%] ">R$ {product.price.toFixed(2)}</span>
                <span className="w-[33%]">{product.amount}</span>
                <span className="w-[33%] ">R$ {(product.amount * product.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between mr-4 mt-4 font-semibold text-lg text-gray-500">
          <span>Total da compra:</span>
          <span>R$ {selectedOrder?.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}