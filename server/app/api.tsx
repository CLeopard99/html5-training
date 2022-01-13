const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
const Matcher = require("./matcher").default;
const matcher = new Matcher();

const { createServer } = require("http");
const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

httpServer.listen(8080, () => {
  console.log(`socket.io server listening on port 8080`);
});

io.on("connection", (socket) => {
  socket.emit("Hello!");

  socket.on("buydata", () => {
    socket.emit("buydataReply", matcher.buyList);
  });

  socket.on("selldata", () => {
    socket.emit("selldataReply", matcher.sellList);
  });

  socket.on("allorders", () => {
    socket.emit("allordersReply", [matcher.buyList, matcher.sellList]);
  });

  socket.on("aggregateBuy", () => {
    let aggBuy = matcher.aggregateList(matcher.buyList);
    socket.emit("aggregateBuyReply", aggBuy);
  });

  socket.on("aggregateSell", () => {
    let aggSell = matcher.aggregateList(matcher.sellList);
    socket.emit("aggregateSellReply", aggSell);
  });

  socket.on("tradedata", () => {
    socket.emit("tradedataReply", matcher.tradeList);
  });

  socket.on("neworder", (body) => {
    matcher.matchOrder(body);

    socket.emit("neworderReply", [
      matcher.aggregatedBuyData,
      matcher.aggregatedSellData,
      matcher.buyList,
      matcher.sellList,
      matcher.tradeList,
      matcher.buyList,
      matcher.sellList,
    ]);
  });
});

/********************************* ********************/

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

// app.get("/", function (req, res, next) {
//   res.status(200).send("Super duper secret message");
// });

// app.get("/aggregateBuy", function (req, res, next) {
//   let aggBuy = matcher.aggregateList(matcher.buyList);
//   res.status(200).send(aggBuy);
// });

// app.get("/aggregateSell", function (req, res, next) {
//   let aggSell = matcher.aggregateList(matcher.sellList);
//   res.status(200).send(aggSell);
// });

// app.get("/tradedata", function (req, res, next) {
//   res.status(200).send(matcher.tradeList);
// });

// app.get("/buydata", function (req, res, next) {
//   res.status(200).send(matcher.buyList);
// });

// app.get("/selldata", function (req, res, next) {
//   res.status(200).send(matcher.sellList);
// });

// app.get("/allOrders", function (req, res, next) {
//   res.status(200).send([matcher.buyList, matcher.sellList]);
// });

// app.post("/newOrder", function (post, res, next) {
//   // console.log(post.body);
//   matcher.matchOrder(post.body);

//   res = {
//     Buy_Aggregated: matcher.aggregatedBuyData,
//     Sell_Aggregated: matcher.aggregatedSellData,
//     Buy_List: matcher.buyList,
//     Sell_List: matcher.sellList,
//     Trades: matcher.tradeList,
//     All_Orders: [matcher.buyList, matcher.sellList],
//   };
// });
