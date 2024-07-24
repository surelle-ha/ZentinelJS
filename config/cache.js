const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports = (app) => {
	const cache_supercharged = (req, res, next) => {
		const key = req.originalUrl || req.url;
		const cachedResponse = myCache.get(key);

		if (cachedResponse) {
			res.send(cachedResponse);
		} else {
			const originalSend = res.send.bind(res);
			res.send = function (body) {
				myCache.set(key, body);
				originalSend(body);
			};

			next();
		}
	};
	app.use(cache_supercharged);
};
