import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext({
	theme: null as string | null,
	updateTheme: (theme: keyof typeof Themes) => {},
});

export const useTheme = () => {
	return useContext(ThemeContext);
};

export const Themes = {
	DARK: "dark",
	LIGHT: "light",
	HIGH_CONTRAST: "high-contrast",
	SOLARIZED: "solarized",
	DRACULA: "dracula",
};

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
	const [theme, setTheme] = useState<string | null>(null);

	const saveThemeToLocalStorage = (theme: string) => {
		localStorage.setItem("theme", theme);
	};

	const loadThemeFromLocalStorage = () => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme);
		} else {
			setTheme(Themes.DARK);
		}
	};

	const updateTheme = (themeToSet: string) => {
		setTheme(themeToSet);
	};

	useEffect(() => {
		if (!theme) return;
		document.documentElement.setAttribute("data-theme", theme);
		saveThemeToLocalStorage(theme);
	}, [theme]);

	useEffect(() => {
		if (!theme) loadThemeFromLocalStorage();
	}, []);

	return <ThemeContext.Provider value={{theme, updateTheme}}>{children}</ThemeContext.Provider>;
};
