import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../data/google_data";

const MapContainer = ({item}) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const mapStyles = {
    width: "30%",
    height: "500px",
  };

  const defaultCenter = {
    lat: 48.864716, // Set your initial latitude
    lng: 2.349014, // Set your initial longitude
  };

  const directionsOptions = {
    origin: { lat: 48.864716, lng: 2.349014 },
    destination: { lat: 50.450001, lng: 30.523333 },
    travelMode: "DRIVING",
  };
  const polylineOptions = {
    strokeColor: "red", // Replace with the desired color
    strokeOpacity: 0.1, // Adjust the opacity as needed
    strokeWeight: 20, // Adjust the width of the stroke as needed
  };
  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    try {
          // eslint-disable-next-line no-undef
    // const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: directionsOptions.origin,
      destination: directionsOptions.destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    calculateRoute();
  }, []);
  console.log(directionsResponse);
  return (
<>
<div className="map__info" style={{color:"red"}}>
  Відстань по маршруту : {directionsResponse && directionsResponse.routes[0].legs[0].distance.text}
</div>
<LoadScript
      googleMapsApiKey={GOOGLE_API_KEY} // Replace with your Google Maps API Key
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directionsResponse && (
          <DirectionsService
            directions={directionsResponse}
            options={{
              polylineOptions:polylineOptions
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
</>
  );
};

export default MapContainer;
