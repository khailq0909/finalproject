export const createError = (status, message) => {
    const err = new Error();
    err.name = status;
    err.message = message;
    return err;
};