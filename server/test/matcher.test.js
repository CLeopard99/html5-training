const Matcher = require("../app/matcher");

describe("Matcher", () => {
  let matcher;

  beforeEach(() => {
    matcher = new Matcher();
    matcher.sellList = [
        { account: "one", quantity: 10, price: 30, action: "sell" },
        { account: "two", quantity: 20, price: 50, action: "sell" },
      ];
    
      matcher.buyList = [
        { account: "three", quantity: 20, price: 50, action: "buy" },
        { account: "four", quantity: 10, price: 80, action: "buy" },
      ];
  });

  /**********  Buying orders tests *************/

  it("Order with no matches is added to a list (BUY)", () => {
    const testOrder = {
      account: "one",
      quantity: 20,
      price: 10,
      action: "buy",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.buyList).toContainEqual(testOrder);
  });

  it("First match was perfect quantity (BUY)", () => {
    const testOrder = {
      account: "one",
      quantity: 10,
      price: 30,
      action: "buy",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.sellList).not.toContainEqual({
      account: "one",
      quantity: 10,
      price: 30,
      action: "sell",
    });
    expect(matcher.buyList).not.toContainEqual(testOrder);
  });

  it("Order is partially completed and added to list (BUY)", () => {
    const testOrder = {
      account: "one",
      quantity: 20,
      price: 35,
      action: "buy",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.sellList).not.toContainEqual({
      account: "one",
      quantity: 10,
      price: 30,
      action: "sell",
    });
    expect(matcher.buyList).toContainEqual({
      account: "one",
      quantity: 10,
      price: 35,
      action: "buy",
    });
  });

  it("An existing order is used but not fulfilled (BUY)", () => {
    const testOrder = { account: "one", quantity: 5, price: 40, action: "buy" };
    matcher.matchOrder(testOrder);
    expect(matcher.sellList).toContainEqual({
      account: "one",
      quantity: 5,
      price: 30,
      action: "sell",
    });
    expect(matcher.buyList).not.toContainEqual(testOrder);
  });

  it("Multiple orders are fulfilled by new order (BUY)", () => {
    const testOrder = {
      account: "one",
      quantity: 50,
      price: 80,
      action: "buy",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.sellList).toEqual([]);
    expect(matcher.buyList).toContainEqual({
      account: "one",
      quantity: 20,
      price: 80,
      action: "buy",
    });
  });
});

/********** Selling orders tests *************/

 beforeEach(() => {
    matcher = new Matcher();
    matcher.sellList = [
        { account: "one", quantity: 10, price: 30, action: "sell" },
        { account: "two", quantity: 20, price: 50, action: "sell" },
      ];
    
      matcher.buyList = [
        { account: "three", quantity: 20, price: 50, action: "buy" },
        { account: "four", quantity: 10, price: 80, action: "buy" },
      ];
  });

it("Order with no matches is added to a list (SELL)", () => {
    const testOrder = {
      account: "five",
      quantity: 5,
      price: 100,
      action: "sell",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.sellList).toContainEqual(testOrder);
  });

 

  it("First match was perfect quantity (SELL)", () => {
    const testOrder = {
      account: "five",
      quantity: 20,
      price: 40,
      action: "sell",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.buyList).not.toContainEqual({
      account: "three",
      quantity: 20,
      price: 50,
      action: "buy",
    });
    expect(matcher.sellList).not.toContain(testOrder);
  });

  it("Order is partially completed and added to list (SELL)", () => {
    const testOrder = {
      account: "five",
      quantity: 20,
      price: 70,
      action: "sell",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.buyList).not.toContainEqual({
      account: "four",
      quantity: 10,
      price: 80,
      action: "buy",
    });
    expect(matcher.sellList).toContainEqual({
      account: "five",
      quantity: 10,
      price: 70,
      action: "sell",
    });
  });

  it("An existing order is used but not fulfilled (SELL)", () => {
    const testOrder = { account: "five", quantity: 5, price: 40, action: "sell" };
    matcher.matchOrder(testOrder);
    expect(matcher.buyList).toContainEqual({
      account: "three",
      quantity: 15,
      price: 50,
      action: "buy",
    });
    expect(matcher.sellList).not.toContainEqual(testOrder);
  });

  it("Multiple orders are fulfilled by new order (SELL)", () => {
    const testOrder = {
      account: "five",
      quantity: 40,
      price: 40,
      action: "sell",
    };
    matcher.matchOrder(testOrder);
    expect(matcher.buyList).toEqual([]);
    expect(matcher.sellList).toContainEqual({
      account: "five",
      quantity: 10,
      price: 40,
      action: "sell",
    });
  });
