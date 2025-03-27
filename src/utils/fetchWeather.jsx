import axios from "axios";
import { API_URL, city } from "./helper";
import { toast } from "react-toastify";

export const fetchWeather = async () => {
  try {
    const response = await axios.get(
      API_URL + "q=" + city + "&appid=" + import.meta.env.VITE_API_KEY
    );
    return {
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
    };
  } catch (err) {
    toast("Unable to fetch weather conditions");
    // console.error("Weather API Error:", err);
    throw err;
  }
};

export default fetchWeather;
