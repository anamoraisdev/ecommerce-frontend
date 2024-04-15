import axios from "axios"

const service = {
    getCategoriesProducts: async () => {
        try {
            const response = await axios.get("http://localhost:4000/categories");
            const data = response.data; 
            return data;
        } catch (error) {
            console.error("Erro ao obter categorias de produtos:", error);
            throw error; 
        }
    },
    
}

export default service