import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";
import { io } from "socket.io-client";
const socket = io("ws://localhost:8080");

function PrivateOrders(props: any) {
  const [getResult, setGetResult] = useState<[Order, Order][] | null>(null);
  const account = props.account;

  useEffect(() => {
    socket.emit("allorders");
    socket.on("allordersReply", (data) => {
      setGetResult(data);
    });
  }, [getResult]);

  const listOrders = 
  account !== "" ? ( 
    getResult != null ? (
      getResult.map((list) => { 
        return list.map((order: Order) => {
        
          if (order.account === account) {
            return (
              <tbody>
                <tr>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>{order.action}</td>
                </tr>
              </tbody>
            );
          }
       
        }); 
      })
    ) : (
      <p>No orders to show</p>
    )
  ) : (
    <p className="loginToView">Login to view orders</p>
  )
  

  return (
    <div className="privateBox">
      <h2 className="sectionHeader"> Private Orders</h2>
      <h3>{account}</h3>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {listOrders}
      </table>
    </div>
  );
}

export default PrivateOrders;
