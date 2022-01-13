import { useState } from "react";
import Select from "react-select";
import OrderForm from "./components/OrderForm";
import PrivateOrders from "./components/PrivateOrders";
import AggregatedOrders from "./components/AggregatedOrders";
import BuyOrders from "./components/BuyOrders";
import SellOrders from "./components/SellOrders";
import Visualisations from "./components/Visualisations";
import TradeHistory from "./components/TradeHistory";
import Footer from "./components/Footer";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

function App() {
  const options = [
    { value: "Account 1", label: "Account 1" },
    { value: "Account 2", label: "Account 2" },
    { value: "Account 3", label: "Account 3" },
    { value: "Account 4", label: "Account 4" },
  ];
  
  const [accountSelected, setAccountSelect] = useState(options[0]);
  const [account, setAccount] = useState("");
  const logStatus = account != "" ? "Logout" : "Login";

  const handleAccountSelect = (account: any) => {
    setAccountSelect(account);
  };
  const handleLogin = () => {
    if (logStatus == "Logout") setAccount("");
    else setAccount(accountSelected.value);
  };

  return (
    <div className="app">
      <div className="header">
        <h2 className="mintplinth">MintPlinth</h2>

        <input
          className="accountSubmit"
          type="submit"
          value={logStatus}
          onClick={handleLogin}
        />
        <Select
          value={accountSelected}
          className="accountSelect"
          options={options}
          onChange={handleAccountSelect}
        />
      </div>

      <div className="mainFlex">
        <div className="columnOne">
          <div className="rowOne">
            <OrderForm account={account} />
            <div className="publicOrders">
              <AggregatedOrders />
              <div className="listColumns">
                <BuyOrders />
                <SellOrders />
              </div>
            </div>
          </div>

          <div className="rowTwo">
            <PrivateOrders account={account} />
            <Visualisations />
          </div>
        </div>

        <div className="columnTwo">
          <TradeHistory />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
