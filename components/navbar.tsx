'use client';
import service from "@/lib/service"
import { useEffect, useState } from "react";

const Navbar = () => {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await service.getCategoriesProducts();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <main className="bg-primary w-full h-32 fixed-top flex items-center justify-between" >
            <h1 className="text-white mx-10">LOGOSTORE</h1>
            <section className="flex gap-4 px-10">
                {categories.map((item) =>
                    <a href='' className="text-white hover:text-slate-200" key={item.id}>
                       {item.name}
                    </a>
                )}
                <a href='' className="text-white hover:text-slate-200">
                    Fale conosco
                </a>
            </section>
        </main>
    )
}

export default Navbar;