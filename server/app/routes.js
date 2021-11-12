var express = require("express");
var app = express();
const Matcher = require("./matcher");
matcher = new Matcher();
const port = 9000;

app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).send("Welcome to our restful API");
});

app.get("/aggregate", function (req, res) {
  res
    .status(200)
    .send(Buy:
        matcher.aggregate(matcher.buyList), Sell:
        matcher.aggregate(matcher.sellList)
    );
});

module.exports = appRouter;
