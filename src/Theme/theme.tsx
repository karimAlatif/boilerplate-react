import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './lightTheme';
import { useTranslation } from 'react-i18next';
import { user_prefered_theme_mode } from '../shared/constants';
import { ColorModeContext } from '../shared/Contexts/ColorMode';
import { darkTheme } from './darkTheme';

interface Props {
	children: React.ReactNode;
}

function AppsTheme({ children }: Props) {
	const { i18n } = useTranslation();

	const [mode, setMode] = React.useState<'light' | 'dark'>(localStorage.getItem(user_prefered_theme_mode) as 'light' | 'dark' || 'light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					const newMode = prevMode === 'light' ? 'dark' : 'light'
					localStorage.setItem(user_prefered_theme_mode, newMode)
					return (newMode)
				});
			},
		}),
		[],
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={mode === 'dark' ? { ...darkTheme, direction: i18n.dir } : { ...lightTheme, direction: i18n.dir }}>
				<CssBaseline /> {children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default AppsTheme;
