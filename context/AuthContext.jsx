import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";

const TOKEN_KEY = "my-token";
export const API_URL = "http://192.168.1.3:3000";

const AuthContext = createContext()

export default function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => { 

    const [authState, setAuthState] = useState({ token: null, authenticated: false, isAdmin: false })

    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                setAuthState({
                    token,
                    authenticated: true,
                })
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        })()
    }, [])
    
    async function register(name, email, password, token) {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, { name, email, password, token })
            setAuthState({
                token: res.data.token,
                authenticated: true,
                isAdmin: res.data.isAdmin
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, res.data.token);
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async function login(email, password, token) {
        try {
            const res =  await axios.post(`${API_URL}/auth/login`, { email, password, token })
            setAuthState({
                token: res.data.token,
                authenticated: true,
                isAdmin: res.data.isAdmin
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, res.data.token);
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async function logout() {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = "";
        setAuthState({
            token: null,
            authenticated: false,
            isAdmin: false
        })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>   
}