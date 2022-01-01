import React, { useState, useCallback, useRef } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Apartment from './components/Apartment';
// import Search from './components/Search';
import './App.css';
// import '@reach/combobox/styles.css';
// import data from './skateboard-parks.js'
// import mapStyles from './mapStyles';

const markerImage = '/blueCircle.png';
const options = {
   // styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
};

const center = {
   lat: 50.4293321294912,
   lng: 30.452419950074063,
}

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
            icon: markerImage,
         },
      ]);
   }, []);

   // const mapRef = useRef();
   // const onMapLoad = useCallback(map => {
   //    mapRef.current = map;
   // }, []);

   // const panTo = useCallback(({ lat, lng }) => {
   //    mapRef.current.panTo({ lat, lng });
   //    mapRef.current.setZoom(14);
   // }, []);

   const MyMapComponent = withScriptjs(
      withGoogleMap(() => (
         <GoogleMap
            defaultZoom={17}
            
            defaultCenter={center}
            options={options}
            onClick={onMapClick}
            // onLoad={onMapLoad}
         >
            {markers.map((marker, outerIndex) => (
               <Marker
                  key={marker.time.toISOString()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                     url: marker.icon,
                  }}
                  onClick={() => {
                     setSelected({
                        marker,
                        apartmentInfo: {
                           image: '/flat1.jpg',
                           description: 'Квартира подобово в Києві, центр vip',
                           cost: '1500 грн / доба',
                           areaOfCity: 'Киев, Печерский район, Украина',
                        }
                     });
                     console.log( selected );
                     setMarkers(current =>
                        current.map((marker, index) =>
                           index === outerIndex
                              ? { ...marker, icon: '/orangeCircle1.png' }
                              : { ...marker, icon: markerImage }
                        )
                     );
                  }}
               ></Marker>
            ))}

            {
               selected && (
                  <Apartment selected={selected}></Apartment>
               )
            }
         </GoogleMap>
      ))
   );

   return (
      <div className='map-container'>
         <h1>
            <span>Bears🎪</span>
         </h1>

         {/* <Search panTo={panTo} /> */}
         <MyMapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places,geometry,drawing`}
            loadingElement={<div className='full-size' />}
            containerElement={<div className='full-size' />}
            mapElement={<div className='full-size' />}
            // onLoad={onMapLoad}
         />
      </div>
   );
}

export default App;