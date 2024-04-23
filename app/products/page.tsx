
'use client';
import CardProduct, { Product } from "@/app/components/cardProduct";
import service from "@/lib/service";
import {useEffect, useState } from "react";
import Filter from "../components/filter";

const Products = ({ searchParams }: any) => {
    const category = searchParams.category
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsFilter, setProductsFilter] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("")

    const fetchProducts = async () => {
        try {
            const products = await service.getData("products");
            setProducts(products.products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const filterProducts = () => {
        if (selectedCategories.length === 0 && selectedPrice === 0 && search === "") {
            setProductsFilter(products);
        }
        else {
            let response = products;

            if (selectedCategories.length > 0) {
                response = response.filter((product) =>
                    selectedCategories.includes(product.category_id));
            }

            if (selectedPrice > 0) {
                response = response.filter((product) => parseFloat(product.price) <= selectedPrice)
            }

            if (search != "") {
                response = response.filter((product) => product.name.includes(search))
            }
            setProductsFilter(response)
        }
    };

    const toggleCategory = (categoryId: number, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        }
    };

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSelectedPrice(value);
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    useEffect(() => {
        filterProducts();
    }, [selectedCategories, products, selectedPrice, search]);

    useEffect(() => {
        if (category) {
            const categoryId = parseInt(category as string);
            if (!isNaN(categoryId)) {
                setSelectedCategories([categoryId])
            }
        }
    }, [category])

    return (

        <div className="flex">
            <Filter 
                toggleCategory={toggleCategory} 
                selectedCategories={selectedCategories} 
                selectedPrice={selectedPrice} 
                handleRangeChange={handleRangeChange} 
                setSearch={setSearch} 
                search={search}
            />
            <div className="flex flex-wrap justify-center p-4 gap-4">
                {productsFilter.length > 0 ? productsFilter.map((product) => <CardProduct key={product.id} product={product} />)
                    : <h1>Nenhum produto encontrado</h1>
                }
            </div>
        </div>
    )
}

export default Products;