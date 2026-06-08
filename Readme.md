# Crypto Stablecoin Rate Tracker & Analytics

A Node.js and Python-based application that fetches real-time **USDT** and **USDC** exchange rates from multiple providers, stores the results in Google Sheets, and generates visual analytics to determine which free provider most closely matches CoinMarketCap pricing.

---

# 🚀 Features

## Data Collection

Fetches **USDT → INR** and **USDC → INR** rates from:

* CoinGecko
* LiveCoinWatch
* CoinMarketCap

Stores all collected data in Google Sheets for historical tracking and analysis.

## Analytics Dashboard

Generates visual reports directly from Google Sheets data:

* Provider Accuracy Comparison
* CoinGecko vs LiveCoinWatch Performance
* USDT Error Trend Analysis
* USDC Error Trend Analysis
* Provider Win Percentage Analysis

## Historical Tracking

Tracks:

* Stablecoin prices over time
* Provider deviations
* Pricing consistency
* Accuracy against CoinMarketCap

---

# 📊 Data Sources

## CoinGecko

* USDT → INR
* USDC → INR

## LiveCoinWatch

* USDT → INR
* USDC → INR

## CoinMarketCap

* USDT → INR
* USDC → INR

---

# 📈 Metrics Tracked

Each execution stores the following information in Google Sheets:

| Field                  | Description                    |
| ---------------------- | ------------------------------ |
| Date                   | Execution Date                 |
| Time                   | Execution Time                 |
| Attempt Number         | Current Run Count              |
| CoinGecko USDT→INR     | CoinGecko Price                |
| CoinGecko USDC→INR     | CoinGecko Price                |
| LiveCoinWatch USDT→INR | LiveCoinWatch Price            |
| LiveCoinWatch USDC→INR | LiveCoinWatch Price            |
| CoinMarketCap USDT→INR | CoinMarketCap Price            |
| CoinMarketCap USDC→INR | CoinMarketCap Price            |
| CG-LCW USDT Diff       | CoinGecko vs LiveCoinWatch     |
| CG-CMC USDT Diff       | CoinGecko vs CoinMarketCap     |
| LCW-CMC USDT Diff      | LiveCoinWatch vs CoinMarketCap |
| CG-LCW USDC Diff       | CoinGecko vs LiveCoinWatch     |
| CG-CMC USDC Diff       | CoinGecko vs CoinMarketCap     |
| LCW-CMC USDC Diff      | LiveCoinWatch vs CoinMarketCap |
| Status                 | Success / Failure              |

---

# 🏗 Project Structure

```text
.
├── index.js
├── sheet.js
├── analyze.py
├── credentials.json
├── .env
├── package.json
├── README.md
├── node_modules/
└── venv/
```

---

# 🛠 Installation

## Clone Repository

```bash
git clone https://github.com/BhaskarPeruri/Crypto-Stablecoin-Rate-Tracker

cd Currency_Rates
```

## Install Node.js Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
LIVECOINWATCH_API_KEY=YOUR_LIVECOINWATCH_API_KEY
COINMARKETCAP_API_KEY=YOUR_COINMARKETCAP_API_KEY
```

---

# 📄 Google Sheets Setup

## 1. Create Google Cloud Project

Create a project in Google Cloud Console.

## 2. Enable Google Sheets API

Enable:

* Google Sheets API

## 3. Create Service Account

Generate a Service Account JSON key.

## 4. Save Credentials

Place the downloaded file in the project root:

```text
credentials.json
```

## 5. Share Spreadsheet

Grant Editor access to the Service Account email address.

---

# ▶️ Running Data Collection

Execute:

```bash
node index.js
```

This will:

* Fetch CoinGecko data
* Fetch LiveCoinWatch data
* Fetch CoinMarketCap data
* Calculate differences
* Append a new row to Google Sheets

---

# 📊 Analytics Setup

## Create Python Virtual Environment

```bash
python3 -m venv venv
```

## Activate Virtual Environment

macOS / Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

You should see:

```bash
(venv)
```

in your terminal.

---

## Install Analytics Dependencies

```bash
pip install pandas matplotlib gspread google-auth
```

---

# 📈 Generate Analytics Reports

Run:

```bash
python3 analyze.py
```

The script automatically:

* Reads historical data from Google Sheets
* Calculates average provider error
* Compares providers against CoinMarketCap
* Generates visualization charts

---

# 📁 Generated Reports

The analytics script creates:

```text
accuracy_comparison.png
winner_pie_chart.png
usdt_error_trend.png
usdc_error_trend.png
```

## accuracy_comparison.png

Shows average absolute error against CoinMarketCap.

Lower value = More accurate provider.

## winner_pie_chart.png

Shows how often each provider was closer to CoinMarketCap.

## usdt_error_trend.png

USDT accuracy trend over time.

## usdc_error_trend.png

USDC accuracy trend over time.

---

# 🛑 Exit Virtual Environment

When finished:

```bash
deactivate
```

---

# 🔄 Future Usage

Whenever new rows are added to Google Sheets:

```bash
cd Currency_Rates

source venv/bin/activate

python3 analyze.py
```

The latest Google Sheet data will automatically be fetched and all charts regenerated.

---

# 🔒 Security

Never commit:

```text
.env
credentials.json
node_modules/
venv/
```

Ensure these files are included in `.gitignore`.

---

# 📌 Use Cases

* Stablecoin price monitoring
* Provider accuracy benchmarking
* CoinGecko vs LiveCoinWatch comparison
* CoinMarketCap validation
* Historical price analysis
* Analytics and reporting
* Arbitrage opportunity monitoring

---

# Disclaimer

This project is intended for educational, monitoring, and analytical purposes only.

Exchange rates may differ across providers and should not be considered financial advice. Always verify rates directly from official sources before making trading or investment decisions.
