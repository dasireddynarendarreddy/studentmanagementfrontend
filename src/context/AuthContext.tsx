
import React from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;  
    setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const AuthContext= React.createContext<AuthContextType|undefined>(undefined);