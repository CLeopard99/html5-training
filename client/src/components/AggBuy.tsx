import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";
import { io } from "socket.io-client";
const socket = io("ws://localhost:8080");

function AggBuy() {
  const [getResult, setGetResult] = useState<Order[] | null>(null);

  useEffect(() => {
    socket.emit("aggregateBuy");
    socket.on("aggregateBuyReply", (data) => {
      setGetResult(data);
    });
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
