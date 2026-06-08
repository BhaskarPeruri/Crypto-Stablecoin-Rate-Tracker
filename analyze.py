import gspread
import pandas as pd
import matplotlib.pyplot as plt
from google.oauth2.service_account import Credentials

SPREADSHEET_ID = "1yWt4TDWNjpJPn1y5IiMM1E6Cp7jOUTdejHoSjZ8ivEI"

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly"
]

# -----------------------------
# Connect to Google Sheets
# -----------------------------
creds = Credentials.from_service_account_file(
    "credentials.json",
    scopes=SCOPES
)

client = gspread.authorize(creds)

sheet = client.open_by_key(SPREADSHEET_ID)

worksheet = sheet.sheet1

data = worksheet.get_all_records()

df = pd.DataFrame(data)

print(f"\nLoaded {len(df)} rows\n")

# -----------------------------
# Convert columns to numeric
# -----------------------------
cols = [
    "CG-CMC USDT Diff",
    "LCW-CMC USDT Diff",
    "CG-CMC USDC Diff",
    "LCW-CMC USDC Diff"
]

for col in cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# -----------------------------
# Absolute errors
# -----------------------------
df["CG_USDT_ERROR"] = df["CG-CMC USDT Diff"].abs()
df["LCW_USDT_ERROR"] = df["LCW-CMC USDT Diff"].abs()

df["CG_USDC_ERROR"] = df["CG-CMC USDC Diff"].abs()
df["LCW_USDC_ERROR"] = df["LCW-CMC USDC Diff"].abs()

# -----------------------------
# Average Errors
# -----------------------------
cg_avg_error = (
    df["CG_USDT_ERROR"].mean() +
    df["CG_USDC_ERROR"].mean()
) / 2

lcw_avg_error = (
    df["LCW_USDT_ERROR"].mean() +
    df["LCW_USDC_ERROR"].mean()
) / 2

print("CoinGecko Avg Error :", round(cg_avg_error, 6))
print("LiveCoinWatch Avg Error :", round(lcw_avg_error, 6))

# -----------------------------
# Accuracy Bar Chart
# -----------------------------
plt.figure(figsize=(8,5))

plt.bar(
    ["CoinGecko", "LiveCoinWatch"],
    [cg_avg_error, lcw_avg_error]
)

plt.ylabel("Average Absolute Error")
plt.title("Provider Accuracy vs CoinMarketCap")

plt.tight_layout()

plt.savefig(
    "accuracy_comparison.png",
    dpi=300
)

print("Saved accuracy_comparison.png")

# -----------------------------
# Winner Pie Chart
# -----------------------------
cg_wins = (
    (
        df["CG_USDT_ERROR"] +
        df["CG_USDC_ERROR"]
    )
    <
    (
        df["LCW_USDT_ERROR"] +
        df["LCW_USDC_ERROR"]
    )
).sum()

lcw_wins = (
    (
        df["LCW_USDT_ERROR"] +
        df["LCW_USDC_ERROR"]
    )
    <
    (
        df["CG_USDT_ERROR"] +
        df["CG_USDC_ERROR"]
    )
).sum()

plt.figure(figsize=(7,7))

plt.pie(
    [cg_wins, lcw_wins],
    labels=["CoinGecko", "LiveCoinWatch"],
    autopct="%1.1f%%"
)

plt.title(
    "Which Provider Is Closer To CoinMarketCap?"
)

plt.savefig(
    "winner_pie_chart.png",
    dpi=300
)

print("Saved winner_pie_chart.png")

# -----------------------------
# USDT Trend
# -----------------------------
plt.figure(figsize=(12,5))

plt.plot(
    df["CG_USDT_ERROR"],
    label="CoinGecko"
)

plt.plot(
    df["LCW_USDT_ERROR"],
    label="LiveCoinWatch"
)

plt.legend()

plt.title(
    "USDT Error vs CoinMarketCap"
)

plt.ylabel(
    "Absolute Error"
)

plt.savefig(
    "usdt_error_trend.png",
    dpi=300
)

print("Saved usdt_error_trend.png")

# -----------------------------
# USDC Trend
# -----------------------------
plt.figure(figsize=(12,5))

plt.plot(
    df["CG_USDC_ERROR"],
    label="CoinGecko"
)

plt.plot(
    df["LCW_USDC_ERROR"],
    label="LiveCoinWatch"
)

plt.legend()

plt.title(
    "USDC Error vs CoinMarketCap"
)

plt.ylabel(
    "Absolute Error"
)

plt.savefig(
    "usdc_error_trend.png",
    dpi=300
)

print("Saved usdc_error_trend.png")

plt.show()