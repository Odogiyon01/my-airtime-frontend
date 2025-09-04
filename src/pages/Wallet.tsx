import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function Wallet() {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState("");

  async function fetchBalance() {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/wallet`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBalance(data.balance);
  }

  async function fundWallet() {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/payments/opay/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (data?.data?.cashierUrl) {
      window.location.href = data.data.cashierUrl; // redirect to Opay payment
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Wallet</h2>
      <p className="mt-2">Balance: ₦{balance}</p>
      <div className="mt-4">
        <input
          type="number"
          placeholder="Enter amount"
          className="border p-2 mr-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={fundWallet} className="bg-green-600 text-white px-4 py-2 rounded">
          Fund Wallet
        </button>
      </div>
    </div>
  );
}
