import { param, body, validationResult } from 'express-validator';

const len_title = 60;
const len_location = 90;
const format_date = 'YYYY-MM-DD';
const format_time = 'HH:MM:SS';

const regex_date = /^(19|20)\d{2}-(0[1-9]|1[1,2])-(0[1-9]|[12][0-9]|3[01])/;
const regex_time = /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/;
const regex_digits = /^[0-9]*$/;

export const param_id = () =>
    param('id')
        .matches(regex_digits).withMessage(`id parameter must be digit(s)`);

export const id_non = () =>
    body('id')
        .isEmpty().bail({ level: 'request' }).withMessage('field is irrelevant');

export const dateCreated_non = () =>
    body('dateCreated')
        .isEmpty().bail({ level: 'request' }).withMessage('field is irrelevant');

export const title = () =>
    body('title')
        .notEmpty().bail({ level: 'request' }).withMessage('input is required')
        .isString().withMessage('input must be a string')
        .isLength({ max: len_title }).withMessage(`input must not exceed ${len_title} characters`);

export const title_opt = () =>
    body('title')
        .optional()
        .isString().withMessage('input must be a string')
        .isLength({ max: len_title }).withMessage(`input must not exceed ${len_title} characters`);
        
export const location = () =>
    body('location')
        .optional({ values: 'falsy' })
        .isString().withMessage('input must be a string')
        .ltrim().rtrim()
        .isLength({ max: len_location }).withMessage(`input must not exceed ${len_location} characters`);

export const note = () =>
    body('note')
        .optional({ values: 'falsy' })
        .isString().withMessage('input must be a string');

export const targetDate = () =>
    body('targetDate')
        .optional({ values: 'null' })
        .isString().withMessage('input must be a string')
        .matches(regex_date).withMessage(`input must be a valid date in the format ${format_date}`);

export const targetTime = () =>
    body('targetTime')
        .optional({ values: 'null' })
        .isString().withMessage('input must be a string')
        .matches(regex_time).withMessage(`input must be a valid date in the format ${format_time}`);

export const completion = () =>
    body('completion')
        .optional({ values: 'null' })
        .isString().withMessage('input must be a string')
        .matches(regex_date).withMessage(`input must be a valid date in the format ${format_date}`);

export const completion_non = () =>
    body('completion')
        .isEmpty().bail({ level: 'request' }).withMessage('field is irrelevant');

export const validationError = (req, res, next) => {
    const result = validationResult(req);
    !result.isEmpty() ? res.status(400).json(result.array()) : next();
}