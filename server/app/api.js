var express = require("express");
var app = express();
app.use(express.json());
const Matcher = require("./matcher");
matcher = new Matcher();
const port = 3001;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


app.get("/", function (req, res) {
  res.status(200).send("Welcome to our restful API");
});

app.get("/aggregateBuy", function (req, res) {
    let aggBuy = matcher.aggregateList(matcher.buyList);
    res.status(200).send(aggBuy);
});

app.get("/aggregateSell", function (req, res) {
  let aggSell = matcher.aggregateList(matcher.sellList);
  res.status(200).send(aggSell);
});

app.get("/privateorderbook", function (req, res) {
  res.status(200).send({ Buy: matcher.buyList, Sell: matcher.sellList });
});

app.get("/tradedata", function (req, res) {

  res.status(200).send(matcher.tradeList);
});

app.get("/buydata", function (req, res) {
  res.status(200).send(matcher.buyList);
});

app.get("/selldata", function (req, res) {
  res.status(200).send(matcher.sellList);
});

app.post("/newtrade", function (post, res) {
 // console.log(post.body);
  matcher.matchOrder(post.body);
  res.status(200).send({Buy_Aggregated: matcher.aggregatedBuyData, Sell_Aggregated: matcher.aggregatedSellData, Buy_List: matcher.buyList, Sell_List: matcher.sellList, Trades: matcher.tradeList});

});
