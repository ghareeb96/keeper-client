import React, { useState, useRef,useEffect } from 'react'
import "./Task.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { ReactComponent as Check } from './Check.svg'
import { ReactComponent as Redo } from './Redo.svg'
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask, completeTask } from '../../../actions/task';
import moment from 'moment';


const Task = ({ data }) => {

    const modalRef = useRef(null);
    const [taskData, setTaskData] = useState({ task: data.task, description: data.description, is_completed : data.is_completed })
    const dispatch = useDispatch();
    const taskDate = moment(data.createdAt).fromNow()



    const handleDelete = () => {
        dispatch(deleteTask(data._id))
    }
    
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }
    
    const handleComplete = ()=>{
        dispatch(completeTask(data._id, taskData))
        setTaskData({...taskData, is_completed : !taskData.is_completed})
    }

    const closeModal = (e) => {

        if (e.target.classList.contains('task')) {
            modalRef.current.classList.add("modal-open")
        }

        if (e.target.classList.contains('modal-open')) {
            e.target.classList.remove("modal-open")
            dispatch(updateTask(data._id, taskData))        }
    }

    const resize = (e)=>{
        var offset = e.scrollHeight ;  
        e.style.height = 'auto';   
        e.style.height =   offset + 'px'   
    }

    useEffect(()=>{
        resize(document.getElementById(data._id));
    })

    return (
        <div className="modal" onClick={closeModal} ref={modalRef}>
            <div className={taskData.is_completed ? 'item task completed' : 'item task incompleted'}>
                <div className="item-data">

                    <input type="text" value={taskData.task} name='task' onChange={handleChange} />
                    <textarea data-autoresize type="text" value={taskData.description} name='description' onChange={handleChange} id={data._id}/>

                </div>

                <div className="item-footer">
                    <div className="time-data">
                        <span>{taskDate}</span>
                    </div>
                    <div className="modal-actions">
                        <div className="modal-action" onClick={handleDelete}>
                            <Delete className="icon" />
                        </div>
                        {data.is_completed ?
                            (
                                <div className="modal-action" onClick={handleComplete}>
                                    <Redo className='icon' />
                                </div>
                            ) :
                            (
                                <div className="modal-action" onClick={handleComplete}>
                                    <Check className='icon' />
                                </div>
                            )
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Task
