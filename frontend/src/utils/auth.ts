import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'jwt_token';
const USERNAME_KEY = 'username';

export interface DecodedToken {
    exp: number;
    sub: string;
    [key: string]: any;
}

export const authUtils = {
    saveSession(token: string, username: string) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USERNAME_KEY, username);
    },

    clearSession() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    getUsername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    },

    isAuthenticated(): boolean {
        const token = this.getToken();
        console.log('authUtils: Checking authentication, token exists:', !!token);
        if (!token) return false;
        const expired = this.isTokenExpired(token);
        console.log('authUtils: Token expired:', expired);
        return !expired;
    },

    isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            console.log('authUtils: Decoded token:', decoded);
            console.log('authUtils: Current time (s):', currentTime);
            console.log('authUtils: Expiration time (s):', decoded.exp);

            const isExpired = decoded.exp < currentTime;
            if (isExpired) {
                console.warn('authUtils: Token is expired!');
            }
            return isExpired;
        } catch (error) {
            console.error('authUtils: Failed to decode token:', error);
            return true; // If invalid, consider expired
        }
    },

    getTokenExpiration(token: string): number | null {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return decoded.exp * 1000; // Convert to ms
        } catch (error) {
            return null;
        }
    }
};
