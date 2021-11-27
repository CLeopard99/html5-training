import React, { useState } from "react";

function OrderForm() {
  const [action, setAction] = useState("Buy");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const handleAction = (e: any) => {
    setAction(e.target.value);
  };

  const handleQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };

  const orderTest = () => {
    alert("Action " + action + " Quantity " + quantity + " price: " + price);
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
            onClick={() => handleAction}
            checked
          />
          <label htmlFor="switch_left">Buy</label>

          <input
            type="radio"
            id="switch_right"
            name="switchToggle"
            value="Sell"
            onClick={() => handleAction}
          />
          <label htmlFor="switch_right">Sell</label>
        </div>

        <div className="textInput">
          <label className="label">Quantity</label>
          <input type="number" name="quantity" onChange={handleQuantity} />
          <label className="label">Price</label>
          <input type="number" name="price" onChange={handlePrice} />
        </div>
        <input className="submit" type="submit" value="Submit" onClick={orderTest}/>
      </form>
    </div>
  );
}

export default OrderForm;
