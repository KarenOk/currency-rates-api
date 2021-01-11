# Currency Rates API

Express API for fetching current foreign exchange rates.

## Steps to run the server locally

1. Install dependencies with the command `npm install`
2. Start the server with the command `npm run serve`
3. Visit `http://localhost:5000/api/rates`

## API Reference

**BASE URL**: `https://api-currency-rates.herokuapp.com/`

### `GET /api/rates`

This fetches and returns the latest currency rates .

#### Query Parameters

`base`: string <small> (optional) </small> - the home currency rates to be quoted against (i.e. CZK) <br>
`currency`: string <small> (optional) </small> -the specific exchange rates based on a comma-separated symbols parameter (i.e. EUR,GBP,USD) <br>

#### Sample Request

`curl https://api-currency-rates.herokuapp.com/api/rates?base=CZK&currency=EUR,GBP,USD -X GET`

#### Sample Response

`results` object - JSON object containing the results from the API. <br>
`base`: string - the requested home rate from the request URL query strings. <br>
`date`: string - the current date. <br>
`rates`: object - object containing the requested currency in the request URL query strings <br>

```
{
    "results": {
        "base": "CZK",
        "date": "2020-11-17",
        "rates": {
            "EUR": 0.0377244605,
            "GBP": 0.033795458,
            "USD": 0.044824204
        }
    }
}
```

## Error Handling

### Response Object

Errors are returned as JSON in the following format:

```
{
    "error": 404,
    "message": "The requested resource was not found."
}
```

### Response Keys

`error` - Status code of the error that occurred. <br>
`message` - Accompanying error message.

### Status Codes

`400 (Bad request)` - Your request was not properly formatted. <br>
`404 (Not found)` - The requested resource was not found. <br>
`500 (Internal server error)` - Something went wrong on the server. <br>
