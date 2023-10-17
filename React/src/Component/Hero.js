import React, { useState, useEffect } from 'react';
import './hero.css';
import { MdDeleteOutline } from 'react-icons/md';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Member from './Member';
import Task from './Task';
import nodata from '../animation/nodata.json';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

const Hero = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [taskList, setTaskList] = useState([]);
  const [draggedItem, setDraggedItem] = useState([]);

  const handleDragStart = (member) => {
    setDraggedItem(member);
  };

  const handleDrop = () => {
    if (draggedItem) {
      const member = [...taskList];
      if (member.length === 0) {
        toast.error('There are no pending tasks');
      } else {
        member[1].color = draggedItem.color;
        // member[3].color = draggedItem.color;

      }
      setTaskList(member);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://localhost:7124/api/Task', data);

      if (response.status === 201) {
        const newTask = response.data;
        const newArray = [...taskList];
        console.log(newArray)
        newArray.push(newTask);
        setTaskList(newArray);
        reset();

        // After a successful POST, make a GET request to refresh the task list
        fetchTaskList();
      } else {
        toast.error('Failed to create a new task.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = () => {
    // Handle checkbox change logic here
  };

  // import axios from 'axios';

const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`https://api.example.com/tasks/${taskId}`);
    if (response.status === 204) {
      // Deletion was successful. You can update your state or take further actions.
      console.log('Task deleted successfully.');
    } else {
      // Handle error, if necessary.
      console.error('Failed to delete the task.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleDeleteTask = (taskId) => {
  deleteTask(taskId);
};


  const fetchTaskList = async () => {
    try {
      const response = await axios.get('https://localhost:7124/api/Task');
      if (response.status === 200) {
        setTaskList(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    
    fetchTaskList();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <Member onDragStart={handleDragStart} />
          <div className='col-8 mt-5' onDrop={handleDrop} onDragOver={handleDragOver}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group d-flex flex-direction-column">
                <Controller
                  name="task"
                  control={control}
                  rules={{ required: 'Task is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="form-control input-text"
                        placeholder='Enter New Task'
                        aria-label="Dollar amount (with dot and two decimal places)"
                      />
                    </>
                  )}
                />
                <button className="input-group-text add-btn text-light ps-4 pe-4 ms-3" type="submit">Add</button>
                <br />
              </div>
            </form>
            {errors.task && <p className="error text-danger ">{errors.task.message}</p>}
                  {taskList.map((task, index) => (
                    <Task
                      isChecked={false}
                      handleCheckboxChange={handleCheckboxChange}
                      task={task}
                      handleDeleteTask={() => handleDeleteTask(index)}
                      index={index}
                      key={index}
                    />
                  ))}     
            <i className="fa-duotone fa-circle"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
