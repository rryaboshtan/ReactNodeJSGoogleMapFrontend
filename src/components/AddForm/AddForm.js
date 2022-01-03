import React, { useRef } from 'react';
import './addform.css';

const AddForm = ({ pointerLatLng }) => {
   const { lat, lng } = pointerLatLng;
   const formRef = useRef(null);

   const onShowMessage = () => {
      for (const element of formRef.current.elements) {
         element.value = '';
         console.log(element.focus());
      }
   };
   return (
      <form
         ref={formRef}
         className='form'
         action='http://localhost:5000/uploadApartment'
         enctype='multipart/form-data'
         method='POST'
      >
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

         <button className='form-button' disabled={!lat || !lng} onClick={onShowMessage}>
            Подати оголошення
         </button>
      </form>
   );
};

export default AddForm;
