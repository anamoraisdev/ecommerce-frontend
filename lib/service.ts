import axios from "axios"

const service = {
    getData: async (url: string, params?: object) => {
        try {
            const response = await axios.get(`http://localhost:4000/${url}`, params);
            const data = response.data; 
            return data;
        } catch (error) {
            console.error("Erro ao obter dados", error);
            throw error; 
        }
    },
    
    postData: async (url: string, data: object) => {
        try {
            const response = await axios.post(`http://localhost:4000/${url}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error("Erro ao enviar dados", error);
            throw error;
        }
    }

}

export default service