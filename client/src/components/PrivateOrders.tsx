import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";

function PrivateOrders(props: any) {
  const [getResult, setGetResult] = useState<[Order, Order][] | null>(null);
  const url = "http://localhost:3001/allOrders";
  const account = props.account;

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
