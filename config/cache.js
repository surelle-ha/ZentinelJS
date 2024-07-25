const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 }); // TTL in seconds

module.exports = (app) => {
    const cache_supercharged = (req, res, next) => {
        const requestUrl = req.originalUrl || req.url;
        const requestIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const deviceNumber = req.headers['device-number'] || 'default';
        const userLogged = req.headers['authorization'] || 'guest';

        const key = (`${requestUrl}:${requestIp}:${userAgent}:${deviceNumber}:${userLogged}`);
        const cachedResponse = myCache.get(key);
		
        if (cachedResponse) {
            res.setHeader('Content-Type', 'application/json');
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
