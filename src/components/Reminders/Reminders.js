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
        if(moment().format() < moment(e.target.value).format()){
            setReminderData({...reminderData, remind_time :e.target.value})
        }else{
            alert('Please enter a valid time')
        }
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
                        <textarea type="text" rows="4" name="description" className="form-input" placeholder='Take a reminder...' onChange={handleChange} value={reminderData.description} />
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
                            <Reminder data={reminder} key={reminder._id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Reminders
