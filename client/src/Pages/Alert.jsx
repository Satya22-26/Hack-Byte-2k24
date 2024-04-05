import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationData = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/location_data');
        setLocationData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <div>
      <h1>Location Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        locationData && (
          <div>
            <p>Chat ID: {locationData.chat_id}</p>
            <p>Latitude: {locationData.latitude}</p>
            <p>Longitude: {locationData.longitude}</p>
          </div>
        )
      )}
    </div>
  );
};

export default LocationData;
