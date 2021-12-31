import React, { useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import './App.css';
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';
// const center = {
//   lat: 43.653225,
//   lng: -79.383186,
// }
const options = {
   styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
}

const MyMapComponent = withScriptjs(
   withGoogleMap(props => (
      <GoogleMap
         defaultZoom={8}
         defaultCenter={{ lat: 43.653225, lng: -79.383186 }}
         options={options}
         onClick={event => {
            props.setMarkers(current => [
               ...current,
               {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                  time: new Date(),
               }
               ])
         }
         
         }
      >
         {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
      </GoogleMap>
   ))
);

function App() {
   const [markers, setMarkers] = useState([]);
   return (
      <div className='map-container'>
         <h1>
            <span>Bears🎪</span>
         </h1>
         <MyMapComponent
            // isMarkerShown
            setMarkers={setMarkers}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places`}
            loadingElement={<div className='full-size' />}
            containerElement={<div className='full-size' />}
            mapElement={<div className='full-size' />}
         />
      </div>
   );
}

export default App;