import React, { useState, useRef } from 'react'
import "./Task.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../../actions/task';
import moment from 'moment';


const Task = ({data})=> {

    const modalRef = useRef(null);
    const [taskData, setTaskData] = useState({ task: data.task, description: data.description })
    const dispatch = useDispatch();
    const taskDate = moment(data.updatedAt).format('D MMMM YYYY, h:mm:ss')
    

    const handleDelete = () => {
        dispatch(deleteTask(data._id))
    }

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const closeModal = (e) => {
        
        if(e.target.classList.contains('reminder')){
            modalRef.current.classList.add("modal-open")
        }
        
        if(e.target.classList.contains('modal-open')){
            dispatch(updateTask(data._id, taskData))
            e.target.classList.remove("modal-open")
        }
    }

    return (
<div className="modal" onClick={closeModal} ref={modalRef}>
            <div className="task">
                <div className="task-data">

                    <input type="text" value={taskData.task} name='task' onChange={handleChange} />
                    <textarea type="text" rows="4" value={taskData.description} name='description' onChange={handleChange} />

                </div>

                <div className="task-footer">
                    <div className="time-data">
                        <span>{taskDate}</span>
                    </div>
                    <div className="modal-actions" onClick={handleDelete}>
                        <Delete className="icon" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Task
