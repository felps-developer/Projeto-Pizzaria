import axios, { AxiosError } from "axios";
import { error } from "console";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";

const setupAPIClient = (ctx = undefined) => {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: 'https://projeto-pizzaria-ten.vercel.app',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })
    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            // qualquer erro 401(nao autorizado) devomos deslogar o usuario
            if (typeof window !== undefined) {
                // chamar a funcao para deslogar o usuario
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)

    })
    return api
}

export default setupAPIClient;