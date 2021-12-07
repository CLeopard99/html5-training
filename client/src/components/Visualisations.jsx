import * as d3 from "d3";
import { useCallback, useEffect, useState, useRef } from "react";

function Visualisations() {
  const [buyData, setBuyData] = useState([
    { account: "default", quantity: 1, price: 1, action: "Buy" },
  ]);
  const [sellData, setSellData] = useState([
    { account: "default", quantity: 1, price: 1, action: "Sell" },
  ]);

  const urlBuy = "http://localhost:3001/buydata";
  const urlSell = "http://localhost:3001/selldata";

  useEffect(() => {
    try {
      fetch(urlBuy)
        .then((res) => res.json())
        .then((res) => {
          setBuyData(res);
        });
    } catch (err) {
      setSellData(err.message);
    }
  }, [buyData]);

  useEffect(() => {
    try {
      fetch(urlSell)
        .then((res) => res.json())
        .then((res) => {
          setSellData(res);
        });
    } catch (err) {
      setSellData(err.message);
    }
  }, [sellData]);

  //  for buy: orders at that price or more - get buy, sort by price ascending, if price above is more, add quantity to current, if same then add quantity and remove element
  //  for sell: orders at that price or less

  buyData.sort(function (a, b) {
    return a.price > b.price ? 1 : -1;
  });
  sellData.sort(function (a, b) {
    return a.price < b.price ? 1 : -1;
  });

  const buyCumul = [];
  const sellCumul = [];

  let tempData = [...buyData];
  for (let i = 0; i < tempData.length; i++) {
    tempData[i] = JSON.parse(JSON.stringify(tempData[i]));
    for (var j = i + 1; j < tempData.length; j++) {
      if (tempData[i].price <= tempData[j].price) {
        tempData[i].quantity += tempData[j].quantity;
        if (tempData[i].price == tempData[j].price) {
          tempData.splice(j, 1);
          j = j - 1;
        }
      }
    }
    buyCumul.push({ price: tempData[i].price, quantity: tempData[i].quantity });
  }

  
tempData = [...sellData];
  for (let i = 0; i < tempData.length; i++) {
    tempData[i] = JSON.parse(JSON.stringify(tempData[i]));
    for (var j = i + 1; j < tempData.length; j++) {
      if (tempData[i].price >= tempData[j].price) {
        tempData[i].quantity += tempData[j].quantity;
        if (tempData[i].price == tempData[j].price) {
          tempData.splice(j, 1);
          j = j - 1;
        }
      }
    }
    sellCumul.push({ price: tempData[i].price, quantity: tempData[i].quantity });
  }


  const height = 800;
  const width = 1600;
  const svgRef = useRef();

  const drawChartMemoized = useCallback(drawChart, [
    buyCumul,
    sellCumul,
    width,
    height,
  ]);

  useEffect(() => {
    drawChartMemoized();
  }, [sellCumul, buyCumul, drawChartMemoized]);

  function drawChart() {
    // Remove all of the elements we drew last time
    d3.select(svgRef.current).selectAll("*").remove();

    // Initialise constants
    const margin = { top: 30, left: 70, bottom: 70, right: 40 };
    const allData = sellCumul.concat(buyCumul);
    const xMinValue = d3.min(allData, (d) => d.price);
    const xMaxValue = d3.max(allData, (d) => d.price);
    const yMinValue = 0;
    const yMaxValue = d3.max(allData, (d) => d.quantity);

    // Initialise SVG and drawArea
    const svg = d3
      .select(svgRef.current)
      .style("font-size", "30px")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const drawArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialise scaling functions
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([xMinValue, xMaxValue]);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

    // Add axes to drawArea
    drawArea
      .append("g")
      .attr("class", "x-axis")
      .style("font-size", "25px")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    drawArea
      .append("g")
      .attr("class", "y-axis")
      .style("font-size", "25px")
      .call(d3.axisLeft(yScale).tickSizeOuter(0));

    // Add areas to drawArea
    const area = d3
      .area()
      .x((d) => xScale(d.price))
      .y0(height)
      .y1((d) => yScale(d.quantity));

    drawArea
      .append("path")
      .datum(buyCumul)
      .attr("fill", "#e64141bd")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", area);

    drawArea
      .append("path")
      .datum(sellCumul)
      .attr("fill", "#85ff6caa")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", area);

    drawArea
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 3)
      .style("text-anchor", "middle")
      .style("fill", "#f0fff0")
      .text("Price");

    drawArea
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .style("text-anchor", "middle")
      .style("fill", "#f0fff0")
      .text("Quantity");
  }

  const listOrders =
    sellCumul != null ? (
      sellCumul.map((order) => (
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
    <div className="visualisations">
      <h2 className="sectionHeader">Graphs</h2>
      <div className="d3Chart">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          style={{
            width: "100%",
            height: "100%",
            padding: "10px",
          }}
        />
        {/* <p>{listOrders}</p> */}
      </div>
    </div>
  );
}

export default Visualisations;
