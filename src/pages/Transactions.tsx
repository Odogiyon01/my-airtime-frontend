import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function Transactions() {
  const [txns, setTxns] = useState<any[]>([]);

  async function fetchTxns() {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTxns(data);
  }

  useEffect(() => {
    fetchTxns();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Transactions</h2>
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Type</th>
            <th className="p-2">Details</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {txns.map((t, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{t.type}</td>
              <td className="p-2">{JSON.stringify(t.details)}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{t.createdAt?.toDate ? t.createdAt.toDate().toLocaleString() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
