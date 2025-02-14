import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

const WalletManagement = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold">Wallet Management</h2>
          <p>Papa Wallet, wallet distribution, fund draining.</p>
        </div>
      </div>
    </div>
  );
};

export default WalletManagement;
