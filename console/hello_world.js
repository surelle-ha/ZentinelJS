module.exports = (Armory) => {
	Armory.program
		.command("hello_world")
		.description("Prints Hello, World!")
		.action(() => {
			Armory.logWithTimestamp("Hello, World!", "green");
		});
};
