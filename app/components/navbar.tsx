'use client';
import service from "@/lib/service"
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { categoriesData } from "../api/categories";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsBag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const [categories, setCategories] = useState<any[]>(categoriesData);
    const { user, logout } = useUser();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <main className="bg-sky-950 w-full h-32 fixed-top flex items-center justify-between px-6 relative" >
                <h1 className="text-white">LOGOSTORE</h1>
                {/*categories*/}
                <section className="flex gap-4 items-center ">
                    {categories.map((item) =>
                        <Link href={`/products?category=${item.id}`} key={item.id} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}
                            className="text-white hover:text-slate-200 ">{item.name}
                        </Link>

                    )}
                </section>

                { /* users */}
                {user &&
                    <div className="flex items-center gap-6 " >
                        <FiShoppingCart size={26} color="white" />
                        <Link href="/profile?section=personal">
                        <FaRegUser size={24} color="white" />
                        </Link>
                    </div>
                }


            </main>


            {/* menu */}
            <div className={`w-full bg-gray-50 flex flex-col ${!isOpen ? "hidden" : ""} `}>
               
            </div>
        </>

    )
}

export default Navbar;