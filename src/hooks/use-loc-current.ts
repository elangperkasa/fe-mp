import { useEffect, useState } from 'react';

export function useLocCurrent() {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorGeo: GeolocationPositionError) => {
    if (errorGeo.code === errorGeo.PERMISSION_DENIED) {
      setError('Permission denied for geolocation');
    } else if (errorGeo.code === errorGeo.POSITION_UNAVAILABLE) {
      setError('Position unavailable');
    } else if (errorGeo.code === errorGeo.TIMEOUT) {
      setError('Geolocation request timed out');
    } else {
      setError('An unknown error occurred');
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        const { latitude, longitude } = geoPosition.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      (geoPositionError) => {
        handleError(geoPositionError);
        console.error('Error getting location:', geoPositionError);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000, // Allow using cached location if available
      }
    );
  }, []);

  return { position, error }; // Return both position and error
}
