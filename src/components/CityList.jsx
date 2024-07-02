import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
function CityList() {
  const { cities, isLoading, error, fetchCities } = useCities();

  useEffect(() => {
    (async function () {
      try {
        await fetchCities();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;

  if (!cities.length)
    return (
      <Message
        message={"No cities found, add your first city by clicking on the map"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
