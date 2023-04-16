import { useState, createContext } from "react";

export const TokenContext = createContext()

export default function UserProvider({ children }) {
    const [token, setToken] = useState();
    const [userData, setUserData] = useState(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : undefined);

    return (
        <TokenContext.Provider value={{ token, setToken, userData, setUserData}}>
            {children}
        </TokenContext.Provider>
    )
}