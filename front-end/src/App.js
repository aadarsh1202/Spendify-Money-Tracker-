import { Routes, Route } from "react-router-dom";
import MyAccount from "./pages/components/MyAccount";
import Wallet from "./pages/components/Wallet";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Report from "./pages/Report";
import Transaction from "./pages/Transactions";

function App() {
  return (
    <div>
      {/* <Login/> */}

      <Routes>
        <Route path="/" exact="false" element={<Login />} />
        <Route path="/home" exact="false" element={<Home />} />
        <Route path="/transactions" exact="false" element={<Transaction />} />
        <Route path="/report" exact="false" element={<Report />} />
        <Route path="/wallet" exact="false" element={<Wallet />} />
        <Route path="/myaccount" exact="false" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
