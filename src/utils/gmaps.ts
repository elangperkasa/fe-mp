let map: google.maps.Map;

export async function initMap(lat: number, lng: number) {
  const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;

  const center = new google.maps.LatLng(lat, lng);

  map = new Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 11,
    mapId: '70a0fe702821572b',
  });
  nearbySearch();
}

async function nearbySearch() {
  const { Place, SearchNearbyRankPreference } = (await google.maps.importLibrary(
    'places'
  )) as google.maps.PlacesLibrary;
  // const { AdvancedMarkerElement } = (await google.maps.importLibrary(
  //   'marker'
  // )) as google.maps.MarkerLibrary;

  // Restrict within the map viewport.
  const center = new google.maps.LatLng(52.369358, 4.889258);

  const request = {
    // required parameters
    fields: ['displayName', 'location', 'businessStatus'],
    locationRestriction: {
      center,
      radius: 500,
    },
    // optional parameters
    includedPrimaryTypes: ['restaurant'],
    maxResultCount: 5,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: 'en-US',
    region: 'us',
  };

  const { places } = await Place.searchNearby(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = (await google.maps.importLibrary('core')) as google.maps.CoreLibrary;
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      // const markerView = new AdvancedMarkerElement({
      //   map,
      //   position: place.location,
      //   title: place.displayName,
      // });

      bounds.extend(place.location as google.maps.LatLng);
      console.log(place);
    });

    map.fitBounds(bounds);
  } else {
    console.log('No results');
  }
}
