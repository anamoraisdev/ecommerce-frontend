import axios from "axios"

const service = {
    getData: async (url: string) => {
        try {
            const response = await axios.get(`http://localhost:4000/${url}`);
            const data = response.data; 
            return data;
        } catch (error) {
            console.error("Erro ao obter categorias de produtos:", error);
            throw error; 
        }
    },
}

export default service