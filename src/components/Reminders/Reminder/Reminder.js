import React, { useState, useRef } from 'react'
import "./Reminder.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { useDispatch } from 'react-redux';
import { deleteReminder, updateReminder } from '../../../actions/reminder';
import moment from 'moment';


const Reminder = ({ data }) => {
    const modalRef = useRef(null);
    const [reminderData, setReminderData] = useState({ title: data.title, description: data.description })
    const dispatch = useDispatch();
    const reminderDate = moment(data.updatedAt).format('D MMMM YYYY, h:mm:ss')
    

    const handleDelete = () => {
        dispatch(deleteReminder(data._id))
    }

    const handleChange = (e) => {
        setReminderData({ ...reminderData, [e.target.name]: e.target.value })
    }

    const closeModal = (e) => {
        
        if(e.target.classList.contains('reminder')){
            modalRef.current.classList.add("modal-open")
        }
        
        if(e.target.classList.contains('modal-open')){
            dispatch(updateReminder(data._id, reminderData))
            e.target.classList.remove("modal-open")
        }
    }


    return (
        <div className="modal" onClick={closeModal} ref={modalRef}>
            <div className="reminder">
                <div className="reminder-data">

                    <input type="text" value={reminderData.title} name='title' onChange={handleChange} />
                    <textarea type="text" rows="4" value={reminderData.description} name='description' onChange={handleChange} />

                </div>

                <div className="reminder-footer">
                    <div className="time-data">
                        <span>{reminderDate}</span>
                    </div>
                    <div className="modal-actions" onClick={handleDelete}>
                        <Delete className="icon" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Reminder
