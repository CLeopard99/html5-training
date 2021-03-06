export class Order {
  account: string;
  quantity: number;
  price: number;
  action: "Buy" | "Sell";

  constructor(
    account: string,
    quantity: number,
    price: number,
    action: "Buy" | "Sell"
  ) {
    this.account = account;
    this.quantity = quantity;
    this.price = price;
    this.action = action;
  }
}

class Matcher {
  // existing orders and matched orders
  sellList: Order[] = [
    { account: "Account 1", quantity: 10, price: 30, action: "Sell" },
    { account: "Account 1", quantity: 20, price: 30, action: "Sell" },
    { account: "Account 2", quantity: 10, price: 50, action: "Sell" },
    { account: "Account 3", quantity: 20, price: 50, action: "Sell" },
  ];

  buyList: Order[] = [
    { account: "Account 1", quantity: 20, price: 80, action: "Buy" },
    { account: "Account 2", quantity: 10, price: 80, action: "Buy" },
    { account: "Account 2", quantity: 20, price: 50, action: "Buy" },
    { account: "Account 3", quantity: 10, price: 50, action: "Buy" },
  ];

  tradeList: [Order, Order][] = []; //{Order, Order}
  // orders aggregated by price
  aggregatedBuyData: Order[] = [];
  aggregatedSellData: Order[] = [];

  // attempt to match incoming order with existing orders
  matchOrder(order: Order) {
    // compare prices for buy/sell orders, if match, remove from list and pass to orderMatched()
    if (order.action == "Buy") {
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
  orderMatched(currentOrder: Order, matchedOrder: Order) {
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
      console.log("Order partially fulfilled, searching for another match.");
      this.matchOrder(currentOrder);
    }

    this.tradeList.push([currentOrder, matchedOrder]);
  }

  // push to corresponding lists of orders and sort by highest price for buy, lowest price for sell and how earliest order first
  updateOrders(order: Order) {
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
  }

  // add quantities of same price together
  aggregateList(list: Order[]) {
    var aggList = [];
    var alist = [...list];
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
  }
}

// orderOne = { account: "four", quantity: 30, price: 60, action: "buy" };
// orderTwo = { account: "five", quantity: 20, price: 40, action: "sell" };
// matcher = new Matcher();
// matcher.matchOrder(orderOne);

export default Matcher;
