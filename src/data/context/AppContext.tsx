import * as React from "react";
import { createContext, useEffect, useState } from "react";


interface AppContextProps {
    theme?: string
    changeTheme?: () => void
}

const AppContext =  createContext<AppContextProps>({})

export function AppProvider(props) {
    const [theme, setTheme] = useState('')

    function changeTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
       
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme);
        } 
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext
