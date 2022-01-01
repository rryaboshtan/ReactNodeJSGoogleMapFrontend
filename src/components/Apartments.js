import React from 'react';
import './apartment.css';

export default function Apartments({ data }) {
   return (
      <div className='apartments'>
         {data.map(apartment => {
            const { image, description, cost, areaOfCity } = apartment.apartmentInfo;
            // console.log(apartment);
            return (
               <div className='apartment'>
                  <img src={image} alt=''></img>
                  <span class='cost'>{cost}</span>
               </div>
            );
         })}
      </div>
   );
}
