import React, { useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import './App.css';
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';

const options = {
   styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
};

function App() {
   const [markers, setMarkers] = useState([]);

   const onMapClick = useCallback(
      event => {
         setMarkers(current => [
            ...current,
            {
               lat: event.latLng.lat(),
               lng: event.latLng.lng(),
               time: new Date(),
            },
         ]);
      },
      [],
   );

   const MyMapComponent = withScriptjs(
      withGoogleMap(() => (
         <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 43.653225, lng: -79.383186 }}
            options={options}
            onClick={onMapClick}
         >
            {markers.map(marker => (
               <Marker
                  key={marker.time.toISOString()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                     url: '/marker.png',
                  }}
               ></Marker>
            ))}
         </GoogleMap>
      ))
   );

   console.log(`Rendering TestC :`);

   return (
      <div className='map-container'>
         <h1>
            <span>Bears🎪</span>
         </h1>
         <MyMapComponent
            // isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places`}
            loadingElement={<div className='full-size' />}
            containerElement={<div className='full-size' />}
            mapElement={<div className='full-size' />}
         />
      </div>
   );
}

export default App;
