import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <main className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </main>
  );
}

export default AppLayout;
