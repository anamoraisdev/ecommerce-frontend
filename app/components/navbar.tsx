'use client';
import service from "@/lib/service"
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

const Navbar = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const { user, logout } = useUser();

    const fetchCategories = async () => {
        try {
            const categoriesData = await service.getData("categories");
            setCategories(categoriesData);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <main className="bg-primary w-full h-32 fixed-top flex items-center justify-between" >
            <h1 className="text-white mx-10">LOGOSTORE</h1>
            <section className="flex gap-4 px-10 items-center">
                {categories.map((item) =>
                    <Link href={`/products?category=${item.id}`} key={item.id}
                        className="text-white hover:text-slate-200">{item.name}
                    </Link>

                )}
                {user &&
                    <div className="flex items-center gap-2 ">
                        <BiUserCircle size={22} color="white" />
                        <p className="text-white">{user?.name}</p>
                        <button onClick={() => logout()}> <BiLogOut size={22} color="white"  /></button>
                    </div>}
            </section>
        </main>
    )
}

export default Navbar;