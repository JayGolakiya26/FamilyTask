import React, { useState, useEffect } from 'react';
import './addmember.css';
import Member from './Member';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';


const AddFamilyMember = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [color,setColor] = useState("");
    const[value, setValue] = useState(false)

    const colors = [
        "danger",
        "success",
        "primary",
        "secondary",   
        "warning",
        "info",
        "dark",
    ];

    const submitDataToAPI = async (formData) => {
        try {
            const jay =  await axios.post('https://localhost:7124/api/Employee', formData);
            console.log(jay);
             setValue(true)

        } catch (error) {
            console.error('API Error:', error);
        }
    };
    


    const onSubmit = (data) => {
        const formData = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            role: data.role,
            color: color,
            
        };
        
        // console.log(jay)
        
        submitDataToAPI(formData);   
        
    };

    return (
        <div className='container-fluid'>
           <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <Member value={value} />
                    <div className='col mt-5 input-form'>
                        <div className='row mb-3'>
                            <span className='h5'>Add Family Member</span>
                        </div>
                        <div className='row d-flex justify-content-between gap-3 names-input' >
                            <Controller
                                name="fname"
                                control={control}
                                rules={{ required: 'First Name is required*' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type='text'
                                        placeholder='First Name'
                                        className='nameinputs'
                                    />
                                )}
                            />

                            <Controller
                                name="lname"
                                control={control}
                                rules={{ required: 'Last Name is required*' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type='text'
                                        placeholder='Last Name'
                                        className='nameinputs'
                                    />
                                )}
                            />
                            {errors.fname && <p className="error-message text-danger"style={{width : "40%" }}>{errors.fname.message}</p>}
                            {errors.lname && <p className="error-message text-danger"style={{width : "46%" }}>{errors.lname.message}</p>}
                        </div>
                        <div className='row'>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: 'Email is required*' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type='email'
                                        placeholder='Email'
                                        className='mt-3 email-role-inputs'
                                    />
                                )}
                            />
                            {errors.email && <p className="error-message text-danger pt-3">{errors.email.message}</p>}
                        </div>  
                        <div className='row'>
                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: 'Role is required*' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type='text'
                                        placeholder='Roles'
                                        className='mt-3 email-role-inputs'
                                    />
                                )}
                            />
                            {errors.role && <p className="error-message text-danger pt-3">{errors.role.message}</p>}
                        </div>
                        <p>Select Avatar</p>
                        <div className='d-flex justify-content-between'>
                            <div className='select-color d-flex gap-3 mt-2'>
                                {colors.map((color, index) => (
                                    <div key={index} className={`color-selector bg-${color}`} onClick={() => setColor(color)}>
                                        <input type="checkbox" className="circular-checkbox" />
                                    </div>
                                ))}
                            </div>
                            <div>   
                                <button type='submit' className="input-group-text add-btn text-light ps-4 pe-4 ms-3">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AddFamilyMember;
