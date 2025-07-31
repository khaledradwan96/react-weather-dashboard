// ===== WeatherCard.jsx =====
import React from "react";

function WeatherCard({ data, loading, error }) {
  if (loading) {
    return (
      <div className="mt-6 p-6 bg-white/30 rounded-2xl shadow flex justify-center items-center">
        <div className="text-blue-600 font-medium">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-6 bg-red-100 rounded-2xl shadow text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const {
    location: { name, country, localtime },
    current: {
      temp_c,
      humidity,
      wind_kph,
      pressure_mb,
      condition: { text, icon },
    },
  } = data;

  const iconUrl = icon.startsWith("//") ? `https:${icon}` : icon;

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl shadow-xl text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-1 text-blue-800">
        {name}, {country}
      </h2>
      <p className="text-sm text-gray-500 mb-3">{localtime}</p>

      <div className="flex flex-col items-center justify-center mb-4">
        <img src={iconUrl} alt={text} />
        <p className="text-5xl font-bold text-gray-800">{temp_c}°C</p>
        <p className="text-lg text-gray-600 capitalize">{text}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{wind_kph} km/h</p>
        </div>
        <div>
          <p className="font-semibold">Pressure</p>
          <p>{pressure_mb} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
