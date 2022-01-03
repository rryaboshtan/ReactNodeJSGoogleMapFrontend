import React, { useState, useCallback, useEffect, useRef } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Apartments from './components/Apartments/Apartments';
import AddForm from './components/AddForm/AddForm';
import { MARKER_IMAGE } from './config';
import './App.css';

const selectedMarkerImage = '/orangeCircle.png';

const options = {
   disableDefaultUI: true,
   zoomControl: true,
};
const center = {
   lat: 50.426870377047535,
   lng: 30.454797490696944,
};

function App() {
   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState(null);
   const [isNewMarkerAdded, setIsNewMarkerAdded] = useState(false);
   const [pointerLatLng, setPointerLatLng] = useState({});

   useEffect(() => {
      const fetchData = async () => {
         const { data } = await axios.get('http://localhost:5000/apartments');
         setMarkers(data);

         setMarkers(current =>
            current.map(marker => {
               const { lat, lng, image, description, cost, areaOfCity } = marker;
               const apartmentInfo = {
                  description,
                  cost,
                  image: image,
                  areaOfCity,
               };
               return {
                  lat,
                  lng,
                  icon: MARKER_IMAGE,
                  apartmentInfo,
               };
            })
         );
      };
      fetchData();
   }, []);

   const onMapClick = useCallback(
      event => {
         setSelected(null);

         setPointerLatLng({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
         });
         if (!isNewMarkerAdded) {
            setIsNewMarkerAdded(true);
            setMarkers(current => [
               ...current.map(marker => ({ ...marker, icon: MARKER_IMAGE })),
               {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                  icon: selectedMarkerImage,
                  apartmentInfo: {
                     description: '',
                     cost: '',
                     image: '  ',
                     areaOfCity: '',
                  },
               },
            ]);
         }
      },
      [isNewMarkerAdded]
   );

   const mapRef = useRef();

   const MyMapComponent = withScriptjs(
      withGoogleMap(() => (
         <GoogleMap ref={mapRef} defaultZoom={15} defaultCenter={center} options={options} onClick={onMapClick}>
            <AddForm
               pointerLatLng={pointerLatLng}
               isNewMarkerAdded={isNewMarkerAdded}
               isMarkerAddedCallback={setIsNewMarkerAdded}
               setPointerLatLngCallback={setPointerLatLng}
               setMarkersCallback={setMarkers}
               markers={markers}
            ></AddForm>
            {markers.map((marker, outerIndex) => (
               <Marker
                  key={uuidv4()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                     url: marker.icon,
                  }}
                  onClick={() => {
                     setSelected({
                        ...marker,
                     });

                     setMarkers(current =>
                        current.map((marker, index) =>
                           index === outerIndex ? { ...marker, icon: selectedMarkerImage } : { ...marker, icon: MARKER_IMAGE }
                        )
                     );
                  }}
               ></Marker>
            ))}

            {selected ? <Apartments data={[selected]}></Apartments> : <Apartments data={markers}></Apartments>}
         </GoogleMap>
      ))
   );

   return (
      <div className='map-container'>
         <MyMapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places,geometry,drawing`}
            loadingElement={<div className='full-size' />}
            containerElement={<div className='full-size' />}
            mapElement={<div className='full-size' />}
         />
      </div>
   );
}

export default App;
