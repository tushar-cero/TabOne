import {check} from 'express-validator';

// ----- USER RULES -----

export const registerRules = [
    check("name", "Name is Required").notEmpty().trim().escape(), 
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", - "Password should be 8 or more characters").isLength({min: 8}),
];
export const loginRules = [
    check("name", "Name is Required").notEmpty().trim().escape(), 
    check("email", "Please give valid Email").isEmail().normalizeEmail()
];
export const updateDetailsRules = [
    check("name", "Name is Required").notEmpty().trim().escape(), 
    check("email", "Please give valid Email").isEmail().normalizeEmail()
];
export const updatepasswordRules = [
    check("password", - "Password should be 8 or more characters").isLength({min: 8}),
    check("new_password", - "New password should be 8 or more characters").isLength({min: 8})
];

// ----- TASK RULES -----

export const createTaskRules = [
    check("task_description", "Title is Required").notEmpty().trim().escape(),
    check("priority", "Priority is Required").notEmpty().trim().escape().isBoolean(),
    check("date", "Date is Required").notEmpty().trim().escape().isDate()
];
export const updateTaskRules = [
    check("task_description", "Title is Required").notEmpty().trim().escape(),
    check("complete", "Completed is Required").notEmpty().trim().escape().isBoolean(),
    check("priority", "Priority is Required").notEmpty().trim().escape().isBoolean(),
    check("date", "Date is Required").notEmpty().trim().escape().isDate()
];