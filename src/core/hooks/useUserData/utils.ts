import decode from 'jwt-decode';
import { DecodedTokenData, UserData } from './types';
import { getUserAvatarUrl } from './api';

export const decodeUserData = (token: string): UserData => {
	const decodedData = decode<DecodedTokenData>(token);
	return {
		id: decodedData.sub,
		verified: decodedData.email_verified,
		email: decodedData.email,
		firstName: decodedData.given_name,
		lastName: decodedData.family_name,
		fullName: `${decodedData.given_name} ${decodedData.family_name}`,
		profilePictureUrl: getUserAvatarUrl(decodedData.preferred_username),
		preferences: {
			darkTheme: decodedData.darkTheme,
			listView: decodedData.listView,
			locale: decodedData.locale,
			modelExpantion: decodedData?.modelExpansion,
		},
	};
};
