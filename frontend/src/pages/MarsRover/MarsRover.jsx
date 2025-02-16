import React, { useState, useEffect } from "react";
import "./MarsRover.css";
import { fetchData } from "../../services/Api";

const MarsRover = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
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
    if (!submitted) {
      setLoading(false);
      return;
    }

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
  }, [selectedCamera, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
  };

  const handleCamera = (event) => {
    const newCamera = event.target.value;
    setSelectedCamera(newCamera);
  };

  return (
    <div className={`mars-travel-container ${!submitted ? "blurred" : ""}`}>
      {!submitted && (
        <div className="dialog-box">
          <form onSubmit={handleSubmit} className="boarding-pass-form">
            <h2>Get Your Mars Boarding Pass</h2>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button type="submit">Launch 🚀</button>
          </form>
        </div>
      )}

      {loading && (
        <div className="loading-animation">
          <div className="rocket"></div>
          <p>Launching to Mars...</p>
        </div>
      )}

      {!loading && submitted && (
        <div>
          <div className="boarding-pass-container">
            <div className="boarding-pass">
              <div className="boarding-pass-header">🚀 MARS BOARDING PASS</div>
              <div className="boarding-pass-body">
                <div className="passenger-details">
                  <p>
                    <strong>Passenger:</strong> {name}
                  </p>
                  <p>
                    <strong>Departure:</strong> 2025
                  </p>
                  <p>
                    <strong>From:</strong> {location}
                  </p>
                  <p>
                    <strong>Destination:</strong> Mars
                  </p>
                </div>
                <div className="barcode"></div>
                <p>Explore mars using different cameras</p>
              </div>
            </div>
          </div>

          <div className="mars-header">
            <h2 className="mars-title">📸 Mars Gallery</h2>
            <div className="filter-section">
              <label htmlFor="camera-filter">Select Camera: </label>
              <select
                id="camera-filter"
                value={selectedCamera}
                onChange={(e) => handleCamera(e)}
              >
                {cameraOptions.map((camera) => (
                  <option key={camera} value={camera}>
                    {camera}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mars-photos">
            <div className="photo-grid">
              {photos.length > 0 ? (
                photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="photo-card"
                    onClick={() => setModalImage(photo.img_src)}
                  >
                    <img src={photo.img_src} alt={`Mars Rover ${photo.id}`} />
                    <div className="photo-info">
                      <p>
                        <strong>Camera:</strong> {photo.camera.full_name}
                      </p>
                      <p>
                        <strong>Date:</strong> {photo.earth_date}
                      </p>
                      <p>
                        <strong>Rover:</strong> {photo.rover.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">
                  No photos available for this camera.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={() => setModalImage(null)}>
              ×
            </span>
            <img src={modalImage} alt="Mars Rover" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsRover;
