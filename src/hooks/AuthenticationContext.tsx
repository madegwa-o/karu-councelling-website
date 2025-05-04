import {createContext, useState, useContext, Dispatch, SetStateAction, ReactNode} from "react";

type AuthContextType = {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;

}

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

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}
