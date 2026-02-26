import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // Load user safely from localStorage
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Invalid user in localStorage");
            localStorage.removeItem("user");
        }
    }, []);

    // LOGIN
    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
    };

    // UPDATE USER (🔥 IMPORTANT FIX)
    const updateUser = (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};