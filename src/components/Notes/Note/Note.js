import React from 'react'
import "./Note.scss";
import { ReactComponent as Delete } from './Delete.svg'
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../../actions/note';


const Note = ({ data }) => {
    const dispatch = useDispatch();

    const handleDelete = () =>{
        dispatch(deleteNote(data._id))
    }

    return (
        <div className="note">
            <div className="title">
                <h3>{data.title}</h3>
            </div>
            <div className="body">
                <h5>
                    {data.body}
                </h5>
            </div>

            <div className="note-actions" onClick={handleDelete}>
                <Delete className="icon"/>
            </div>
        </div>
    )
}

export default Note
