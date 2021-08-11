import React, { useState, useEffect } from 'react'
import './Tasks.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTasks, createTask } from '../../actions/task';
import Task from './Task/Task';


const Tasks= ()=> {

    const initialState = { task: '', description: '', creator: '', is_completed: false }
    const [taskData, setTaskData] = useState(initialState);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    // const addAutoResize = () => {
    //     document.querySelectorAll('[data-autoresize]').forEach(function (element) {
    //         element.style.boxSizing = 'border-box';
    //         var offset = element.offsetHeight - element.clientHeight;
    //         element.addEventListener('input', function (event) {
    //             event.target.style.height = 'auto';
    //             event.target.style.height = event.target.scrollHeight + offset + 'px';
    //         });
    //         element.removeAttribute('data-autoresize');
    //     });
    // }

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

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    //  useEffect(() => {
    //     addAutoResize()
    // },[tasks, dispatch])

    return (
<div className="tab-page tasks-page">

<div className="form-section">
    <div className="form-container">
        <form className='input-form' method="post">
            <input type="text" name="task" className="form-input" placeholder='Task' onChange={handleChange} value={taskData.task} />
            <textarea data-autoresize type="text" name="description" className="form-input" placeholder='Task Description' onChange={handleChange} value={taskData.description} />
            <div className="form-footer">
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
                <Task data={task} key={task._id}/>
            ))
        }
    </div>
</div>
</div>        
    )
}

export default Tasks
