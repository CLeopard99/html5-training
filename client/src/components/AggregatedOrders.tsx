import AggBuy from "./AggBuy";
import AggSell from "./AggSell";

function AggregatedOrders() {
  return (
    <div className="aggBox">
      <h2 className="sectionHeader">Aggregated Orders</h2>
      <div className="aggLists">
      <AggBuy />
      <AggSell />
      </div>
    </div>
  );
}

export default AggregatedOrders;
