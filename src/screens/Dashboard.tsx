import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.tsx";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
export const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div>
      <h1>CODE BYTES DASHBOARD</h1>
      <p>currently logged in as {currentUser.email}</p>
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
};
