import {BASE_PATH, basePathNoTrailingSlash, USER_API_URL} from "../../environment";
import logger from "~/logging/logger";

export const fetchMeInfo = async (token: string | null) => {
    const url = `${USER_API_URL}${BASE_PATH}/api/users/me`;
    logger.info("Requesting API @ ", url, " with token", token);
    const response = await fetch(`${USER_API_URL}${BASE_PATH}/api/users/me`, {
        headers: {Authorization: token ?? ""}
    });

    logger.info("Response from ", url, response);

    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")

}





