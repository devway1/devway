// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserType = {
    id: string;
    email: string;
    name?: string;
    role: "user" | "admin";
};

type AuthContextType = {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const login = (userData: UserType) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
