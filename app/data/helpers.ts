// Helper function to convert Headers instance to plain object
const headersToObject = (headers: Headers): Record<string, string> => {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
        result[key] = value;
    });
    return result;
};

export const changeAppTypeInHeadersAndReturnHeaders = (headers: Headers): Record<string, string> => {
    const headersObject = headersToObject(headers);
    headersObject['content-type'] = 'application/json';
    return headersObject;
};