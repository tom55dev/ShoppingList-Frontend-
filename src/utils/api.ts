import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getAllShoppingList = async () => {
    const response = await authApi.post('shoppinglist')
    return response.data
}
