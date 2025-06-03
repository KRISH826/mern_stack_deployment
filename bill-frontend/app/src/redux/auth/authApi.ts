import http from "@/services/http"


export const loginApi = async (email: string, password: string) => {
    const response = await http.post('/user/login', {email, password});
    return response.data;
}

export const registerApi = async (name: string,email: string, password: string) => {
    const response = await http.post('/auth/register', {name, email, password});
    return response.data;
}