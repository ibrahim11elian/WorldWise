import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar({ isOpened }) {
  return (
    <div className={`${styles.sidebar} ${isOpened ? styles.active : ""}`}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

Sidebar.propTypes = {
  isOpened: PropTypes.bool.isRequired,
};

export default Sidebar;
