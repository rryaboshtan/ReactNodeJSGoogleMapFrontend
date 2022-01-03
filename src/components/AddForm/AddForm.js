import React from 'react';
import './addform.css';

const AddForm = () => {
   return (
      <form className='form' action='http://localhost:5000/uploadApartment' enctype='multipart/form-data' method='POST'>
         <div className='form-title'>Здати в оренду</div>
         {/* <div className='form-group'>
            {/* <input className='form-input' name='description' placeholder=' '></input>
            <label className='form-label'>Описание</label> */}
         {/* </div> */}
         <div className='form-group'>
            <input className='form-input' name='description' placeholder=' '></input>
            <label className='form-label'>Описание</label>
         </div>
         <div className='form-group'>
            <input className='form-input' name='areaOfCity' placeholder=' '></input>
            <label className='form-label'>Адрес или район города</label>
         </div>
         <div className='form-group'>
            <input className='form-input' name='cost' placeholder=' '></input>
            <label className='form-label'>Стоимость</label>
         </div>

         <div className='form-group'>
            <input type='file' class='form-control' name='images' id='formFile' accept='.jpg, .jpeg, .png' />
            {/* <label className='form-label'>Cost</label> */}
         </div>

         <button className='form-button'>Подати оголошення</button>
      </form>
   );
};

export default AddForm;
