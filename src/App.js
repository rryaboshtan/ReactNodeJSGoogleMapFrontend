import React, { useState, useCallback, useEffect, useRef } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Apartments from './components/Apartments/Apartments';
import AddForm from './components/AddForm/AddForm';
import './App.css';

const markerImage = '/blueCircle.png';
const options = {
   disableDefaultUI: true,
   zoomControl: true,
};
const center = {
   lat: 50.426870377047535,
   lng: 30.454797490696944,
};

// const data = [
//    {
//       lat: 50.42711686105861,
//       lng: 30.453401587110793,
//       time: new Date(),
//       icon: markerImage,
//       apartmentInfo: {
//          image: '/flat1.jpg',
//          description: 'Квартира подобово в Києві, центр vip',
//          cost: '1500 грн / доба',
//          areaOfCity: 'Киев, Печерский район, Украина',
//       },
//    },
//    {
//       lat: 50.42677371631405,
//       lng: 30.454774731468667,
//       time: new Date(),
//       icon: markerImage,
//       apartmentInfo: {
//          image: '/flat2.jpg',
//          description: '1-комнатная ул.Мельникова',
//          cost: 'від 550 грн/доба',
//          areaOfCity: 'Киев, Шевченковский район, Украина',
//       },
//    },
//    {
//       lat: 50.42852807809127,
//       lng: 30.451891886960425,
//       time: new Date(),
//       icon: markerImage,
//       apartmentInfo: {
//          image: '/flat3.jpg',
//          description: 'Двухместный номер с двуспальной кроватью и кондиционером Саксаганского',
//          cost: '650 грн/доба',
//          areaOfCity: 'Саксаганского улица, Киев, Печерский район, Украина',
//       },
//    },
//    {
//       lat: 50.42852807809127,
//       lng: 30.451891886960425,
//       time: new Date(),
//       icon: markerImage,
//       apartmentInfo: {
//          image: '/flat3.jpg',
//          description: 'Двухместный номер с двуспальной кроватью и кондиционером Саксаганского',
//          cost: '650 грн/доба',
//          areaOfCity: 'Саксаганского улица, Киев, Печерский район, Украина',
//       },
//    },
// ];
function debounce(fn, delay = 500) {
   let timer = null;

   if (delay === 0) {
      return fn;
   }

   return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
         fn.apply(this, args);
         console.log('Args = ', args);
      }, delay);
   };
}
 let visibles = 1;
function App() {
   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState(null);
   const [visibleMarkers, setVisibleMarkers] = useState(null);


  
   useEffect(() => {
      const fetchData = async () => {
         const { data } = await axios.get('http://localhost:5000/apartments');
         setMarkers(data);
         console.log(markers);
        
         await setMarkers(current =>
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
                  icon: markerImage,
                  apartmentInfo,
               };
            })
         );

          visibles = [...markers];
          console.log('visibles', visibles);
      };
      fetchData();
   }, []);

   const onMapClick = useCallback(() => {
      setSelected(null);
      console.log('Map clicked');
      // const northEast = mapRef.current.getBounds().getNorthEast();
      // const southWest = mapRef.current.getBounds().getSouthWest();
      // console.log(ne.lat(), ';', ne.lng());

      setMarkers(current => current.map(marker => ({ ...marker, icon: markerImage })));
   }, []);

   const callback = useCallback(visibles => {
      setMarkers(visibles);
   });

   // const onMarkerClick = (marker, outerIndex) => {
   //    console.log(marker);
   //    console.log(outerIndex);

   //    setMarkers(current =>
   //       current.map((marker, index) =>
   //          index === outerIndex ? { ...marker, icon: '/orangeCircle1.png' } : { ...marker, icon: markerImage }
   //       )
   //    );
   // };

   const mapRef = useRef();
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
            ref={mapRef}
            defaultZoom={15}
            defaultCenter={center}
            options={options}
            onClick={onMapClick}
            onLoad={map => {
               mapRef.current = map;
               console.log('Loaded');
            }}
            onResize={() => {
               console.log('Resize');
            }}
            onBoundsChanged={debounce(() => {
               console.log('Bounds changed');
               const northEast = mapRef.current.getBounds().getNorthEast();
               const southWest = mapRef.current.getBounds().getSouthWest();

               visibles = markers.filter(
                  marker =>
                     marker.lng < northEast.lng() &&
                     marker.lng > southWest.lng() &&
                     marker.lat < northEast.lat() &&
                     marker.lat > southWest.lat()
               );
               console.log('visibles', visibles.length);
               // callback(visibles);
            })}
         >
            <AddForm></AddForm>
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
                     console.log(mapRef.current);
                     setMarkers(current =>
                        current.map((marker, index) =>
                           index === outerIndex ? { ...marker, icon: '/orangeCircle1.png' } : { ...marker, icon: markerImage }
                        )
                     );
                  }}
               ></Marker>
            ))}

            {selected ? <Apartments data={[selected]}></Apartments> : <Apartments data={markers}></Apartments>}
            {/* {visibles ? : null} */}
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
            onResize={event => {
               console.log(event);
            }}
            onLoad={map => {
               mapRef.current = map;
               console.log('Loaded');
            }}
         />
      </div>
   );
}

export default App;
