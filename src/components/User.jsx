import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const navigate = useNavigate();
  const { name, avatar, logout } = useAuth();

  function handleClick() {
    logout();
    // Navigate to login
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={name} />
      <span>Welcome, {name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
