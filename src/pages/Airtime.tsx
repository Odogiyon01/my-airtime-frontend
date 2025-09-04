import { useState } from "react";
import { auth } from "../firebase";

export default function Airtime() {
  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  async function buyAirtime() {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/purchases/airtime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ network, phone, amount }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Buy Airtime</h2>
      <input className="border p-2 block my-2" placeholder="Network (e.g. mtn)" value={network} onChange={(e) => setNetwork(e.target.value)} />
      <input className="border p-2 block my-2" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="border p-2 block my-2" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={buyAirtime}>Purchase</button>
    </div>
  );
}
