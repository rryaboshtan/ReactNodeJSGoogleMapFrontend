import React, { useState, useCallback, useRef } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Search from './components/Search';
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
   const [selected, setSelected] = useState(null);

   const onMapClick = useCallback(event => {
      setMarkers(current => [
         ...current,
         {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
         },
      ]);
   }, []);

   const mapRef = useRef();
   const onMapLoad = useCallback(map => {
      mapRef.current = map;
   }, []);

   const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
   }, [mapRef]);

   const MyMapComponent = withScriptjs(
      withGoogleMap(() => (
         <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 43.653225, lng: -79.383186 }}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
         >
            {markers.map(marker => (
               <Marker
                  key={marker.time.toISOString()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                     url: '/marker.png',
                  }}
                  onClick={() => {
                     setSelected(marker);
                  }}
               ></Marker>
            ))}

            {selected ? (
               <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => {
                     setSelected(null);
                  }}
               >
                  <div>
                     <h2>Bear spotted!</h2>
                  </div>
               </InfoWindow>
            ) : null}
         </GoogleMap>
      ))
   );

   return (
      <div className='map-container'>
         <h1>
            <span>Bears🎪</span>
         </h1>

         <Search panTo={panTo} />
         <MyMapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places,geometry,drawing`}
            loadingElement={<div className='full-size' />}
            containerElement={<div className='full-size' />}
            mapElement={<div className='full-size' />}
            onLoad={onMapLoad}
         />
      </div>
   );
}

export default App;