require("dotenv").config();

NAME = process.env.SERVER_NAME || "ZentinelJS";

VERSION = process.env.SERVER_VER || "v1.0.0";

BASE = process.env.SERVER_BASE || "localhost";

PORT = process.env.SERVER_PORT || 80;

ENVIRONMENT = process.env.SERVER_ENV || "local";

MONGODB = process.env.MONGODB_URL || "";

DATABASE_HOST = process.env.DATABASE_HOST || "localhost";

DATABASE_NAME = process.env.DATABASE_NAME || "zentinel";

DATABASE_USER = process.env.DATABASE_USER || "root";

DATABASE_PASS = process.env.DATABASE_PASS || "";

DATABASE_TYPE = process.env.DATABASE_TYPE || "mysql";


module.exports = {
	NAME,
	VERSION,
	BASE,
	PORT,
	ENVIRONMENT,
	MONGODB,
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_USER,
	DATABASE_PASS,
	DATABASE_TYPE
};
