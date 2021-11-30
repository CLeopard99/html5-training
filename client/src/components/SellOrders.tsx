import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";

function SellOrders() {
  const [getResult, setGetResult] = useState<Order[] | null>(null);
  const url = "http://localhost:3001/selldata";

  useEffect(() => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setGetResult(res);
        });
    } catch (err: any) {
      setGetResult(err.message);
    }
  });

  //  const result = getResult != null ? getResult.length : 0;
  const listOrders =
    getResult != null ? (
      getResult.map((order) => <li className="orderList" key={order.account}><div className="greenFloat">{order.price + "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}</div>{order.quantity}</li>)
    ) : (
      <p>No orders to show</p>
    );

  return (
    <div className="sellBox">
      <h2 className="sectionHeader">Sell Orders</h2>
      <p>{"Price \u00a0\u00a0\u00a0\u00a0 Quantity"}</p> 
      <div className="headerLine"/>
      <p> {listOrders}</p>
    </div>
  );
}
  
  export default SellOrders;
  