import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicGoogleMap from '../components/Map';

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
  }, [locationData]);

  return (
    <div>
      <h1>Location Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        locationData && (
          <DynamicGoogleMap
          latitude = {locationData.latitude}
          longitude = {locationData.longitude}
          />
        )
      )}
    </div>
  );
};

export default LocationData;