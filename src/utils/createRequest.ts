import api from "../services/api";

export async function createRequest(url: string, method: string, data?: any) {
    try {
        const response = await api({
            url,
            method,
            data
        })

        return response.data
    } catch (error) {
        alert("Ocorreu um erro, tente novamente mais tarde")
        console.error(error)
    }

}