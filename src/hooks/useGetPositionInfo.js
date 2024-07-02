import axios from "axios";
import { useEffect, useState } from "react";

const basURL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function useGetPositionInfo(lat, lng) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async function () {
      try {
        setError("");
        setIsLoading(true);
        const data = await axios.get(
          `${basURL}?latitude=${lat}&longitude=${lng}`
        );
        setData(data.data);
      } catch (error) {
        setError("There Was an error fetching the data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [lat, lng]);

  return { data, isLoading, error };
}

export default useGetPositionInfo;
