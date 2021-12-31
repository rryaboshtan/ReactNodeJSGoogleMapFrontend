import React from 'react';
import '@reach/combobox/styles.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import './App.css';
// const center = {
//   lat: 43.653225,
//   lng: -79.383186,
// }

const MyMapComponent = withScriptjs(
   withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
         {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
      </GoogleMap>
   ))
);

function App() {
   return (
      <div class='map-container'>
         <MyMapComponent
            // isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places`}
            loadingElement={<div class='full-size' />}
            containerElement={<div class='full-size' />}
            mapElement={<div class='full-size' />}
         />
      </div>
   );
}

export default App;