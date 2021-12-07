import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";

function AggBuy() {
  const [getResult, setGetResult] = useState<Order[] | null>(null);
  const url = "http://localhost:3001/aggregateBuy";

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
}, [getResult]);

  const listOrders =
    getResult != null ? (
      getResult.map((order) => (
        <li className="orderList" key={order.account}>
          <div className="flex">
            <div className="redFloat">
              {order.price +
                "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
            </div>
            {order.quantity}
          </div>
        </li>
      ))
    ) : (
      <p>No orders to show</p>
    );

  return (
    <div className="aggBuy">
      <h3>Buying</h3>
      <div className="headerLine" />

      <p>{"Price \u00a0\u00a0\u00a0\u00a0 Quantity"}</p>
      <div className="scroll">

      <p> {listOrders}</p>
      </div>
    </div>
  );
}

export default AggBuy;
