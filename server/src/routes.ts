import { Express, Request, Response } from "express";
import log from "./logger";
var axios = require('axios');

/**
 * Default routes function to register express routes
 * 
 * @param app Express app object
 */
export default function (app: Express) {

	/**
	 * Root endpoint
	 * Returns a map of the routes currently supported by the API
	 */
	app.get("/", (req: Request, res: Response) =>{
		res.status(200).send({
			"healthcheck": "/healthcheck",
			"currencies": "/currencies",
			"rates": "/rates"
		})
	});

	/**
	 * Healthcheck endpoint for monitoring and observability to verify that the API works
	 */
	app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

	/**
	 * Currencies endpoint
	 * 
	 * Returns a list of currency codes
	 */
	app.get("/currencies", (req: Request, res: Response) => {
		// Get all currencies
		var config = {
			method: 'get',
			url: 'https://openexchangerates.org/api/currencies.json',
			headers: { }
		};
		
		axios(config)
		.then(function (response: any) {
			const currencyMap = {...response.data}
			// Return the currencies here
			res.status(200).send(currencyMap)
			log.info("Currency map gotten from upstream")
		})
		.catch(function (error: any) {
			log.error("Failed to get currencies from upstream")
			log.error(error);
		});
	})

	/**
	 * Rates Endpoint
	 * 
	 * Returns a map of global currency rates relative to the AUD.
	 */
	app.get("/rates", (req: Request, res: Response) => {
		// Get rates using the FIXER API
		var config = {
			method: 'get',
			url: 'https://api.apilayer.com/fixer/latest?&base=AUD',
			headers: { 
				apikey: "4tr3l06d2qZSv51D5hSu67OE3nGuTX2q"
			}
		};
		
		axios(config)
		.then(function (response: any) {
			const ratesMap = {...response.data.rates}
			// Return the rates here
			res.status(200).send(ratesMap)
			log.info("Rates map gotten from upstream")
		})
		.catch(function (error: any) {
			log.error("Failed to get rates from upstream")
			log.error(error);
		});
	})
}
