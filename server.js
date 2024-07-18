var figlet = require("figlet");
const http = require('http');
const os = require("os");
const app = require("./config/app");
const env_setup = require("./config/environments");
const { initSocket } = require('./config/socket');
const chalk = require('./config/console');
const server = http.createServer(app); 

initSocket(server);  

const clearTerminal = () => {
	if (process.platform === "win32") {
		process.stdout.write("\033c");
	} else {
		process.stdout.write("\x1Bc");
	}
};

const showRemoteIP = () => {
	const networkInterfaces = os.networkInterfaces();
	for (const interfaceName in networkInterfaces) {
		const interfaceInfo = networkInterfaces[interfaceName];
		for (const alias of interfaceInfo) {
			if (alias.family === "IPv4" && !alias.internal) {
				console.log(`\t- Network:\t${chalk.green('http://'+alias.address+':'+env_setup.PORT)}`);
			}
		}
	}
};

server.listen(env_setup.PORT, () => {
	clearTerminal();
	
	console.log(chalk.yellow(figlet.textSync(env_setup.NAME, { horizontalLayout: "full" })));
	console.log(chalk.yellow(`${env_setup.NAME.toUpperCase()} SERVER RUNNING IN ${env_setup.ENVIRONMENT.toUpperCase()} ENVIRONMENT`));
	
	console.log(`\t\n\t- Local:\t${ chalk.green(env_setup.BASE+':'+env_setup.PORT) }`);

	showRemoteIP();
	
	console.log(`\nRoutes: `);
	app._router.stack.forEach(function (r) {
		if (r.route && r.route.path) {
			console.log("~", chalk.red(r.route.stack[0].method.toUpperCase()), chalk.underline(r.route.path));
		}
	});
	console.log(`\nServer Logs:`);
});
