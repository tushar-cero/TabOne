import { validationResult } from "express-validator";

export const validateResult = (request, response, next) => {
    const errors = validationResult(request).errors;
    if(!errors.isEmpty()) {
        return response.status(400).json({message: errors.array()[0].msg});
    } 
    next();
}