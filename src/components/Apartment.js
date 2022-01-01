import React from 'react';
import './apartment.css';

export default function Apartment({ selected }) {
   const { image, description, cost, areaOfCity } = selected.apartmentInfo;
   return (
      <div className='apartments'>
         <div className='apartment'>
            <img src={image} alt=''></img>
            <span class='cost'>{cost}</span>
         </div>
      </div>
   );
}
