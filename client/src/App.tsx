import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import AggregatedOrders from "./components/AggregatedOrders";
import PrivateOrders from "./components/PrivateOrders";
import TradeHistory from "./components/TradeHistory";
// import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="app" >
      <Header />
      <div className="mainFlex">
        <OrderForm />
        <div className="verticalFlex">
        <AggregatedOrders/>
        <PrivateOrders/>
        </div>
        <TradeHistory/>
      </div>
      <div className="footer">
        
    </div>
    </div>
  );
}

export default App;
