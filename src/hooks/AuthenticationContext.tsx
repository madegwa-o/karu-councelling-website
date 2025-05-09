import {createContext, useState, useContext, Dispatch, SetStateAction, ReactNode} from "react";

type AuthContextType = {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    baseUrl: string;
    productionUrl: string;
};

let contextRef = null


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthentication() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthentication must be used with a AuthProvider');
    }
    return context;
}

export function AuthenticationProvider({children}: {children: ReactNode})  {
    const [accessToken, setAccessToken] = useState<string>(' ');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const productionUrl = import.meta.env.VITE_PRODUCTION_URL;



    const login = async (username, password) => {
        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
        } catch (error) {
            console.error(error.message);
        }
    };


    const logout = () => {
        setAccessToken('');
    };

    const contextValue = {accessToken, setAccessToken,  login, logout, baseUrl: backendUrl, productionUrl};
    contextRef = contextValue;




    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const getAuthContext = () => contextRef;
