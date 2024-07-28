const monitor = require("express-status-monitor")

module.exports = (app) => {
    app.use(
        monitor({
            title: "Zentinel",
            path: "/health/status",
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                eventLoop: true,
                heap: true,
                responseTime: true,
                rps: true,
                statusCodes: true,
            },
            healthChecks: [
                {
                    protocol: "http",
                    host: "localhost",
                    path: "/",
                    port: "8800",
                },
            ],
        })
    );
}