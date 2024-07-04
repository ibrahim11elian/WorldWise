import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import menuIcon from "../assets/menu-icon.svg";
import closeIcon from "../assets/close-icon.svg";

const PageNav = memo(function Nav() {
  const [isOpened, setIsOpened] = useState(false);

  function toggleMenu() {
    setIsOpened(() => !isOpened);
  }
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={isOpened ? `${styles.active}` : ""}>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>

      {isOpened ? (
        <img
          src={closeIcon}
          alt="menu icon"
          className={`${styles.menuIcon} ${styles.closeIcon}`}
          onClick={toggleMenu}
        />
      ) : (
        <img
          src={menuIcon}
          alt="menu icon"
          className={styles.menuIcon}
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
});

export default PageNav;
