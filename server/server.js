"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

let filteredTickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

let fetchInterval = FETCH_INTERVAL;
let timer;

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

const createStock = (ticker) => {
  return {
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  };
};

function getQuotes(socket) {
  const quotes = filteredTickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//--------------------------

//add route
app.post("/api/tickers", async (req, res) => {
  try {
    await filteredTickers.push(req.body.ticker.toUpperCase());
    const newStock = await createStock(req.body.ticker.toUpperCase());
    res.json({ data: newStock });
  } catch (error) {
    console.log(error);
  }
});
//delete route
app.delete("/api/tickers", async (req, res) => {
  try {
    const newTickers = filteredTickers.filter(
      (item) => item !== req.body.ticker
    );
    filteredTickers = newTickers;
    res.json({ data: req.body.ticker });
  } catch (error) {
    console.log(error);
  }
});
//----------------------
socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });

  socket.on("changeInterval", (newInterval) => {
    clearInterval(timer);
    fetchInterval = newInterval;

    timer = setInterval(function () {
      getQuotes(socket);
    }, fetchInterval);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
