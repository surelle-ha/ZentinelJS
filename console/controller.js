const path = require("path");
const fs = require("fs");

module.exports = (Armory) => {
	Armory.program
		.command("controller:make <name>")
		.description("Create a new controller")
		.action((name) => {
			const controllerName = name.charAt(0).toUpperCase() + name.slice(1);
			const filePath = path.join(
				Armory.controllersDir,
				`${controllerName}.Controller.js`
			);

			// Ensure the controllers directory exists
			if (!fs.existsSync(Armory.controllersDir)) {
				fs.mkdirSync(Armory.controllersDir, { recursive: true });
			}

			// Check if the file already exists
			if (fs.existsSync(filePath)) {
				Armory.logWithTimestamp(
					`Error: '${controllerName}.Controller.js' already exists.`,
					"red"
				);
			} else {
				// Define the content of the new controller file
				const controllerContent = `
module.exports = function (app) {
  const Controller = {
    name: "${controllerName}",
  };

  Controller.customFunction = (req, res) => {
    // Your function here
  };

  return Controller;
};
      `.trim();

				// Write the content to the new file
				fs.writeFileSync(filePath, controllerContent, "utf8");
				Armory.logWithTimestamp(
					`${controllerName}.Controller.js created successfully.`,
					"green"
				);
			}
		});
};
