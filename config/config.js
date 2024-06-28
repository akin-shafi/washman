require("dotenv").config(); // Load environment variables from .env file

module.exports = {
	development: {
		username: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD,
		database: process.env.DEV_DB_DATABASE,
		host: process.env.DEV_DB_HOST,
		dialect: "mysql",
	},
	test: {
		username: process.env.TEST_DB_USERNAME,
		password: process.env.TEST_DB_PASSWORD,
		database: process.env.TEST_DB_DATABASE,
		host: process.env.TEST_DB_HOST,
		dialect: "mysql",
	},
	production: {
		use_env_variable: "DATABASE_URL",
		dialect: "mysql",
	},
};
