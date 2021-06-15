import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getNotes } from '../../actions/note';
import Notes from '../../components/Notes/Notes';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = { title: '', body: '', creator: '' }
    const [user, setUser] = useState(localStorage.getItem("profile"));
    const [noteData, setNoteData] = useState(initialState);
    
    
    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value })
    }
    
    useEffect(() => {
        if (!user) {
            history.push('/Sign')
        }
    }, [history, user])
    
    useEffect(()=>{
        dispatch(getNotes())
    },[dispatch])
    
    useEffect(()=>{
        
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote(noteData));
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
    }

    return (
        <div className="home">
            <button onClick={logout}>Logout</button>

            <form method="post">
                <input type="text" name="title" required onChange={handleChange} />
                <input type="text" name="body" required onChange={handleChange} />
                <div className="submit-btn">
                    <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>

          <Notes/>
        </div>
    )
}

export default Home
