import { useEffect, useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import listIcon from "../assets/list-icon.svg";
function AppLayout() {
  const [isOpened, setIsOpened] = useState(true);

  const handleToggleList = () => {
    setIsOpened(() => !isOpened);
  };
  berpuss;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 992 && !isOpened) {
        setIsOpened(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpened]);

  return (
    <main className={styles.app}>
      <div className={styles.icon}>
        <img src={listIcon} alt="list icon" onClick={handleToggleList} />
      </div>
      {isOpened && <Sidebar isOpened={isOpened} />}
      <Map />
      <User />
    </main>
  );
}

export default AppLayout;
