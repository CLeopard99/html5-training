import React, { useState, useEffect } from "react";
import { Order } from "../../../server/app/matcher";

function TradeHistory() {
  const [getResult, setGetResult] = useState<[Order, Order][] | null>(null);
  const url = "http://localhost:3001/tradedata";

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
  },[getResult]);

  const listTrades =
    getResult != null ? (
      getResult.reverse().map((item) => {
        return item.map((t: Order) => {
          return (
              <tbody>
                <tr>
                  <td>{t.quantity}</td>
                  <td>{t.price}</td>
                  <td>{t.action}</td>
                </tr>
              </tbody>
          );
        });
      })
    ) : (
      <p>No orders to show</p>
    );

  return (
    <div className="historyBox">
      <h2 className="sectionHeader">Trade History</h2>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          
        </thead>
        
        {listTrades} 
      </table>

     
    </div>
  );
}

export default TradeHistory;
