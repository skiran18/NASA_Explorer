import React, { useEffect, useState } from "react";
import { fetchData } from "../services/Api";
import "./HomePage.css";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData("apod")
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {data && (
        <>
          <div className="text-section">
            <h2 className="title">{data.title}</h2>
            <p className="explanation">{data.explanation}</p>
          </div>
          <div className="image-section">
            {data.media_type === "image" ? (
              <img src={data.url} alt={data.title} className="apod-image" />
            ) : (
              <iframe
                src={data.url}
                title={data.title}
                className="apod-video"
                allowFullScreen
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
