import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import { fetchData } from "../../services/Api";
import "./AsteroidTracker.css";

const AsteroidTracker = () => {
  const [neoData, setNeoData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData("neo")
      .then((response) => {
        console.log(response);
        setNeoData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NEO data:", error);
        setLoading(false);
      });
  },[]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!neoData) {
    return <div className="error-message">Error loading NEO data</div>;
  }

  console.log(neoData)
   

  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];

  const chartData = [
    {
      date: todayDate,
      count: neoData.near_earth_objects[todayDate].length,
      hazardous: neoData.near_earth_objects[todayDate].filter(
        (a) => a.is_potentially_hazardous_asteroid
      ).length,
    },
  ];

  return (
    <div className="neo-container">
      {/* Bar Chart Section */}
      <div className="chart-section">
        <h2 className="chart-title">Near Earth Objects Today</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Total NEOs" />
              <Bar dataKey="hazardous" fill="#ef4444" name="Hazardous" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asteroid Details Grid */}
      <div className="asteroid-grid">
        {Object.values(neoData.near_earth_objects)
          .flat()
          .map((asteroid) => (
            <div
              key={asteroid.id}
              className={`asteroid-card ${
                asteroid.is_potentially_hazardous_asteroid ? "hazardous" : ""
              }`}
            >
              <div className="asteroid-header">
                <h3 className="asteroid-name">{asteroid.name}</h3>
                {asteroid.is_potentially_hazardous_asteroid && (
                  <AlertTriangle className="hazard-icon" />
                )}
              </div>
              <div className="asteroid-info">
                <p>
                  <strong>Magnitude:</strong>{" "}
                  {asteroid.absolute_magnitude_h.toFixed(2)}
                </p>
                <p>
                  <strong>Miss Distance:</strong>{" "}
                  {parseInt(
                    asteroid.close_approach_data[0].miss_distance.kilometers
                  ).toLocaleString()}{" "}
                  km
                </p>
                <p>
                  <strong>Velocity:</strong>{" "}
                  {parseInt(
                    asteroid.close_approach_data[0].relative_velocity
                      .kilometers_per_hour
                  ).toLocaleString()}{" "}
                  km/h
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AsteroidTracker;
