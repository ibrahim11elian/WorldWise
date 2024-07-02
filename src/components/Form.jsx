// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import useGetPositionInfo from "../hooks/useGetPositionInfo";
import Spinner from "./Spinner";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";
import { convertToEmoji } from "../utils/convertToEmoji";

function Form() {
  const navigate = useNavigate();

  // get the latlng from the URL
  const [lat, lng] = useUrlPosition();

  // Form States
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  // get fetchCities function from the context to update the city list after successful adding city
  const { addCity, isLoading: isAddLoading, error } = useCities();

  // reverse geo code (getting location date from letlng)
  const { data: positionData, isLoading } = useGetPositionInfo(lat, lng);

  // using add hook for creating new city

  useEffect(() => {
    // if successful reverse geo code
    if (positionData) {
      setCityName(positionData.city);
      setCountry(positionData.countryName);
      setEmoji(convertToEmoji(positionData.countryCode));
    }
  }, [positionData]);

  if (isLoading) return <Spinner />;

  if (!lat && !lng) return <Message message={"Start By Clicking On the Map"} />;

  if (error) return <Message message={error} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    try {
      await addCity(newCity);
      // Clear form
      setCityName("");
      setEmoji("");
      setNotes("");
      setCountry("");

      // Navigate to city list
      navigate(`/app/cities`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={`${styles.form} ${isAddLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(() => date)}
          selected={date}
          dateFormat={"dd/MM/yyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSubmit}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
