var express = require("express");
var app = express();
app.use(express.json());
const Matcher = require("./matcher").default;
console.log(Matcher)
const matcher = new Matcher();
const port = 3001;

app.use((req, res, next) => {  
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


app.get("/", function (req, res, next) {
  res.status(200).send("Welcome to our restful API");
});

app.get("/aggregateBuy", function (req, res, next) {
    let aggBuy = matcher.aggregateList(matcher.buyList);
    res.status(200).send(aggBuy);
});

app.get("/aggregateSell", function (req, res, next) {
  let aggSell = matcher.aggregateList(matcher.sellList);
  res.status(200).send(aggSell);
});

app.get("/privateorderbook", function (req, res, next) {
  res.status(200).send({ Buy: matcher.buyList, Sell: matcher.sellList });
});

app.get("/tradedata", function (req, res, next) {

  res.status(200).send(matcher.tradeList);
});

app.get("/buydata", function (req, res, next) {
  res.status(200).send(matcher.buyList);
});

app.get("/selldata", function (req, res, next) {
  res.status(200).send(matcher.sellList);
});

app.post("/newtrade", function (post, res) {
 // console.log(post.body);
  matcher.matchOrder(post.body);
  res.status(200).send({Buy_Aggregated: matcher.aggregatedBuyData, Sell_Aggregated: matcher.aggregatedSellData, Buy_List: matcher.buyList, Sell_List: matcher.sellList, Trades: matcher.tradeList});

});
