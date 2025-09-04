import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Wallet from "./pages/Wallet";
import Airtime from "./pages/Airtime";
import Data from "./pages/Data";
import Transactions from "./pages/Transactions";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Protected({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/wallet" element={<Protected><Wallet /></Protected>} />
        <Route path="/airtime" element={<Protected><Airtime /></Protected>} />
        <Route path="/data" element={<Protected><Data /></Protected>} />
        <Route path="/transactions" element={<Protected><Transactions /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
