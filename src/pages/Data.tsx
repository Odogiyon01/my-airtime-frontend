import { useState } from "react";
import { auth } from "../firebase";

export default function Data() {
  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("");

  async function buyData() {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/purchases/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ network, phone, plan }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Buy Data</h2>
      <input className="border p-2 block my-2" placeholder="Network (e.g. glo)" value={network} onChange={(e) => setNetwork(e.target.value)} />
      <input className="border p-2 block my-2" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="border p-2 block my-2" placeholder="Plan ID (from SMEPlug)" value={plan} onChange={(e) => setPlan(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={buyData}>Purchase</button>
    </div>
  );
}
