import React, { useRef } from 'react';
import './addform.css';

const markerImage = '/blueCircle.png';

const AddForm = ({
   pointerLatLng,
   isNewMarkerAdded,
   isMarkerAddedCallback,
   setPointerLatLngCallback,
   setMarkersCallback,
   markers,
}) => {
   const { lat, lng } = pointerLatLng;
   const formRef = useRef(null);

   const onShowMessage = async () => {
      const notValidElements = Array.from(formRef.current.elements).filter(element => !element.value);
      const elements = formRef.current.elements;

      let file = formRef.current.images.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);
      console.log('reader.result', reader.result);

      
    
      

      if (notValidElements.length === 1) {
         isMarkerAddedCallback(false);
         setPointerLatLngCallback({});
        
      
         formRef.current.submit();

         reader.onloadend = function () {
            console.log('reader.result', reader.result);
            console.log('markers = ', markers);
            console.log(elements);
            const newMarkers = markers.slice(0, markers.length - 1);
            const obj = {
               lat,
               lng,
               icon: markerImage,
               apartmentInfo: {
                  description: elements.description.value,
                  cost: elements.cost.value,
                  // Image in base64 format
                  image: reader.result.slice(23),
                  areaOfCity: elements.areaOfCity.value,
               },
            };
            console.log('obj = ', obj);
            for (const element of formRef.current.elements) {
               element.value = '';
            }
            setMarkersCallback(current => [...newMarkers, obj]);
         };
      
        
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
