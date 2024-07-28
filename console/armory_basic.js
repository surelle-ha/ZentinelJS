module.exports = (Armory) => {
	Armory.program
		.command("hello")
		.description("Prints Hello, World!")
		.action(() => {
			Armory.logWithTimestamp("Hello, World!", "green");
		});

	Armory.program
		.command("inspire")
		.description("Prints an inspiring quote")
		.action(async () => {
			try {
				const response = await axios.get("https://api.quotable.io/random");
				const { content, author } = response.data;
				Armory.logWithTimestamp(`"${content}" — ${author}`, "cyan");
			} catch (error) {
				Armory.logWithTimestamp("Failed to fetch a quote.", "red");
			}
		});
};
