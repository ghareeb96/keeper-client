import React, { useState, useEffect } from 'react'
import DateTimePicker from '../dateTimePicker/DateTimePicker'
import './Reminders.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getReminders, createReminder } from '../../actions/reminder';
import Reminder from './Reminder/Reminder';
import moment from 'moment';


const Reminders = () => {
    const initialState = { title: '', description: '', creator: '', remind_time: '' }
    const [reminderData, setReminderData] = useState(initialState);
    const dispatch = useDispatch();
    const reminders = useSelector((state) => state.reminders);


    const handleChange = (e) => {
        setReminderData({ ...reminderData, [e.target.name]: e.target.value })
    }

    const handleCreate = (e) => {
        e.preventDefault()
        if(reminderData.remind_time && reminderData.description){
            dispatch(createReminder(reminderData));
        }
        setReminderData(initialState)
    }

    const timeChangeHandler = (e) => {
        const date = new Date(e.target.value).toLocaleString("en-US", {
            hour: "numeric",
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
            minute: 'numeric'
        })
        setReminderData({...reminderData, remind_time : date})
    }

    useEffect(() => {
        dispatch(getReminders())
    }, [dispatch])

    return (
        <div className="tab-page reminders-page">

            <div className="form-section">
                <div className="form-container">
                    <form className='input-form' method="post">
                        <input type="text" name="title" className="form-input" placeholder='Title' onChange={handleChange} value={reminderData.title} />
                        <textarea type="text" rows="4" name="description" className="form-input" placeholder='Take a note...' onChange={handleChange} value={reminderData.description} />
                        <div className="form-footer">
                            <DateTimePicker timeChangeHandler={timeChangeHandler} />
                            <button type="submit"
                                onClick={handleCreate}
                            >Save</button>
                        </div>
                    </form>

                </div>
            </div>


            <div className="items-section reminders-section">
                <div className="items-container notes-container">
                    {
                        reminders?.map(reminder => (
                            <Reminder data={reminder} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Reminders
