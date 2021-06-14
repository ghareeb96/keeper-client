import React from 'react'
import './Home.scss';
import { useDispatch } from 'react-redux';


const Home = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
    }
    return (
        <div className="home">
            <a href="/Sign">Sign</a>

            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home
