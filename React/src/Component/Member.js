import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './member.css';
import axios from 'axios';

const Member = ({ item, onDragStart }) => {
    const [data,getData] = useState([]);
    useEffect(() => {
            axios.get('https://localhost:7124/api/Employee')
            .then(response => {
                getData(response.data)          
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }, [0])

    const handleDragStart = (e, member) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(member));
        onDragStart(member); 
      }
      
    
    const navigate = new useNavigate();
    const uniqueMembers = [];
    data.forEach((member) => {
        if (!uniqueMembers.some((uniqueMember) => uniqueMember.fname === member.fname)) {
            uniqueMembers.push(member);
        }
    });
    return (
        <>
            <div className='col-4 hero-left d-flex flex-column gap-4 pt-5'>
            <button className='bg-none border border-none bg-light p-2 text-start' onClick={() => navigate('/')}>All Tasks</button>
            <button className='bg-none border border-none bg-light p-2 text-start' onClick={() => navigate('/addnewmember')}>Add Members</button>
            {
                uniqueMembers &&
                uniqueMembers.map((member, index) => (
                    <div
                    className='tssk-content d-flex gap-5 border align-items-center border-1 mt-3 p-2 bg-light border border-2 shadow-1'
                    draggable
                    onDragStart={(e) => handleDragStart(e, member)}
                    key={index}
                    >
                    <div className={`task-content-left ms-2 family-color bg-${member.color}`}>
                    </div>
                    <div className='d-flex gap-3 '>
                        <div className='family-color h4'>
                        {member.fname}
                        </div>
                    </div>
                    </div>
                ))
            }

        </div>
        </>
            
    )
}

export default Member;  
