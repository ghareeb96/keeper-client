import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import decode from 'jwt-decode';
import './Home.scss';
import {useDispatch, useSelector} from 'react-redux';
import Notes from '../../components/Notes/Notes';
import Reminders from '../../components/Reminders/Reminders';
import Tasks from '../../components/Tasks/Tasks';
import Profile from '../../components/Profile/Profile';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [activeTab, setActiveTab] = useState("notes-tab");
    const userData = useSelector(state => state.auth.authData)


    useEffect(() => {
        if (user === undefined || !user) {
            history.push('/Sign')
        }
    }, [history, user])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
    })

    useEffect(()=>{
        if(userData !== null){
            setUser(userData)
        }
    },[userData])

    const renderedTab = () => {
        switch (activeTab) {
            case 'notes-tab':
                return <Notes />

            case 'reminders-tab':
                return <Reminders />

            case 'tasks-tab':
                return <Tasks />

            case 'profile-tab':
                return <Profile 
                />

            default:
                return <Notes />
        }
    }

    return (
        <>
            {
                user ? (
                    <div className="home">
                        <Header
                            user={user.result}
                        />

                        <div className="home-body">

                            <div className="sidebar-container">
                                <Sidebar
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    handleLogout={logout}
                                />
                            </div>
                            <div className="main-container">
                                {renderedTab()}

                            </div>

                        </div>
                    </div >
                ) : (
                        ""
                    )
            }
        </>
    )
}

export default Home
