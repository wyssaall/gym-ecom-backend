import { body, validationResult } from 'express-validator';

const productValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').notEmpty().isFloat({ gt: 0 }).withMessage('Price is required, must be greater than 0'),
    body('stock').notEmpty().isInt({ gt: 0 }).withMessage('Stock is required, must be greater than 0')

]
const adminValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('6 caractères min')

]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

}
export { productValidator, validate, adminValidator };