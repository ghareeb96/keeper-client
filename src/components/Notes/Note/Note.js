import React, { useState, useRef } from 'react'
import "./Note.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../../../actions/note';
import moment from 'moment';


const Note = ({ data }) => {
    const modalRef = useRef(null);
    const [noteData, setNoteData] = useState({ title: data.title, body: data.body })
    const dispatch = useDispatch();
    const noteDate = moment(data.updatedAt).format('D MMMM YYYY, h:mm:ss')
    

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
                    <div className="modal-actions" onClick={handleDelete}>
                        <Delete className="icon" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Note
