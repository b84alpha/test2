import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

const AutoTrading = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold">Auto-Trading</h2>
          <p>Market-making configuration, real-time monitoring, manual override.</p>
        </div>
      </div>
    </div>
  );
};

export default AutoTrading;
