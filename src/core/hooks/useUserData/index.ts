import { useCallback } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import Keycloak from 'keycloak-js';
import KeycloakAuthorization from 'keycloak-js/dist/keycloak-authz';
import { User, Preferences, UserDataHook } from './types';
import { authorizationToken } from '../../../shared';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { Permission } from './type';

type GlobalState = {
	user?: User;
	autClient?: Keycloak;
	keycloakAuthorization?: KeycloakAuthorization;
};

const { useGlobalState } = createGlobalState<GlobalState>({
	user: undefined,
	autClient: undefined,
	keycloakAuthorization: undefined,
});

function useUserData(): UserDataHook {
	const [user, setUser] = useGlobalState('user');
	const [autClient, setAuthClient] = useGlobalState('autClient');
	const [keycloakAuthorization, setKeycloakAuthorization] = useGlobalState(
		'keycloakAuthorization',
	);
	const { projectId } = useParams<{ projectId: string }>();

	const handleRefreshToken = useCallback((autClient: Keycloak) => {
		if (autClient) {
			autClient.updateToken(400).then((value: boolean) => {
				if (value) {
					authorizationToken.set(autClient.token);
				}
			});
		}
	}, []);

	const authenticate = useCallback(async () => {
		const keycloak = new Keycloak({
			url: import.meta.env.VITE_KC_HOSTNAME,
			realm: import.meta.env.VITE_KC_REALM || '',
			clientId: import.meta.env.VITE_KC_CLIENT_ID || '',
		});

		const authenticatedResult = await keycloak.init({
			onLoad: 'check-sso',
			silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
			checkLoginIframe: false,
			silentCheckSsoFallback: false,
		});

		if (authenticatedResult) {
			setUser(keycloak.userInfo as User);
			authorizationToken.set(keycloak.token);
			setAuthClient(keycloak);
			const authorization = new KeycloakAuthorization(keycloak);
			setKeycloakAuthorization(authorization);

			const timeout = 5 * 60 * 1000;
			setInterval(() => {
				handleRefreshToken(keycloak);
			}, timeout);
		} else {
			keycloak.login();
		}
	}, [setUser, setAuthClient, setKeycloakAuthorization, handleRefreshToken]);

	const accountManagement = useCallback(() => {
		if (!autClient) {
			return false;
		}
		return autClient.accountManagement();
	}, [autClient]);

	const logout = useCallback(() => {
		if (!autClient) {
			return false;
		}
		return autClient.logout({
			redirectUri: `http://${window.location.host}/`,
		});
	}, [autClient]);

	const getUserData = useCallback(async () => {
		if (autClient) {
			await autClient.loadUserInfo();
			setUser(autClient.userInfo as User);
		}
	}, [autClient, setUser]);

	const authenticated = useCallback(() => {
		if (!autClient) {
			return false;
		}
		return autClient.authenticated;
	}, [autClient]);

	const updateUserPreferences = useCallback(
		(preferences: Partial<Preferences>) => {
			if (!user) {
				return;
			}
			setUser((prevUser: any) => {
				if (prevUser) {
					return {
						...prevUser,
						preferences: {
							...prevUser.preferences,
							...preferences,
						},
					};
				}
				return null;
			});
		},
		[user, setUser],
	);

	const getUserRoles = useCallback((): Promise<Permission[]> => {
		return new Promise((resolve, reject) => {
			if (keycloakAuthorization) {
				keycloakAuthorization.entitlement(`x-${projectId}`).then(
					(rpt: any) => {
						const decoded: {
							authorization: {
								permissions: Permission[];
							};
						} = jwt_decode(rpt);
						setKeycloakAuthorization(rpt);
						resolve(decoded.authorization.permissions);
					},
					() => {
						return [];
					},
					() => {
						return [];
					},
				);
			}
			return new Promise((resolve, reject) => {
				return [];
			});
		});
	}, [keycloakAuthorization, projectId]);


	return {
		authenticated,
		getUserData,
		authenticate,
		getUserRoles,
		logout,
		accountManagement,
		user,
		setUser,
		accessToken: (autClient && autClient.token) || '',
		updateUserPreferences,
	};
}

export default useUserData;
