import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: true,
    message: 'Too many request from this IP, please try again after an hour',
});

export { limiter }