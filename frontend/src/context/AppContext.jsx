import { createContext, useState } from "react";

export const AppContext=createContext()

export default function AppContextProvider({children}) {
    const [isLoggedin,setIsLogin]=useState(false)
    const [isLoading,setLoading]=useState(false)
    
    function Logout(){
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setIsLogin(false)
    }
    
    const value={
        isLoading,
        setLoading,
        isLoggedin,
        setIsLogin,
        Logout
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


