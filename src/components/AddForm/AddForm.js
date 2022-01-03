import React from 'react';
import './addform.css';

const AddForm = ({ pointerLatLng }) => {
   const { lat, lng } = pointerLatLng;
   return (
      <form className='form' action='http://localhost:5000/uploadApartment' enctype='multipart/form-data' method='POST'>
         <div className='form-title'>Здати в оренду</div>
         <div className='form-group'>
            <input className='form-input' name='description' placeholder=' ' required></input>
            <label className='form-label'>Описание</label>
         </div>
         <div className='form-group'>
            <input className='form-input' name='areaOfCity' placeholder=' ' required></input>
            <label className='form-label'>Адрес или район города</label>
         </div>
         <div className='form-group'>
            <input className='form-input' name='cost' placeholder=' ' required></input>
            <label className='form-label'>Стоимость</label>
         </div>
         <input className='form-input' name='lat' hidden value={lat && lat}></input>
         <input className='form-input' name='lng' hidden value={lng && lng}></input>

         <div className='form-group'>
            <input type='file' name='images' id='formFile' accept='.jpg, .jpeg, .png' required />
            {/* <label className='form-label'>Cost</label> */}
         </div>
         {/* <div className='form-group'> */}
         <label className='message-form-label' hidden={lat || lng}>
            Выберите точку на карте
         </label>
         {/* </div> */}

         <button className='form-button' disabled={!lat || !lng}>
            Подати оголошення
         </button>
      </form>
   );
};

export default AddForm;
