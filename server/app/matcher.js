class Matcher {
  // existing orders and matched orders
  sellList = [
    { account: "one", quantity: 10, price: 30, action: "sell" },
    { account: "two", quantity: 20, price: 50, action: "sell" },
    { account: "one", quantity: 10, price: 30, action: "sell" },
    { account: "two", quantity: 20, price: 50, action: "sell" },
  ];
  buyList = [
    { account: "three", quantity: 20, price: 50, action: "buy" },
    { account: "four", quantity: 10, price: 80, action: "buy" },
    { account: "three", quantity: 20, price: 50, action: "buy" },
    { account: "four", quantity: 10, price: 80, action: "buy" },
  ];
  tradeList = [];
  // orders aggregated by price
  aggregatedBuyData = [];
  aggregatedSellData = [];

  // attempt to match incoming order with existing orders
  matchOrder(order) {
    // compare prices for buy/sell orders, if match, remove from list and pass to orderMatched()
    if (order.action == "buy") {
      //console.log(order);
      for (let i = 0; i < this.sellList.length; i++) {
        if (this.sellList[i].price <= order.price) {
          let matchedOrder = this.sellList[i];
          this.sellList.splice(i, 1);
          this.orderMatched(order, matchedOrder);
          return;
        }
      }
    } else {
      for (let i = 0; i < this.buyList.length; i++) {
        if (this.buyList[i].price >= order.price) {
          let matchedOrder = this.buyList[i];
          this.buyList.splice(i, 1);
          this.orderMatched(order, matchedOrder);
          return;
        }
      }
    }
    // If total order was not matched, add it to corresponding list
    console.log("No matches for this order, order added to list.");
    this.updateOrders(order);

  
  }

  // check quantity between matched orders, update any partially fulfilled orders as necessary
  // if incoming order has quantity leftover, look for another match
  orderMatched(currentOrder, matchedOrder) {
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

    this.tradeList.push({ currentOrder, matchedOrder });
  }

  // push to corresponding lists of orders and sort by highest price for buy, lowest price for sell and how earliest order first
  updateOrders(order) {
    if (order.action == "buy") {
      console.log("Buy order list updated");
      this.buyList.push(order);
      this.buyList.sort((a, b) => (a.price <= b.price ? 1 : -1));
    } else {
      console.log("Sell order list updated");
      this.sellList.push(order);
      this.sellList.sort((a, b) => (a.price >= b.price ? 1 : -1));
    }
    this.aggregatedBuyData = matcher.aggregateList(this.buyList);
    this.aggregatedSellData = matcher.aggregateList(this.sellList);
  }

  // add quantities of same price together
  aggregateList(list) {
    let aggList = [];
    let alist = list;
    for (let i = 0; i < alist.length; i++) { 
      //delete alist[i].account;
      for (let j = i + 1; j < alist.length; j++) {
        if (alist[i].price == alist[j].price) {
          alist[i].quantity += alist[j].quantity;
          alist.splice(j, 1);
          j = j - 1;
        }
      }
     
      aggList.push(alist[i]);
    }
    return aggList;
  }
}

// orderOne = { account: "four", quantity: 30, price: 60, action: "buy" };
// orderTwo = { account: "five", quantity: 20, price: 40, action: "sell" };
// matcher = new Matcher();
// matcher.matchOrder(orderOne);

module.exports = Matcher;
