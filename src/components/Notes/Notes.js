import React from 'react'
import { useSelector } from 'react-redux';

const Notes = () => {
  
    const notes = useSelector((state) => state.notes);


   

    console.log(notes)
    return (
        <div className="notes">
            
            {
                notes?.map(note=>(
                    <div className="note">
                        <h2>{note.title}</h2>
                        <h4>{note.body}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default Notes
