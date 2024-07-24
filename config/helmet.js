const helmet = require("helmet");

module.exports = (app) => {
    const helmet_supercharged = helmet();
    app.use(helmet_supercharged)
}

