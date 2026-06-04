# Crypto Stablecoin Rate Tracker

A Node.js application that fetches real-time **USDT** and **USDC** exchange rates from multiple providers and stores the results in a Google Sheet for comparison, monitoring, and historical analysis.

---

## 🚀 Features

* Fetches **USDT → INR** and **USDC → INR** exchange rates from:

  * CoinGecko
  * LiveCoinWatch
  * CoinMarketCap
* Automatically appends fetched data to Google Sheets
* Compares pricing across multiple providers
* Tracks stablecoin price discrepancies
* Supports historical analysis and reporting
* Simple Node.js implementation with Google Sheets integration

---

## 📊 Data Sources

### CoinGecko

* USDT → INR
* USDC → INR

### LiveCoinWatch

* USDT → INR
* USDC → INR

### CoinMarketCap

* USDT → INR
* USDC → INR

---

## 📈 Metrics Tracked

Each execution stores the following information in Google Sheets:

| Field                                     | Description                   |
| ----------------------------------------- | ----------------------------- |
| Date                                      | Execution date                |
| Time                                      | Execution time                |
| Attempt Number                            | Current run count             |
| CoinGecko USDT/INR                        | USDT price from CoinGecko     |
| CoinGecko USDC/INR                        | USDC price from CoinGecko     |
| LiveCoinWatch USDT/INR                    | USDT price from LiveCoinWatch |
| LiveCoinWatch USDC/INR                    | USDC price from LiveCoinWatch |
| CoinMarketCap USDT/INR                    | USDT price from CoinMarketCap |
| CoinMarketCap USDC/INR                    | USDC price from CoinMarketCap |
| CoinGecko vs LiveCoinWatch Difference     | Price variance                |
| CoinGecko vs CoinMarketCap Difference     | Price variance                |
| LiveCoinWatch vs CoinMarketCap Difference | Price variance                |
| Status                                    | Success / Failure             |
| Notes                                     | Additional information        |

---

## 🛠 Installation

### Clone the Repository


### Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
LIVECOINWATCH_API_KEY=YOUR_LIVECOINWATCH_API_KEY
COINMARKETCAP_API_KEY=YOUR_COINMARKETCAP_API_KEY
```

---

## 📄 Google Sheets Setup

### 1. Create a Google Cloud Project

* Go to Google Cloud Console.
* Create a new project.

### 2. Enable Google Sheets API

* Navigate to APIs & Services.
* Enable the Google Sheets API.

### 3. Create a Service Account

* Create a Service Account under IAM & Admin.
* Generate a JSON key.

### 4. Add Credentials

Save the downloaded JSON key file in the project root:

```text
credentials.json
```

### 5. Share the Spreadsheet

Share your Google Sheet with the Service Account email address and grant **Editor** access.

---

## ▶️ Run the Application

```bash
node index.js
```

---

## 📋 Example Response

```json
{
  "usdtInr": 95.46,
  "usdcInr": 95.57
}
```

After execution, a new row is automatically appended to the configured Google Sheet.

---

## 🔒 Security

Never commit the following files to GitHub:

* `.env`
* `credentials.json`

These files contain sensitive API keys and Google Service Account credentials.

Before making the repository public, verify that:

* No API keys are hardcoded.
* `.env` is listed in `.gitignore`.
* `credentials.json` is listed in `.gitignore`.
* Sensitive files have never been committed to Git history.

---

## 📌 Use Cases

* Stablecoin price monitoring
* Arbitrage opportunity tracking
* INR conversion benchmarking
* Historical stablecoin pricing analysis
* Comparing exchange-rate providers

---



## Disclaimer

This project is intended for educational and monitoring purposes only. Exchange rates may vary across providers and should not be considered financial advice. Always verify pricing directly from official sources before making trading or investment decisions.