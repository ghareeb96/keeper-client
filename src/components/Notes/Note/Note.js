import React, { useState, useRef } from 'react'
import "./Note.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../../../actions/note';


const Note = ({ data }) => {
    const modalRef = useRef(null);
    const [noteData, setNoteData] = useState({ title: data.title, body: data.body })
    const dispatch = useDispatch();
    const noteDate = new Date(data.updatedAt).toLocaleString("en-US", {
        month: "short",
        day : "numeric",
        hour : "numeric",
        minute : "numeric"
    })
    

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


    return (
        <div className="modal" onClick={closeModal} ref={modalRef}>
            <div className="note">
                <div className="note-data">

                    <input type="text" value={noteData.title} name='title' onChange={handleChange} />
                    <textarea type="text" rows="4" value={noteData.body} name='body' onChange={handleChange} />

                </div>

                <div className="note-footer">
                    <div className="time-data">
                        <span>{noteDate}</span>
                    </div>
                    <div className="note-actions" onClick={handleDelete}>
                        <Delete className="icon" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Note
