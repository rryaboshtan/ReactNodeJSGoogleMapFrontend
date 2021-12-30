import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css"

function App() {
  const {} = useLoadScript({
     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

   return <div>map</div>;
}

export default App;
