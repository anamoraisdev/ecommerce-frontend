'use client';
import service from "@/lib/service"
import Link from "next/link";

import { useEffect, useState } from "react";

const Navbar = () => {
    const [categories, setCategories] = useState<any[]>([]);

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
            <section className="flex gap-4 px-10">
                {categories.map((item) =>
                        <Link href={`/products?category=${item.id}`} key={item.id}
                         className="text-white hover:text-slate-200">{item.name}
                    </Link>

                )}
                <a href='' className="text-white hover:text-slate-200">
                    Fale conosco
                </a>
            </section>
        </main>
    )
}

export default Navbar;