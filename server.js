var figlet = require("figlet");
const http = require('http');
const os = require("os");
const app = require("./config/app");
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
				console.log(`\t- Network:\t${chalk.green('http://'+alias.address+':'+app.env.SERVER_PORT)}`);
			}
		}
	}
};

server.listen(app.env.SERVER_PORT, () => {
	//clearTerminal();
	
	console.log(chalk.yellow(figlet.textSync(app.env.SERVER_NAME, { horizontalLayout: "full" })));
	console.log(chalk.yellow(`${app.env.SERVER_NAME.toUpperCase()} SERVER RUNNING IN ${app.env.SERVER_ENV.toUpperCase()} ENVIRONMENT`));
	console.log(`\t\n\t- Local:\t${ chalk.green(app.env.SERVER_BASE+':'+app.env.SERVER_PORT) }`);

	showRemoteIP();
	
	console.log(`\nRoutes: `);
	app._router.stack.forEach(function (r) {
		if (r.route && r.route.path) {
			console.log(
				"~", 
				chalk.underline(
					r.route.stack[0].method.toUpperCase() == "POST" ? chalk.yellow(r.route.stack[0].method.toUpperCase()) :
					r.route.stack[0].method.toUpperCase() == "GET" ? chalk.green(r.route.stack[0].method.toUpperCase()) :
					r.route.stack[0].method.toUpperCase() == "PATCH" ? chalk.magenta(r.route.stack[0].method.toUpperCase()) :
					r.route.stack[0].method.toUpperCase() == "PUT" ? chalk.blue(r.route.stack[0].method.toUpperCase()) :
					r.route.stack[0].method.toUpperCase() == "DELETE" ? chalk.red(r.route.stack[0].method.toUpperCase()) :
					chalk.cyan(r.route.stack[0].method.toUpperCase())
				), 
				chalk.underline(r.route.path)
			);
		}
	});
	console.log(`\nServer Logs:`);
});
