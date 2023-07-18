import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './lightTheme';
import { useTranslation } from 'react-i18next';

interface Props {
	children: React.ReactNode;
}

function AppsTheme({ children }: Props) {
	const { i18n } = useTranslation();

	return (
		<ThemeProvider theme={{ ...lightTheme, direction: i18n.dir }}>
			<CssBaseline /> {children}
		</ThemeProvider>
	);
}

export default AppsTheme;
