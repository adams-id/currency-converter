import express from "express";
import config from "config";
import log from "./logger";
import routes from "./routes";
const cors = require('cors');

// Use configuration values from config
const port = config.get("port") as number;
const host = config.get("host") as string;

// Initialize express app
const app = express();

// Configure express parse responses as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// Allow all origins for CORS
app.use(cors({
	origin: '*'
}));


app.listen(port, host, () => {
	log.info(`server listening at http://${host}:${port}`);

	// Register routes
	routes(app);
})