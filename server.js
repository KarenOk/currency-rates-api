const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/api/rates", async (req, res) => {
	const { currency, base } = req.query;

	try {
		const proxyRes = await fetch(
			`https://api.exchangeratesapi.io/latest?${base ? `base=${base}` : ""}${base && currency ? "&" : ""}${
				currency ? `symbols=${currency}` : ""
			}`
		);
		const results = await proxyRes.json();
		res.json({ results });
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
	res.send("Currency Rates API is up and running.");
});

app.get("*", (req, res) => {
	res.status(404).json({
		error: 404,
		message: "The resource you requested does not exist."
	});
});

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
