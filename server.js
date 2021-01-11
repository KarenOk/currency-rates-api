const express = require("express");
const app = express();

const rates = {
	rates: {
		CAD: 1.5543,
		HKD: 9.4982,
		ISK: 155.5,
		PHP: 58.947,
		DKK: 7.4369,
		HUF: 359.62,
		CZK: 26.163,
		AUD: 1.5758,
		RON: 4.8708,
		SEK: 10.051,
		IDR: 17247.33,
		INR: 89.7975,
		BRL: 6.5748,
		RUB: 90.8,
		HRK: 7.569,
		JPY: 127.26,
		THB: 36.848,
		CHF: 1.0827,
		SGD: 1.6228,
		PLN: 4.5113,
		BGN: 1.9558,
		TRY: 9.0146,
		CNY: 7.9184,
		NOK: 10.2863,
		NZD: 1.6883,
		ZAR: 18.7212,
		USD: 1.225,
		MXN: 24.4718,
		ILS: 3.8981,
		GBP: 0.90128,
		KRW: 1337.9,
		MYR: 4.9359
	},
	base: "EUR",
	date: "2021-01-08"
};

app.get("/api/rates", (req, res) => {
	const { currency, base } = req.query;

	if (!currency && base) {
		res.status(400).json({
			error: 400,
			message: "Base and currency not specified."
		});
	}

	try {
		const filteredRates = {};
		const currencyList = currency.split(",");
		currencyList.forEach(cur => (filteredRates[cur] = rates.rates[cur]));

		res.json({
			results: {
				base: base,
				date: new Date().toISOString().split("T")[0],
				rates: filteredRates
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: 500,
			message: "Something went wrong on the server."
		});
	}
});

app.get("/", (req, res) => {
	// Health Check
	res.send("This API is up and running.");
});

app.get("*", (req, res) => {
	res.status(404).json({
		error: 404,
		message: "The resource you requested does not exist"
	});
});

app.listen(5000);
