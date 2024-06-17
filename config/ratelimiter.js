const rateLimit = require('express-rate-limit');

/* Rate Limit Reset in minutes */
const windowM = 15;

const exemptedEndpoints = [
    '/webhook/ratelimit/reset'
];

const RateLimit = rateLimit({
    /* Exempt endpoint from Rate Limiter */
    skip: (req) => exemptedEndpoints.includes(req.url),

    /* 15 minutes */
    windowMs: windowM * 60 * 1000,

    /* Request Limit Per IP Per Window */
    limit: 1000000000,

    /* draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header */
    standardHeaders: 'draft-7',

    /* Disable the `X-RateLimit-*` headers */
    legacyHeaders: false,

    /* 429 status = Too Many Requests (RFC 6585) */
    statusCode: 429, 
    
    /* Send custom rate limit header with limit and remaining */
    headers: true, 

    /* Do not count failed requests (status >= 400) */
    skipFailedRequests: false, 

    /* Do not count successful requests (status < 400) */
    skipSuccessfulRequests: false,

    message: {
        status: 429, 
        message: 'Too many requests, please try again later.'
    },

    onLimitReached: function (/*req, res, optionsUsed*/) { }
})

module.exports = { RateLimit };
