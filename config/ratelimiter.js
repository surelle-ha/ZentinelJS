const rateLimit = require("express-rate-limit");

module.exports = (app) => {
	/* Rate Limit Reset in minutes */
	const windowM = 15;

	const exemptedEndpoints = ["/webhook/ratelimit/reset"];

	const config = {
		/* Exempt endpoint from Rate Limiter */
		skip: (req) => exemptedEndpoints.includes(req.url),

		delayAfter: 1, // Allow only one request to go at full-speed.

		delayMs: (hits) => hits * hits * 1000,

		/* 15 minutes */
		windowMs: windowM * 60 * 1000,

		/* Request Limit Per IP Per Window */
		limit: 1000000000,

		/* draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header */
		standardHeaders: "draft-7",

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
			message: "Too many requests, please try again later.",
		},
	};

	const ratelimit_supercharged = rateLimit(config);
    app.resetKey = ratelimit_supercharged.resetKey;
    app.getKey = ratelimit_supercharged.getKey;
	app.use("/api", ratelimit_supercharged);
};
