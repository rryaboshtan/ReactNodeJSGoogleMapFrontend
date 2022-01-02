import React from 'react';
import './addform.css';

const AddForm = () => {
   return (
      <form className='form' disabled='disabled'>
         <div className='form-title'>Здати в оренду</div>
         <div className='form-group'>
            <input className='form-input' placeholder=' '></input>
            <label className='form-label'>Description</label>
         </div>
         <div className='form-group'>
            <input className='form-input' placeholder=' '></input>
            <label className='form-label'>Cost</label>
         </div>

         <button className='form-button'>Подати оголошення</button>
      </form>
   );
};

export default AddForm;
