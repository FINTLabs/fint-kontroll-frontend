export const nameRegex = /^[a-zA-Z0-9æøåÆØÅ ._-]{1,60}$/;

export const numberRegex = /^[0-9]+$/;

export const amountRegex = /^[0-9]+([.,][0-9]{1,2})?$/;

export const validateWithRegex = (
    value: string,
    regex: RegExp,
    errorMessage: string,
    required = true
): string | undefined => {
    const trimmedValue = value?.trim() ?? '';

    if (trimmedValue.length === 0) {
        return required ? 'Feltet kan ikke være tomt' : undefined;
    }

    if (!regex.test(trimmedValue)) {
        return errorMessage;
    }

    return undefined;
};

export const validateName = (value: string, required = true) =>
    validateWithRegex(value, nameRegex, 'Ugyldig tegn', required);

export const validateAmount = (value: string, required = true) =>
    validateWithRegex(value, amountRegex, 'Beløp må være et tall', required);

export const validateNumber = (value: string, required = true) =>
    validateWithRegex(value, numberRegex, 'Kun heltall', required);
