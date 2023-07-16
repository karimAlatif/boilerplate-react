import { KeycloakPromise } from "keycloak-js";
import { Permission } from "./type";

export interface User {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  profilePictureUrl: string;
  preferences: Preferences;
}

export interface UserDataHook {
  getUserData(): Promise<void>;
  authenticate(): Promise<void>;

  logout(options: {
    redirectUri: string;
  }): boolean | KeycloakPromise<void, void>;
  accountManagement(): boolean | KeycloakPromise<void, void>;

  authenticated(): boolean | undefined;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  accessToken: string | undefined;
  updateUserPreferences: (preferences: Partial<Preferences>) => void;
  // keycloakAuthorization: KeycloakAuthorization;
  getUserRoles: () => Promise<Permission[]>;
}

export interface DecodedTokenData extends Preferences {
  sub: string;
  email_verified: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
export interface UserData {
  id: string;
  verified: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePictureUrl: string;
  preferences: Preferences & {modelExpantion: boolean};
}

export type Preferences = {
  locale: string;
  darkTheme: boolean;
  modelExpansion: boolean;
  listView: boolean;
};
