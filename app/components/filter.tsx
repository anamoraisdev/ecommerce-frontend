import service from "@/lib/service";
import { useEffect, useState } from "react";

interface FilterProps {
    toggleCategory: (categoryId: number, checked: boolean) => void;
    selectedCategories: number[];
    selectedPrice: number;
    handleRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ toggleCategory, selectedCategories, selectedPrice, handleRangeChange}) => {
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
        <div className="bg-gray-100 w-[20rem] h-screen p-10 flex flex-col gap-2">
            <h1 className="font-bold text-slate-600 text-lg">Busque seu produto:</h1>
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