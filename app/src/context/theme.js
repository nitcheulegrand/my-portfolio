import { createContext, useCallback, useContext, useMemo, useState } from "react";


const dark_themes = ["black"];

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("sky");
    const [textTheme, setTextTheme] = useState("black");
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const changeTheme = useCallback((newTheme) => {
        const isDark = dark_themes.some(t => t===newTheme);
        setIsDarkTheme(isDark);
        setTextTheme(isDark ? "white" : "black");
        setTheme(newTheme);
    }, [theme]);

    const getBgColor = (level) => {
        if (theme==="black") return "slate-" + (level === 50 ? 900 : 900 - level);
        if (theme==="white") return "slate-" + level;
        return theme + "-" + level;
    };

    const getTextColor = (level) => {
        if (textTheme==="black") return "black";
        if (textTheme==="white") return "white";
        return textTheme + "-" + level;
    };

    const contextValue = useMemo(() => {
        return {
            textTheme,
            theme: theme,
            isDarkTheme,
            changeTheme,
            getBgColor,
            getTextColor
        }
    }, [theme, textTheme, isDarkTheme, changeTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

const useThemeContext = () => {
    return useContext(ThemeContext);
}

export {
    useThemeContext
}