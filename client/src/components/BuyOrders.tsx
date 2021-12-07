import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";

function BuyOrders() {
  const [getResult, setGetResult] = useState<Order[] | null>(null);
  const url = "http://localhost:3001/buydata";

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
          <div className="redFloat">
            {order.price +
              "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
          </div>
          {order.quantity}
        </li>
      ))
    ) : (
      <p>No orders to show</p>
    );

  return (
    <div className="buyBox">
      <h2 className="sectionHeader">Buy Orders</h2>

      <p>{"Price \u00a0\u00a0\u00a0\u00a0 Quantity"}</p>
      <div className="headerLine" />
      <div className="scroll">
        <p> {listOrders}</p>
      </div>
    </div>
  );
}

export default BuyOrders;
