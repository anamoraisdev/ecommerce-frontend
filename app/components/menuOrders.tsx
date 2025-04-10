import { Dispatch, SetStateAction } from "react";

type PropsMenuOrders = {
    filter: string,
    setFilter: (filter: string) => void;
}

const MenuOrders :React.FC<PropsMenuOrders> = ({ filter, setFilter })=> {
    
    return(
        <>
            <div className="flex flex-col">
                <h1 className="text-sky-950 text-2xl font-bold">Meus pedidos</h1>
                <p className="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur mollitia quas vitae?</p>
            </div>

            <div className="flex w-full gap-4">
                <div className={`border rounded-r-full w-[9rem] h-[2.5rem] flex items-center justify-center ${filter === "pending" ? "text-white bg-sky-950" : "bg-gray-100"}  text-gray-500 `} onClick={() => setFilter('pending')}>Em preparação</div>
                <div className={`border rounded-r-full w-[9rem] h-[2.5rem] flex items-center justify-center ${filter === "progress" ? "text-white bg-sky-950" : "bg-gray-100"}  text-gray-500 `} onClick={() => setFilter('progress')}>A caminho</div>
                <div className={`border rounded-r-full w-[9rem] h-[2.5rem] flex items-center justify-center ${filter === "done" ? "text-white bg-sky-950" : "bg-gray-100"}  text-gray-500 `} onClick={() => setFilter('done')}>Entregue</div>
            </div>
        </>
    )
}

export default MenuOrders;