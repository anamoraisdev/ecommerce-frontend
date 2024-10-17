'use client'
import Link from "next/link";
import { useState, useEffect } from 'react';
import Personal from "../components/personalPage";
import Orders from "../components/ordersPage";

const ProfileLayout = () => {
    const [selectedOption, setSelectedOption] = useState<string| null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const section = queryParams.get('section');
        if (section) {
            setSelectedOption(section);
        } else {
            setSelectedOption('personal');
        }
    }, []);

    const renderContent = () => {
        if (!selectedOption) {
            return <h2>Loading...</h2>;
        }
        switch (selectedOption) {
            case 'personal':
                return <Personal/>;
            case 'orders':
                return <Orders/>
            case 'favorites':
                return <h2>favorites Content</h2>;
            case 'cupons':
                return <h2>cupons Content</h2>;
            default:
                return <h2>not found Content</h2>;
        }
    };

    // Função para mudar a URL sem recarregar a página
    const handleMenuClick = (option: string) => {
        setSelectedOption(option);
        window.history.pushState({}, '', `/profile?section=${option}`);
    };

  
    return (
        <div className="flex bg-gray-100 min-h-[calc(100vh-128px)] h-full">
            {/* Menu lateral */}
            <div className="flex w-[20%] bg-gray-150 text-gray-500 text-lg">
                <div className=" w-full bg-gray-200 py-16 px-8 min-h-[calc(100vh-128px)] flex flex-col gap-6">
                    <h2 className=" font-bold text-sky-950 text-xl">Menu</h2>
                    <div className="relative inline-block">
                        <Link href="/profile?section=personal" onClick={() => handleMenuClick('personal')} className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                            Dados pessoais
                        </Link>
                    </div>
                    <div className="relative inline-block" >
                        <Link href="/profile?section=orders" onClick={() => handleMenuClick('orders')} className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                            Meus pedidos
                        </Link>
                    </div>
                    <div className="relative inline-block">
                        <Link href="/profile?section=favorites" onClick={() => handleMenuClick('favorites')} className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                            Favoritos
                        </Link>
                    </div>
                    <div className="relative inline-block">
                        <Link href="/profile?section=cupons" onClick={() => handleMenuClick('cupons')} className="transition-all duration-300 ease-in-out hover:border-b-4 hover:border-sky-950">
                            Cupons
                        </Link>
                    </div>
                </div>


            </div>


            {/* Conteúdo dinâmico */}

            <div className="w-[80%] m-8 p-8 bg-white flex flex-col gap-4 rounded-3xl drop-shadow-sm">
                {renderContent()}

            </div>

        </div>
    );
};
export default ProfileLayout