
'use client'
import { createContext, ReactNode, useContext, useState } from "react";

interface userContextType {
    user: User | null 
};

interface propsProvider {
    children: ReactNode
}

export interface User {
    email: string
    password: string
    token: string
}

const userContextDefaultValues: userContextType = {
    user: null,
};

export const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUser() {
    return useContext(UserContext);
}
export function UserProvider({ children }: propsProvider) {
    const [user, setUser] = useState<User| null>(null)
    const value = {
        user: user,
    }
    return (

        <>
        <UserContext.Provider value={value}>
        { children }
        </UserContext.Provider>
        </>
    
    );
}