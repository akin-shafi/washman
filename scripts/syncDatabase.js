// scripts/syncDatabase.js
import { connect, syncDatabase } from "@/utils/db";

const syncDB = async () => {
	await connect();
	await syncDatabase();
};

syncDB()
	.then(() => {
		console.log("Database synchronized successfully.");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Error during database synchronization:", error);
		process.exit(1);
	});
