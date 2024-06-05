const os = require("os");
const app = require("./app");
const env_setup = require("./config/environments");

const clearTerminal = () => {
	if (process.platform === "win32") {
		process.stdout.write("\033c");
	} else {
		process.stdout.write("\x1Bc");
	}
}

const showRemoteIP = () => {
	const networkInterfaces = os.networkInterfaces();
	for (const interfaceName in networkInterfaces) {
		const interfaceInfo = networkInterfaces[interfaceName];
		for (const alias of interfaceInfo) {
			if (alias.family === "IPv4" && !alias.internal) {
				console.log(`\t- Network:\thttp://${alias.address}:${env_setup.PORT}`);
			}
		}
	}
}

app.listen(env_setup.PORT, () => {
	clearTerminal();
	console.log(
		`${env_setup.NAME.toUpperCase()} SERVER RUNNING IN ${env_setup.ENVIRONMENT.toUpperCase()} ENVIRONMENT\n\t App running at:\n\t- Local:\t${
			env_setup.BASE
		}:${env_setup.PORT}`);
        showRemoteIP();
        console.log(`\nRoutes: `
	);
	app._router.stack.forEach(function (r) {
		if (r.route && r.route.path) {
			console.log("~", r.route.stack[0].method.toUpperCase(), r.route.path);
		}
	});
	console.log(`\nServer Logs:`);
});
