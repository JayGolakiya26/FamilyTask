import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const Task = ({ task, handleDeleteTask, index }) => {
  const [checked, isChecked] = useState(false);

  const handleCheckboxChange = () => {
    isChecked(!checked);
  };

  return (
    <div className='tssk-content d-flex justify-content-between border border-1 mt-3 p-2'>
      <div className='task-content-left ms-2'>
        <input
          type="checkbox"
          className="form-check-input"
          id="check1"
          name="option1"
          value="something"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <span className='ms-3'>{checked ? <del><span className='h5'>{task}</span></del> : <span className='h5'>{task.task} </span>}</span>
      </div>
      <div className='d-flex gap-3 '>
        <div className={`bg-${task.color}`} style={{'height':'20px' , 'width':'20px' , 'borderRadius':'10px'}}> </div>
        <div className='family-color'></div>
        <i className="fa-sharp fa-solid fa-circle"></i>
        <MdDeleteOutline className='delete-btn me-2' onClick={() => handleDeleteTask(index)} />
      </div>
    


</div>
  )
}

export default Task;