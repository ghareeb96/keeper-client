import React, { useState, useEffect } from 'react'
// import DateTimePicker from '../dateTimePicker/DateTimePicker'
import './Tasks.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTasks, createTask } from '../../actions/task';
import Task from './Task/Task';
// import moment from 'moment';


const Tasks= ()=> {

    const initialState = { task: '', description: '', creator: '', is_completed: false }
    const [taskData, setTaskData] = useState(initialState);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);


    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const handleCreate = (e) => {
        e.preventDefault()
        if(taskData.task){
            dispatch(createTask(taskData));
        }
        setTaskData(initialState)
    }

    // const timeChangeHandler = (e) => {
    //     const date = new Date(e.target.value).toLocaleString("en-US", {
    //         hour: "numeric",
    //         year: 'numeric', 
    //         month: 'numeric', 
    //         day: 'numeric', 
    //         minute: 'numeric'
    //     })
    //     setTaskData({...taskData})
    // }

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])


    return (
<div className="tab-page tasks-page">

<div className="form-section">
    <div className="form-container">
        <form className='input-form' method="post">
            <input type="text" name="task" className="form-input" placeholder='Task' onChange={handleChange} value={taskData.task} />
            <textarea type="text" rows="4" name="description" className="form-input" placeholder='Task Description' onChange={handleChange} value={taskData.description} />
            <div className="form-footer">
                {/* <DateTimePicker timeChangeHandler={timeChangeHandler} /> */}
                <button type="submit"
                    onClick={handleCreate}
                >Save</button>
            </div>
        </form>

    </div>
</div>


<div className="items-section tasks-section">
    <div className="items-container tasks-container">
        {
            tasks?.map(task => (
                <Task data={task} />
            ))
        }
    </div>
</div>
</div>        
    )
}

export default Tasks