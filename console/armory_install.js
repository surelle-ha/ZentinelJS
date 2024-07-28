const { exec } = require("child_process");

module.exports = (Armory) => {
	Armory.program
		.command("install")
		.description("Run npm install")
		.action(() => {
			Armory.showLoading(
				"Running npm install...",
				() =>
					new Promise((resolve, reject) => {
						exec("npm install", (error, stdout, stderr) => {
							if (error) {
								reject(stderr || error.message);
								return;
							}
							Armory.logWithTimestamp(stdout);
							resolve();
						});
					})
			);
		});
};
