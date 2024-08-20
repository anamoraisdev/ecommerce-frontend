'use client'
import service from "@/lib/service";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface User {
   
        email: string

}
interface userContextType {
    user: User | null,
    login: (email: string, password: string) => Promise<object | void>;
    logout: () => void;
    error: string | null;
};

interface propsProvider {
    children: ReactNode
}


const userContextDefaultValues: userContextType = {
    user: null,
    login: async () => { },
    logout: () => { },
    error: null,
};

export const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUser() {
    return useContext(UserContext);
}
export function UserProvider({ children }: propsProvider) {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    
    const login = async (email: string, password: string) => {
        setError(null)
        try {
            const user = {
                user: {
                    email,
                    password
                }
            };
            const response = await service.postData("users/sign_in", user);
            if (response.status === 200) {
                setUser(response.data.user)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                return response.data.user;
            }

        } catch (error: any) {
            setError(error?.response?.data)
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = 'http://localhost:3000/login';
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
           
            const fetchUserFromToken = async () => {
                try {
                    const response = await service.getData('me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('user', response)
                    if (response) {
                        setUser(response);
                        localStorage.setItem("user", JSON.stringify(response));
                        window.location.href = 'http://localhost:3000/';
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserFromToken(); 
        }
    }, []);


    const value = {
        user: user,
        login: login,
        logout: logout,
        error: error
    }

    return (

        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>

    );
}