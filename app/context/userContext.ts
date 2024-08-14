// context/UserContext.tsx
import { createContext, useState, useContext} from 'react';

interface UserContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
}

// Cria o contexto com um valor padrão de undefined
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = () => {
    const [user, setUser] = useState<any>(null);

    const login = (userData: any) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.UserProvider>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

