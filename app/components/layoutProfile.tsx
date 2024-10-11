const LayoutProfile = ({ children }) => {
    return (
        <div className="flex min-h-[calc(100vh-128px)] w-full bg-gray-100 h-full text-gray-500 text-lg">
            <div className=" w-[20%] bg-gray-200 py-16 px-8 min-h-[calc(100vh-128px)] flex flex-col gap-6">
                <h2 className=" font-bold text-sky-950 text-xl">Menu</h2>
                <div className="relative inline-block">
                    <a href="/profile/personal" className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                        Dados pessoais
                    </a>
                </div>
                <div className="relative inline-block">
                    <a href="/profile/orders" className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                        Meus pedidos
                    </a>
                </div>
                <div className="relative inline-block">
                    <a href="/profile/favorites" className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                        Favoritos
                    </a>
                </div>
                <div className="relative inline-block">
                    <a href="/profile/cupons" className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                        Cupons
                    </a>
                </div>
            </div>

            <div className="w-full m-8 p-8 bg-white flex flex-col gap-4 rounded-3xl drop-shadow-sm">
                {children}
            </div>

        </div>
    )
}

export default LayoutProfile