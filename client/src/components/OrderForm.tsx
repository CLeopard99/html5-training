import { useState } from "react";

function OrderForm(props: any) {
  const [action, setAction] = useState("Buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const account = props.account;

  // const handleAction = (e: any) => {
  //   setAction(e.target.value);
  // };

  const handleQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    const body = {
      account: account,
      quantity: parseInt(quantity),
      price: parseInt(price),
      action: action,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    //alert(JSON.stringify(body));
    fetch("http://localhost:3001/newtrade", requestOptions).then((response) =>
      response.json()
    );
  };

  const handleRandom = () => {
    for (let i = 0; i < parseInt(quantity); i++) {
      const body = OrderGenerator();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      //alert(JSON.stringify(body));
      fetch("http://localhost:3001/newtrade", requestOptions).then((response) =>
        response.json()
      );
    }
  };

  return (
    <div className="orderColumn">
      <h2 className="sectionHeader">Order Form</h2>

      <form>
        <div className="switch-field">
          <input
            type="radio"
            id="switch_left"
            name="switchToggle"
            value="Buy"
            onClick={() => setAction("Buy")}
          />
          <label htmlFor="switch_left">Buy</label>

          <input
            type="radio"
            id="switch_right"
            name="switchToggle"
            value="Sell"
            onClick={() => setAction("Sell")}
          />
          <label htmlFor="switch_right">Sell</label>
        </div>

        <div className="textInput">
          <label className="label">Quantity</label>
          <input type="number" name="quantity" onChange={handleQuantity} />
          <label className="label">Price</label>
          <input type="number" name="price" onChange={handlePrice} />
        </div>
        <input
          className="submit"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>

      <form className="randomOrders">
        <input
          className="randomNumber"
          type="number"
          name="quantity"
          onChange={handleQuantity}
        />
        <input
          className="randomSubmit"
          type="submit"
          value="Random"
          onClick={handleRandom}
        />
      </form>
    </div>
  );
}

function OrderGenerator() {

  const actions = ["Buy", "Sell"];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const account = "Account " + Math.round(Math.random() * (5 - 1 - 1) + 1);
  const quantity =  Math.round(Math.random() * (50 - 1 - 1) + 1);
  const price =  Math.round(Math.random() * (100 - 1 - 1) + 1);

  const order = {
    "account": account,
    "quantity": quantity,
    "price": price,
    "action": action,
  };

  return order;
}

export default OrderForm;
