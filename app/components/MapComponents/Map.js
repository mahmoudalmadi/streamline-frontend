import React, { useEffect, useRef } from "react";

const Map = ({location}) => {
  const mapRef = useRef(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your actual Google Maps API key

  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize the map after the script has loaded
    window.initMap = () => {
      const location = { lat: 40.748817, lng: -73.985428 }; // Replace with your location coordinates
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        mapTypeControl:false,
        styles: [
            {
              featureType: "road",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }], // Hides public transport information
              },
          ],
      });
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Our Address",
      });
    };

    return () => {
      // Cleanup: remove script and initMap function
      delete window.initMap;
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return (
    <div className="flex flex-col ">
      <h3 className=" font-semibold mb-[10px] text-[18px]
      ">Our Location</h3>
      <div
        ref={mapRef}
        className="w-full h-[350px] rounded-lg shadow-lg border border-gray-300"
      ></div>
      <h3 className="  mt-[12px] text-[18px]
      ">115 Haynes Ave</h3>
      <h3 className="  text-[18px]
      ">Toronto, Ontario M3J0L8</h3>
    </div>
  );
};

export default Map;
