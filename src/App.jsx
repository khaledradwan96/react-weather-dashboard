// ===== App.jsx =====
import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { WiDayCloudy } from "react-icons/wi";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    const apiKey = "223aedbd1377460cafe02500242806";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.error) throw new Error(data.error.message);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("Cairo");
  }, []);

  return (
    <div className="bg-sky-100 p-10 rounded-2xl min-h-[400px] shadow-xl w-full">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center flex items-center justify-center gap-2">
        <WiDayCloudy className="text-yellow-400 text-4xl" />
        Weather App
      </h1>

      <SearchBox onSearch={handleSearch} loading={loading} />
      <div className="mt-4">
        <WeatherCard data={weatherData} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
