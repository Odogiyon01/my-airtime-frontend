import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to Airtime & Data Platform 🚀</p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </div>
  );
}
