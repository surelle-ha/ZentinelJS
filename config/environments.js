require("dotenv").config();

NAME = process.env.SERVER_NAME || "ZentinelJS";

VERSION = process.env.SERVER_VER || "v1.0.0";

BASE = process.env.SERVER_BASE || "localhost";

PORT = process.env.SERVER_PORT || 80;

ENVIRONMENT = process.env.SERVER_ENV || "local";

MONGODB = process.env.MONGODB_URL || "";

module.exports = {
	NAME,
	VERSION,
	BASE,
	PORT,
	ENVIRONMENT,
	MONGODB,
};
