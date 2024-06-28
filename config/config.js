module.exports = {
	development: {
		mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
	},
	// Add configurations for other environments (test, production) as needed
};
