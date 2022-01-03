import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './apartment.css';

export default function Apartments({ data }) {
   return (
      <div className='apartments'>
         {data.map(apartment => {
            const { image, description, cost, areaOfCity } = apartment.apartmentInfo;
            return (
               <div key={uuidv4()} className='apartment'>
                  <img src={`data:image/jpg;base64,${image}`} alt=''></img>
                  <span className='cost'>{cost}</span>
                  <h3>{description}</h3>
                  <span className='areaOfCity'>{areaOfCity}</span>
               </div>
            );
         })}
      </div>
   );
}
