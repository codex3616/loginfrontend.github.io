import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../Helper/helper.js";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// custom hook
export default function useFetch(query) {
  //   console.log(query);
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        let username = "";
        if (!query) {
          username = await getUsername();
        }

        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);
        // console.log(`data from custom hook is ${data} and status = ${status}`);

        if (status === 201) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status: status,
          }));
        } else {
          setData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fetchData();
  }, [query]);

  return [getData];
}
