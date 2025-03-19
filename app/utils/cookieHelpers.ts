// Sets Size Cookie client side
import { ICookie } from '~/data/types/generalTypes';

export const setSizeCookieClientSide = (sizeToSet: string) => {
    document.cookie = 'size=' + sizeToSet + ';path=/';
};
// Helper function for creating a key-value pair list of cookies
export const keyValueParseCookies = (cookies: string): ICookie[] => {
    return cookies.split(';').map((cookie) => {
        const [key, ...valueParts] = cookie.trim().split('=');
        const value = decodeURIComponent(valueParts.join('='));
        return { key, value };
    });
};
// Get Size Cookie from request and return it
export const getSizeCookieFromRequestHeader = (request: Request): ICookie | null => {
    const cookieHeader: string | null = request.headers.get('Cookie');
    if (cookieHeader) {
        const cookies = keyValueParseCookies(cookieHeader);
        const size = cookies.find((cookie) => cookie.key === 'size');
        return size ? size : null;
    }
    return null;
};
