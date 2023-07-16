import { User } from '../types';

export interface AccessData {
	access_token: string;
	expires_in: number;
	refresh_expires_in: number;
	refresh_token: string;
	token_type: string;
	onBoarding: boolean;
	activeSubscription: boolean;
	accountStatus: 'PENDING' | 'ACTIVE';
	['not-before-policy']: string;
	session_state: string;
	scope: string;
	accountId: string;
}

export interface LoginResponseError {
	code: number;
	message: string;
	messageKey: string;
	referenceCode: string;
}
