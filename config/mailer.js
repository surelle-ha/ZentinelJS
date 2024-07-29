const nodemailer = require("nodemailer");

module.exports = (app) => {
	app.mailer = nodemailer.createTransport({
		port: app.env.MAILER_PORT, 
		host: app.env.MAILER_HOST,
        secureConnection: (app.env.MAILER_SECURE).toLowerCase() === 'true',
		auth: {
			user: app.env.MAILER_USER,
			pass: app.env.MAILER_PASS,
		},
		tls: {
            ciphers: app.env.MAILER_CIPHER
        }
	});
};
