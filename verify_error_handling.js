
import { errorHandler } from './middlewares/error.middleware.js';
import AppError from './utils/appError.js';

const req = {};
const res = {
    statusCode: 200,
    status: function (code) {
        this.statusCode = code;
        return this;
    },
    json: function (data) {
        console.log('Response Status:', this.statusCode);
        console.log('Response JSON:', JSON.stringify(data, null, 2));
    }
};
const next = () => { };

console.log('--- Test 1: Operational Error (404) ---');
const error404 = new AppError('Resource not found', 404);
errorHandler(error404, req, res, next);

console.log('\n--- Test 2: Generic Error (500) ---');
const error500 = new Error('Database connection failed'); // generic error
errorHandler(error500, req, res, next);
