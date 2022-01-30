export default class ApiError extends Error {


    constructor(public status: number, message: string, public errors: any[] = []) {
        super(message);
    }

    static UnauthorizedError(): ApiError {
        return new ApiError(401, "User is not authorized")
    }

    static BadRequest(message: string, errors: any[] = []): ApiError {
        return new ApiError(400, message, errors)
    }
}