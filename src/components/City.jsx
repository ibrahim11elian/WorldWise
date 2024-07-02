import { useParams } from "react-router-dom";
import formatDate from "../utils/date-format";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";

function City() {
  const { id } = useParams();

  // get City from API
  const { currentCity, fetchCity, isLoading, error } = useCities();

  useEffect(() => {
    (async function () {
      try {
        await fetchCity(id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null, "long")}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
