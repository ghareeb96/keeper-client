import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import './Home.scss';
import { useDispatch } from 'react-redux';
import Notes from '../../components/Notes/Notes';
import Reminders from '../../components/Reminders/Reminders';
import Tasks from '../../components/Tasks/Tasks';
import Shopping from '../../components/Shopping/Shopping';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result);
    const [activeTab, setActiveTab] = useState("notes-tab");



    useEffect(() => {
        if (user === undefined || !user) {
            history.push('/Sign')
        }
    }, [history, user])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
    }
    const renderedTab = () => {
        switch (activeTab) {
            case 'notes-tab':
                return <Notes />

            case 'reminders-tab':
                return <Reminders />

            case 'tasks-tab':
                return <Tasks />

            case 'shopping-tab':
                return <Shopping />

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
                            user={user}
                            logout={logout} />

                        <div className="home-body">

                            <div className="sidebar-container">
                                <Sidebar
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
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
