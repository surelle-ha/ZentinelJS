const fs = require("fs");

function composer(dir, filePath, content) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error("Failed to create Component:", err);
		} else {
			console.log(`Component created successfully at ${filePath}`);
		}
	});
}

module.exports = {
    composer
}