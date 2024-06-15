module.exports = {
	apps: [
		{
			name: "ZentinelJS",
			script: "server.js",
			watch: ".",
			env: {
				SERVER_ENV: "development",
			},
			env_production: {
				SERVER_ENV: "production",
			},
			error_file: "./storage/logs/app-err.log",
			out_file: "./storage/logs/app-out.log"
		},
	],

	deploy: {
		production: {
			user: "SSH_USERNAME",
			host: "SSH_HOSTMACHINE",
			ref: "origin/master",
			repo: "GIT_REPOSITORY",
			path: "DESTINATION_PATH",
			"pre-deploy-local": "",
			"post-deploy":
				"npm install && pm2 reload ecosystem.config.js --env production",
			"pre-setup": "",
		},
	},
};
