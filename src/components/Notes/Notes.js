import React, { useState, useEffect } from 'react'
import './Notes.scss';
import { createNote, getNotes } from '../../actions/note';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Note from './Note/Note';

const Notes = () => {
    const initialState = { title: '', body: '', creator: '' }
    const [noteData, setNoteData] = useState(initialState);

    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes);



    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value })
    }


    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createNote(noteData));
        setNoteData(initialState)
    }

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])


    return (
        <div className="tab-page notes-page">

            <div className="form-section">
                <div className="form-container">

                    <form className='input-form' method="post">
                        <input type="text" name="title" className="form-input" placeholder='Title' onChange={handleChange} value={noteData.title}/>
                        <textarea type="text" rows="4" name="body" className="form-input" placeholder='Take a note...' onChange={handleChange} value={noteData.body}/>
                        <div className="form-footer">
                        <button type="submit" onClick={handleCreate}>Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="items-section notes-section">
                <div className="items-container notes-container">
                    {
                        notes?.map(note => (
                            <Note data={note}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes
