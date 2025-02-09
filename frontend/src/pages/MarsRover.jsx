import React, { useState, useEffect } from "react";
import { fetchData } from "../services/Api";
import "./MarsRover.css";

const MarsRoverSection = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState("ALL");
  const [modalImage, setModalImage] = useState(null);

  const cameraOptions = [
    "ALL",
    "FHAZ",
    "RHAZ",
    "MAST",
    "CHEMCAM",
    "MAHLI",
    "MARDI",
    "NAVCAM",
    "PANCAM",
    "MINITES",
  ];

  useEffect(() => {
    setLoading(true);
    let endpoint = "mars";

    if (selectedCamera !== "ALL") {
      endpoint += `/${selectedCamera}`;
    }

    fetchData(endpoint)
      .then((result) => {
        setPhotos(result.photos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Mars photos:", error);
        setLoading(false);
      });
  }, [selectedCamera]);

  return (
    <div className={`mars-container ${modalImage ? "blurred-background" : ""}`}>
      {/* Camera Filter Dropdown */}
      <div className="filter-section">
        <label htmlFor="camera-filter">Select Camera: </label>
        <select
          id="camera-filter"
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
        >
          {cameraOptions.map((camera) => (
            <option key={camera} value={camera}>
              {camera}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div key={photo.id} className="photo-card" onClick={() => setModalImage(photo.img_src)}>
                <img src={photo.img_src} alt={`Mars Rover ${photo.id}`} />
                <div className="photo-info">
                  <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                  <p><strong>Date:</strong> {photo.earth_date}</p>
                  <p><strong>Rover:</strong> {photo.rover.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No photos available for this camera.</p>
          )}
        </div>
      )}

      {/* Modal Dialog Box */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={() => setModalImage(null)}>×</span>
            <img src={modalImage} alt="Mars Rover" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsRoverSection;
