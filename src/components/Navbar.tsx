import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <Link to="/">Dashboard</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/airtime">Airtime</Link>
      <Link to="/data">Data</Link>
      <Link to="/transactions">Transactions</Link>
    </nav>
  );
}
