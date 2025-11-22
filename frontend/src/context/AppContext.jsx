import { createContext, useState, useEffect } from "react";

export const AppContext=createContext()

export default function AppContextProvider({children}) {
    const [isLoggedin,setIsLogin]=useState(false)
    const [isLoading,setLoading]=useState(false)
    const [bookingDetails,setBookingDetails]=useState(() => {
        try {
            const raw = sessionStorage.getItem('bookingDetails')
            return raw ? JSON.parse(raw) : {}
        } catch (e) {
            return {}
        }
    })

    useEffect(() => {
        try {
            if (bookingDetails && Object.keys(bookingDetails).length > 0) {
                sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails))
            } else {
                sessionStorage.removeItem('bookingDetails')
            }
        } catch (e) {
        }
    }, [bookingDetails])
    
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
        Logout,
        bookingDetails,
        setBookingDetails
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


