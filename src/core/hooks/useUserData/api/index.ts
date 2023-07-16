import http, { Services } from '../../../../adapters/rest';
import { Preferences, UserData } from '../types';
import {
	AccessData,
	ActivationResponse,
	LoginData,
	RegisterData,
} from './types';

export const login = (loginData: LoginData): Promise<AccessData> => {
	const url = `${Services.IAM}/v1/auth`;
	return http
		.post<AccessData>(url, { ...loginData, grantType: 'password' })
		.then((response) => {
			return response.data;
		});
};

export const refreshToken = (refreshToken: string): Promise<AccessData> => {
	const url = `${Services.IAM}/v1/login`;
	return http
		.post(url, { refreshToken, grantType: 'refresh_token' })
		.then((response) => response.data);
};

export const getUserData = (): Promise<UserData> => {
	const url = `${Services.IAM}/v1/users/user-info`;
	return http.get<UserData>(url).then((response) => response.data);
};

export const updateUserData = (data: Partial<UserData>) => {
	const url = `${Services.IAM}/v1/user`;
	return http.put(url, data).then((response) => response.data);
};

export const register = (
	userData: RegisterData,
	query?: string,
): Promise<boolean> => {
	const url = `${Services.IAM}/v1/signup${query}`;
	return http
		.post<{ data: boolean }>(url, userData)
		.then((response) => response.data.data);
};

export const getUserAvatarUrl = (name: string): string => {
	return `https://ui-avatars.com/api/?name=${name}&size=128&color=fff&background=0D8ABC`;
};

export const verifyUserToken = (): Promise<{
	// user: UserData;
	// accessData: AccessData;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	refreshExpiresIn: number;
}> => {
	const url = `${Services.IAM}/v1/auth`;
	return http
		.post<{
			// user: UserData;
			// token: AccessData;
			access_token: string;
			refresh_token: string;
			expires_in: number;
			refresh_expired_in: number;
		}>(url, {
			grantType: 'authorization_code',
		})
		.then((response) => {
			const {
				access_token,
				refresh_token,
				expires_in,
				refresh_expired_in,
			} = response.data;
			// const fullName = `${user.firstName} ${user.lastName}`;
			// user.fullName = fullName;
			// user.profilePictureUrl = getUserAvatarUrl(fullName);
			return {
				accessToken: access_token,
				refreshToken: refresh_token,
				expiresIn: expires_in,
				refreshExpiresIn: refresh_expired_in,
			};
		});
};

export const activateUserAccount = (
	token: string,
): Promise<ActivationResponse> => {
	const url = `${Services.IAM}/v1/activate`;
	return http
		.post(url, null, { params: { token } })
		.then((response) => response.data)
		.catch((err) => err.response.data);
};

export const sendActivationMail = (email: string): Promise<unknown> => {
	const url = `${Services.IAM}/v1/resend-activation`;
	return http
		.post(url, { email })
		.then((response) => response.data)
		.catch((err) => err.response.data);
};

export const requestResetPassword = (data: { email: string }): Promise<any> => {
	const url = `${Services.IAM}/v1/reset-password`;
	return http
		.post(url, data)
		.then(() => ({ messageKey: 'reset_password_success' }))
		.catch((err) => err.response.data);
};

export const verifyResetPasswordToken = (
	token: string,
	email: string,
): Promise<any> => {
	const url = `${Services.IAM}/v1/reset-password`;
	return http
		.get(url, { params: { token }, data: { email } })
		.then((response) => response.data)
		.catch((err) => err.response.data);
};

export const processResetPasswordToken = (
	token: string,
	formData: {
		newPassword: string;
		confirmPassword: string;
	},
): Promise<any> => {
	const url = `${Services.IAM}/v1/reset-password`;
	return http
		.put(url, formData, { params: { token } })
		.then((response) => response.data)
		.catch((err) => err.response.data);
};

export const signOut = () => {
	const url = `${Services.IAM}/v1/logout`;
	return http.post(url).then((response) => response.data);
};

export const inviteMember = (
	accountId: string,
	teamIds: string[],
	emails: string[],
) => {
	const url = `${Services.IAM}/v1/accounts/${accountId}/members`;
	return http
		.post(url, { members: emails, teams: teamIds, role: 'member' })
		.then((response) => response.data);
};

export const getPreferences = () => {
	const url = `${Services.IAM}/v1/users/user-info`;
	return http.get<Preferences>(url).then((response) => response.data);
};

export const updatePreferences = (preferences: Preferences) => {
	const url = `${Services.IAM}/v1/users/update-preferences`;
	return http.put(url, { preferences }).then((response) => response.data);
};
