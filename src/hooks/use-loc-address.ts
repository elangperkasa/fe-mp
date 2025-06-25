import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function useLocFromAddress({ address }: { address?: string }) {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | undefined>(undefined);

  const map = useMap();
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLib || !map || !address) return;
    const svc = new placesLib.PlacesService(map);
    svc.textSearch({ query: address }, (a) => {
      const getLatLng = a?.[0].geometry?.location?.toJSON();
      setPosition(getLatLng);
    });
  }, [placesLib, map, address]);

  return position;
}
