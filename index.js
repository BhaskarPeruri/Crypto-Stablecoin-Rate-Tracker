const { appendRow } = require("./sheet");
const axios = require("axios");
require("dotenv").config();

const attempt = 1;
async function fetchCoinGecko() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "tether,usd-coin",
          vs_currencies: "inr",
        },
      },

    );

    return {
      usdtInr: response.data.tether.inr,
      usdcInr: response.data["usd-coin"].inr,
    };
  } catch (error) {
    console.error("CoinGecko Error:", error.message);
    return null;
  }
}

async function fetchLiveCoinWatch() {
  try {
    const response = await axios.post(
      "https://api.livecoinwatch.com/coins/list",
      {
        currency: "INR",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 100,
        meta: true,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.LIVECOINWATCH_API_KEY,
        },
      },
    );

    const usdt = response.data.find((c) => c.code === "USDT");
    const usdc = response.data.find((c) => c.code === "USDC");

    return {
      usdtUsd: usdt?.rate,
      usdcUsd: usdc?.rate,
    };
  } catch (error) {
    console.error("LiveCoinWatch Error:", error.message);
    return null;
  }
}

async function fetchCoinMarketCap() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      {
        params: {
          symbol: "USDT,USDC",
          convert: "INR",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
        },
      },
    );

    return {
      usdtInr: response.data.data.USDT.quote.INR.price,
      usdcInr: response.data.data.USDC.quote.INR.price,
    };
  } catch (error) {
    console.error(
      "CoinMarketCap Error:",
      error.response?.data || error.message,
    );
    return null;
  }
}

async function main() {
  const cg = await fetchCoinGecko();
  const lcw = await fetchLiveCoinWatch();
  const cmc = await fetchCoinMarketCap();

  if (!cg || !lcw || !cmc) {
    console.log("Failed to fetch prices");
    return;
  }

  const now = new Date();

  const date = now.toISOString().split("T")[0];

  const time = now.toLocaleTimeString("en-IN", {
    hour12: false,
  });

  // const usdtDiff = (
  //   cg.usdtInr - lcw.usdtUsd
  // ).toFixed(4);

  // const usdcDiff = (
  //   cg.usdcInr - lcw.usdcUsd
  // ).toFixed(4);

  const cgLcwUsdtDiff = (
    cg.usdtInr - lcw.usdtUsd
  ).toFixed(4);
  
  const cgCmcUsdtDiff = (
    cg.usdtInr - cmc.usdtInr
  ).toFixed(4);
  
  const lcwCmcUsdtDiff = (
    lcw.usdtUsd - cmc.usdtInr
  ).toFixed(4);
  
  const cgLcwUsdcDiff = (
    cg.usdcInr - lcw.usdcUsd
  ).toFixed(4);
  
  const cgCmcUsdcDiff = (
    cg.usdcInr - cmc.usdcInr
  ).toFixed(4);
  
  const lcwCmcUsdcDiff = (
    lcw.usdcUsd - cmc.usdcInr
  ).toFixed(4);

  const row = [
    date,
    time,
    attempt,
  
    // CoinGecko
    cg.usdtInr,
    cg.usdcInr,
  
    // LiveCoinWatch
    lcw.usdtUsd,
    lcw.usdcUsd,
  
    // CoinMarketCap
    cmc.usdtInr,
    cmc.usdcInr,
  
    // USDT Diffs
    cgLcwUsdtDiff,
    cgCmcUsdtDiff,
    lcwCmcUsdtDiff,
  
    // USDC Diffs
    cgLcwUsdcDiff,
    cgCmcUsdcDiff,
    lcwCmcUsdcDiff,
  
    "Success",
    "",
  ];

  await appendRow(row);

  console.log("Row added to sheet");
}

main();
