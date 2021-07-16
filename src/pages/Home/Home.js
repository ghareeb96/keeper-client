import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import Notes from '../../components/Notes/Notes';
import Reminders from '../../components/Reminders/Reminders';
import Tasks from '../../components/Tasks/Tasks';
import Profile from '../../components/Profile/Profile';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Auth from '../auth/Auth';


const Home = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [activeTab, setActiveTab] = useState("notes-tab");
    const userData = useSelector(state => state.auth.authData)

    const addAutoResize = () => {
        document.querySelectorAll('[data-autoresize]').forEach(function (element) {
            element.style.boxSizing = 'border-box';
            console.log(element)
            var offset = element.offsetHeight - element.clientHeight;
            element.addEventListener('input', function (event) {
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + offset + 'px';
            });
            element.removeAttribute('data-autoresize');
        });
    }

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

    useEffect(() => {
        if (userData !== null) {
            setUser(userData)
        }
    }, [userData])

    useEffect(() => {
        addAutoResize()
    },[dispatch, user])

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

                        <div className="home-body" id='home-body'>

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
                        <Auth/>
                    )
            }
        </>
    )
}

export default Home
