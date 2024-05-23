const app = require('./app');
const env_setup = require('./config/environments');

app.listen(env_setup.PORT, () => {
    console.log("\033[2J");  // Clears the console
    console.log(
        `${env_setup.NAME.toUpperCase()} SERVER RUNNING IN ${env_setup.ENVIRONMENT.toUpperCase()} ENVIRONMENT\n\t App running at:\n\t- Local:\t${env_setup.BASE}:${env_setup.PORT}/\n\t- Network:\t${env_setup.BASE}:${env_setup.PORT}/\n\nRoutes: `
    );
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            console.log('~', (r.route.stack[0].method).toUpperCase(), r.route.path);
        }
    });
    console.log(`\nServer Logs:`)
});
