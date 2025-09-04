import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Protected({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
