import React, { useRef } from 'react';
import './addform.css';

const AddForm = ({ pointerLatLng, isNewMarkerAdded, isMarkerAddedCallback }) => {
   const { lat, lng } = pointerLatLng;
   const formRef = useRef(null);

   const onShowMessage = () => {
      formRef.current.submit();

      for (const element of formRef.current.elements) {
         element.value = '';
      }

      const notValidElements = Array.from(formRef.current.elements).filter(element => !element.value);

      if (notValidElements.length === 3 || notValidElements.length === 1) {
         isMarkerAddedCallback(false);
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
         </div>
         <label className='message-form-label' hidden={lat || lng}>
            Выберите точку на карте
         </label>

         <button className='form-button' disabled={!lat || !lng} onClick={onShowMessage}>
            Подати оголошення
         </button>

         <label className='warning-message-label' hidden={!isNewMarkerAdded}>
            Точка на карте уже выбрана, введите данные для отправки
         </label>
      </form>
   );
};

export default AddForm;
