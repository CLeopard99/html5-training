"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
exports.Order = void 0;
var Order = /** @class */ (function () {
  function Order(account, quantity, price, action) {
    this.account = account;
    this.quantity = quantity;
    this.price = price;
    this.action = action;
  }
  return Order;
})();
exports.Order = Order;
var Matcher = /** @class */ (function () {
  function Matcher() {
    // existing orders and matched orders
    this.sellList = [

    ];
    this.buyList = [
 
    ];
    this.tradeList = []; //{Order, Order}
    // orders aggregated by price
    this.aggregatedBuyData = [];
    this.aggregatedSellData = [];
  }

  // attempt to match incoming order with existing orders
  Matcher.prototype.matchOrder = function (order) {
    // compare prices for buy/sell orders, if match, remove from list and pass to orderMatched()
    if (order.action == "Buy") {
      //console.log(order);
      for (var i = 0; i < this.sellList.length; i++) {
        if (this.sellList[i].price <= order.price) {
          var matchedOrder = this.sellList[i];
          this.sellList.splice(i, 1);
          this.orderMatched(order, matchedOrder);
          return;
        }
      }
    } else {
      for (var i = 0; i < this.buyList.length; i++) {
        if (this.buyList[i].price >= order.price) {
          var matchedOrder = this.buyList[i];
          this.buyList.splice(i, 1);
          this.orderMatched(order, matchedOrder);
          return;
        }
      }
    }
    // If total order was not matched, add it to corresponding list
    console.log("No matches for this order, order added to list.");
    this.updateOrders(order);
  };

  // check quantity between matched orders, update any partially fulfilled orders as necessary
  // if incoming order has quantity leftover, look for another match
  Matcher.prototype.orderMatched = function (currentOrder, matchedOrder) {
    if (matchedOrder.quantity == currentOrder.quantity)
      console.log("Both orders fulfilled!");
    else if (matchedOrder.quantity > currentOrder.quantity) {
      matchedOrder.quantity = Math.abs(
        matchedOrder.quantity - currentOrder.quantity
      );
      console.log("Order fulfiled, leftovers updated.");
      this.updateOrders(matchedOrder);
    } else {
      currentOrder.quantity = Math.abs(
        currentOrder.quantity - matchedOrder.quantity
      );
      console.log("Order partially fulfiled, searching for another match.");
      this.matchOrder(currentOrder);
    }
    this.tradeList.push([currentOrder, matchedOrder]);
  };

  // push to corresponding lists of orders and sort by highest price for buy, lowest price for sell and how earliest order first
  Matcher.prototype.updateOrders = function (order) {
    if (order.action == "Buy") {
      console.log("Buy order list updated");
      this.buyList.push(order);
      this.buyList.sort(function (a, b) {
        return a.price < b.price ? 1 : -1;
      });
      this.aggregatedBuyData = this.aggregateList(this.buyList);
    } else if (order.action == "Sell") {
      console.log("Sell order list updated");
      this.sellList.push(order);
      this.sellList.sort(function (a, b) {
        return a.price > b.price ? 1 : -1;
      });
      this.aggregatedSellData = this.aggregateList(this.sellList);
    }
  };

  Matcher.prototype.aggregateList = function (list) {
    var aggList = [];
    var alist = __spreadArray([], list, true);

    if (alist[0].action == "Sell") {
      for (var i = 0; i < alist.length; i++) {
        //delete alist[i].account;
        alist[i] = JSON.parse(JSON.stringify(alist[i]));
        for (var j = i + 1; j < alist.length; j++) {
          if (alist[i].price <= alist[j].price) {
            alist[i].quantity += alist[j].quantity;
            if (alist[i].price == alist[j].price) {
              alist.splice(j, 1);
              j = j - 1;
            }
          }
        }
        aggList.push(alist[i]);
      }
    } else {
      for (var i = 0; i < alist.length; i++) {
        //delete alist[i].account;
        alist[i] = JSON.parse(JSON.stringify(alist[i]));
        for (var j = i + 1; j < alist.length; j++) {
          if (alist[i].price >= alist[j].price) {
            alist[i].quantity += alist[j].quantity;
            if (alist[i].price == alist[j].price) {
              alist.splice(j, 1);
              j = j - 1;
            }
          }
        }
        aggList.push(alist[i]);
      }
    }
    return aggList;
  };

  return Matcher;
})();
// orderOne = { account: "four", quantity: 30, price: 60, action: "Buy" };
// orderTwo = { account: "five", quantity: 20, price: 40, action: "Sell" };
// matcher = new Matcher();
// matcher.matchOrder(orderOne);
exports["default"] = Matcher;
