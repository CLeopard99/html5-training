class Matcher {
  // existing orders - buy and sell lists
  sellList = [];
  buyList = [];

  // attempt to match incoming order with existing orders
  matchOrder(order) {
    // compare prices for buy/sell orders, if match, remove from list and pass to orderMatched()
    if (order.action == "buy") {
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
  }
}

/*
orderOne = { account: "one", quantity: 10, price: 80, action: "buy" };
orderTwo = { account: "five", quantity: 20, price: 40, action: "sell" };
matcher = new Matcher();
matcher.matchOrder(orderTwo);
*/

module.exports = Matcher;
