import { createContext, useCallback, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CitiesContext = createContext();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

const citiesReducer = (state, action) => {
  switch (action.type) {
    case "CITIES_LOADED":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };

    case "CITY_LOADED":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };

    case "CITY_DELETED":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "CITY_ADDED":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };

    default:
      throw new Error("This function not Exist");
  }
};

export default function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(citiesReducer, initialState);

  const addCity = useCallback(async function (newCity) {
    try {
      dispatch({ type: "LOADING" });
      const response = await axios.post(`${baseURL}/cities`, newCity);
      dispatch({ type: "CITY_ADDED", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "There was an error adding the city.",
      });
    }
  }, []);

  const fetchCity = useCallback(
    async function (id) {
      if (parseInt(id) === state.currentCity.id) return;
      try {
        dispatch({ type: "LOADING" });

        const data = await axios.get(`${baseURL}/cities/${id}`);
        dispatch({ type: "CITY_LOADED", payload: data.data });
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: "There was an error fetching the city data",
        });
      }
    },
    [state.currentCity.id]
  );

  const deleteCity = useCallback(async function (id) {
    try {
      dispatch({ type: "LOADING" });

      await axios.delete(`${baseURL}/cities/${id}`);
      dispatch({ type: "CITY_DELETED", payload: id });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "There was an error deleting the city.",
      });
    }
  }, []);

  const fetchCities = useCallback(async function () {
    try {
      dispatch({ type: "LOADING" });

      const data = await axios.get(`${baseURL}/cities`);
      dispatch({ type: "CITIES_LOADED", payload: data.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "There was an error fetching the cities",
      });
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        ...state,
        fetchCity,
        fetchCities,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("Cities context was used outside it's provider");
  }

  return context;
}
