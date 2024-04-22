
'use client';
import CardProduct, { Product } from "@/app/components/cardProduct";
import service from "@/lib/service";
import { useEffect, useState } from "react";
import Filter from "../components/filter";

const Products = ({searchParams}: any) => {
    const category = searchParams.category
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsFilter, setProductsFilter] = useState<Product[]>([]);
  
    const fetchProducts = async () => {
        try {
            const products = await service.getData("products");
            setProducts(products.products);
            console.log("products", products.products)
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };
    const filterProducts = () => {
        if (selectedCategories.length === 0) {
            setProductsFilter(products); 
        } 
        else {
            const response = products.filter((product) => selectedCategories.includes(product.category_id));
            setProductsFilter(response);
        }
    }
    const toggleCategory = (categoryId: number, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        }
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    useEffect(() => {
        filterProducts();
    }, [selectedCategories, products]);

    useEffect(() => {
        if(category){
            const categoryId = parseInt(category as string);
            if (!isNaN(categoryId)) {
                setSelectedCategories([categoryId])
            }
        }
    },[category])

    return (
        <div className="flex">
            <Filter toggleCategory={toggleCategory} selectedCategories={selectedCategories}/>
            
            <div className="flex justify-center p-4 gap-4">
                { productsFilter.length > 0 ? productsFilter.map((product) => <CardProduct key={product.id} product={product}/>) 
                : <h1>Nenhum produto encontrado</h1>
                }
            </div>

        </div>
    )
}

export default Products;