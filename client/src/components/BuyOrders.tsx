import React, { useState, useEffect } from "react";

function BuyOrders() {

    const [getResult, setGetResult] = useState(null);
    const url = 'http://localhost:3001/buydata';



    useEffect(() => {
        try {
            fetch(url)
                .then(res => res.json())
                .then(res => setGetResult(res))

        } catch (err) {
            setGetResult(err.message);

        }
    })

    return (
        <div className="buyBox">
            <h2 className="sectionHeader">Buy Orders</h2>
            <p> {getResult}</p>
        </div>
    );
}

export default BuyOrders;



