import service from "@/lib/service";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from 'react';
import { categoriesData } from "../api/categories";
import { collectionsData } from "../api/collections";

interface FilterProps {
    toggleCategory: (categoryId: number, checked: boolean) => void;
    toggleColletion: (colletionId: number, checked: boolean) => void;
    selectedCategories: number[];
    selectedColletions: number[];
    selectedPrice: number;
    handleRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSearch: Dispatch<SetStateAction<string>>
    search: string;
}

const Filter: React.FC<FilterProps> = ({ toggleCategory, toggleColletion, selectedCategories, selectedColletions, selectedPrice, handleRangeChange, setSearch, search}) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [colletions, setColletions] = useState<any[]>([]);
    
    const fetchCategories = async () => {
        setCategories(categoriesData)
        //try {
        //    const categoriesData = await service.getData("categories");
        //    setCategories(categoriesData);
        //} catch (error) {
        //    console.error('Erro ao buscar categorias:', error);
        //}
    };

    const fetchColletions = async () => {
        setColletions(collectionsData)
        //try {
        //    const colletionsData = await service.getData("collections_of_products");
        //    setColletions(colletionsData.collections_of_products);
        //} catch (error) {
        //    console.error('Erro ao buscar colletions:', error);
        //}
    };

    useEffect(() => {
        fetchCategories();
        fetchColletions()
    }, []);

    return (
        <div className="bg-gray-100 w-[20rem] h-screen p-10 flex flex-col gap-2">
            <h1 className="font-bold text-slate-600 text-lg">Busque seu produto:</h1>
            <input type="text" 
                className="border border-slate-400 rounded w-full px-2"
                placeholder="search products by name" 
                onChange={(e) => setSearch(e.target.value)} 
                value={search}>
            </input>
            <div className="flex flex-col gap-2">
                
                <h2 className="text-slate-500 my-2 font-bold text-sm">categories</h2>
                {categories && categories.map((category) => (
                    <label key={category.id} className="text-sm text-slate-500s">
                        <input
                            className="w-4 h-4 accent-slate-500 mr-2"
                            type="checkbox"
                            name={category.name}
                            checked={selectedCategories.includes(category.id)}
                            onChange={(e) => toggleCategory(category.id, e.target.checked)}
                        />
                        {category.name}
                    </label>
                ))}

                <h2 className="text-slate-500 my-2 font-bold text-sm">colletions</h2> 
                {colletions && colletions.map((colletion) => 
                  <label key={colletion.id} className="text-sm text-slate-500s">
                  <input
                      className="w-4 h-4 accent-slate-500 mr-2"
                      type="checkbox"
                      name={colletion.name}
                      checked={selectedColletions.includes(colletion.id)}
                      onChange={(e) => toggleColletion(colletion.id, e.target.checked)}
                  />
                  {colletion.name}
              </label>
                )}      

                <h2 className="text-slate-500 my-2 font-bold text-sm">maximun price</h2>
                <div className="flex flex-col gap-2 w-full">
                    <p className="border border-slate-400 py-1 px-2 rounded text-slate-400 ">
                      R$  {selectedPrice}
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-400">0</p>
                        <input
                            type="range"
                            min="0"
                            max="1500"
                            className="w-full h-4 appearance-none bg-gray-200 rounded-md overflow-hidden"
                            value={selectedPrice}
                            onChange={(e) => handleRangeChange(e)}
                        />
                        <p className="text-sm text-slate-400">1500</p>
                        
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Filter;