import React, { useState, useRef, useEffect } from 'react'
import "./Note.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../../../actions/note';
import moment from 'moment';


const Note = ({ data }) => {
    const modalRef = useRef(null);
    const [noteData, setNoteData] = useState({ title: data.title, body: data.body })
    const dispatch = useDispatch();
    const noteDate = moment(data.createdAt).fromNow()
 

    const handleDelete = () => {
        dispatch(deleteNote(data._id))
    }

    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value })
    }

    const closeModal = (e) => {
        
        if(e.target.classList.contains('note')){
            modalRef.current.classList.add("modal-open")
        }
        
        if(e.target.classList.contains('modal-open')){
            dispatch(updateNote(data._id, noteData))
            e.target.classList.remove("modal-open")
        }
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
        <div className="modal" onClick={closeModal} ref={modalRef} >
            <div className="item note">
                <div className="item-data">

                    <input type="text" value={noteData.title} name='title' onChange={handleChange} />
                    <textarea data-autoresize type="text" value={noteData.body} name='body' onChange={handleChange} id={data._id}/>

                </div>

                <div className="item-footer">
                    <div className="time-data">
                        <span>{noteDate}</span>
                    </div>
                    <div className="modal-actions">
                        <div className="modal-action" onClick={handleDelete}>
                        <Delete className="icon" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Note
