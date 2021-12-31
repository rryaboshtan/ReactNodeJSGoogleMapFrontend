import React from 'react';
import '@reach/combobox/styles.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


// const center = {
//   lat: 43.653225,
//   lng: -79.383186,
// }

const MyMapComponent = withScriptjs(
   withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
   ))
);

function App() {
   return (
      <div style={{ width: '100vw', height: '100vh' }}>
         <MyMapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
         />
      </div>
   );
}

export default App;