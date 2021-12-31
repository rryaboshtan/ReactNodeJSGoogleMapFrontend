import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from '@reach/combobox';
function Search({ panTo }) {
   const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
   } = usePlacesAutocomplete({
      requestOptions: {
         location: { lat: () => 43.653225, lng: () => -79.383186 },
         radius: 200 * 1000, // 200km
      },
   });

   return (
      <div className='search'>
         <Combobox
            onSelect={async address => {
               setValue(address, false);
               clearSuggestions();
               try {
                  const results = await getGeocode({ address });
                  const { lat, lng } = await getLatLng(results[0]);
                  panTo({ lat, lng });
               } catch (error) {
                  console.log(error);
               }
            }}
         >
            <ComboboxInput
               value={value}
               onChange={event => {
                  setValue(event.target.value);
               }}
               disabled={!ready}
               placeholder='Enter an address'
            ></ComboboxInput>
            <ComboboxPopover>
               {status === 'OK' &&
                  data.map(({ id, description }) => <ComboboxOption key={id} value={description}></ComboboxOption>)}
            </ComboboxPopover>
         </Combobox>
      </div>
   );
}

export default Search;
