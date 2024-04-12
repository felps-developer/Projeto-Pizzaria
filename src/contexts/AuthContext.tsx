
import { api } from "@/services/apiClient";
import axios from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SingInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SingUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SingInProps = {
    email: string;
    password: string;
}

type SingUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)





export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}


const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
                .catch(() => {
                    signOut();
                })
        }
    }, [])
    async function signIn({ email, password }: SingInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const { id, name, token } = response.data
            //console.log(response.data)
            setCookie(undefined, '@nextauth.token', response.data.token, {
                maxAge: 60 * 60 * 24 * 30, // expira em 1 mes
                path: "/" // caminhos que terao acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            //passar para proximas requisicoes o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')
            // redirecionar o user para /dashboard
            Router.push('/dashboard')

        } catch (err) {
            toast.error('Erro ao acessar!')
            console.log("ERRO AO ACESSAR", err)
        }
    }

    async function signUp({ name, email, password }: SingUpProps) {
        try {

            const response = await api.post('/users', {
                name,
                email,
                password,
            })

            toast.success('Cadastrado com sucesso!')
            Router.push('/')
        } catch (err) {
            toast.success('Erro ao cadastrar!')
            console.log("erro ao cadastrar", err)
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;


