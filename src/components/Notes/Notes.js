import React, { useState, useEffect } from 'react'
import './Notes.scss';
import { createNote, getNotes } from '../../actions/note';
import { useSelector, useDispatch } from 'react-redux';
import Note from './Note/Note';
import { ReactComponent as EmptyNote } from './EmptyNote.svg';
import Spinner from '../Spinner/Spinner';

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
        document.getElementById('input-textarea').style.height='auto'
    }
    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])

    return (
        <div className="tab-page notes-page">

            <div className="form-section">
                <div className="form-container">

                    <form className='input-form' method="post">
                        <input type="text" name="title" className="form-input" placeholder='Title' onChange={handleChange} value={noteData.title} />
                        <textarea data-autoresize type="text" name="body" className="form-input" placeholder='Take a note...' onChange={handleChange} value={noteData.body} id='input-textarea' />
                        <div className="form-footer">
                            <button type="submit" onClick={handleCreate}>Save</button>
                        </div>
                    </form>
                </div>
            </div>

            {
                notes === null ?
                <div className="loading">
                    <Spinner/>
                </div>    
                :
                    (notes.length !== 0 ?
                        <div className="items-section notes-section">
                            <div className="items-container notes-container">

                                {notes.map(note => (
                                    <Note data={note} key={note._id} />
                                ))}


                            </div>
                        </div>
                        :
                        <div className="empty">
                            <div className="icon-side">
                                <EmptyNote className='icon empty-icon' />
                            </div>
                            <div className="typo">
                                <h4>You have no Notes yet</h4>
                            </div>
                        </div>)
                    
                        
            }
        </div>
    )
}

export default Notes
