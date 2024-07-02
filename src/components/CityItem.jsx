import { Link } from "react-router-dom";
import formatDate from "../utils/date-format";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { useCities } from "../context/CitiesContext";
function CityItem({ city }) {
  const { currentCity } = useCities();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const { deleteCity } = useCities();

  const handleDelete = async (e, id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this city?"
    );
    if (!confirm) return;
    e.preventDefault();
    try {
      await deleteCity(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDelete(e, id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};

export default CityItem;
