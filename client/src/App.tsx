import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import PrivateOrders from "./components/PrivateOrders";
import AggregatedOrders from "./components/AggregatedOrders";
import BuyOrders from "./components/BuyOrders";
import SellOrders from "./components/SellOrders";
import Visualisations from "./components/Visualisations";
import TradeHistory from "./components/TradeHistory";
import Footer from "./components/Footer";
// import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="app" >
      <Header />
      <div className="mainFlex">
        
        <div className="columnOne">
          <div className="rowOne">
            <OrderForm />
            <div className="publicOrders">
              <AggregatedOrders />
              <div className="listColumns">
                <BuyOrders />
                <SellOrders />
              </div>
            </div>
          </div>

          <div className="rowTwo">
            <PrivateOrders />
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
