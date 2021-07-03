import React, { useEffect } from 'react'
import './Sidebar.scss';
import { ReactComponent as Idea } from './Idea.svg'
import { ReactComponent as Reminder } from './Reminder.svg'
import { ReactComponent as Task } from './Task.svg'
import { ReactComponent as Profile } from './Profile.svg'
import { ReactComponent as Logout } from './Logout.svg'

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
    const handleActiveTab = (e) => {
        if (activeTab !== e.target.id) {
            document.getElementById(activeTab).classList.remove("active")
            setActiveTab(e.target.id)
        }
        if(document.getElementById('home-body').classList.contains('sidebar-opened')){
            document.getElementById('home-body').classList.remove('sidebar-opened')
        }
    }


    useEffect(() => {
        document.getElementById(activeTab).classList.add("active")
    }, [activeTab])

    return (
        <div className="sidebar">
            <div className="tab notes-tab active" id="notes-tab" onClick={handleActiveTab}>
                <Idea className="icon" />
                <h4>Notes</h4>
            </div>
            <div className="tab reminders-tab" id="reminders-tab" onClick={handleActiveTab}>
                <Reminder className="icon" />
                <h4>Reminders</h4>
            </div>
            <div className="tab Tasks-tab" id="tasks-tab" onClick={handleActiveTab}>
                <Task className="icon" />
                <h4>Tasks</h4>
            </div>
            <div className="tab profile-tab" id="profile-tab" onClick={handleActiveTab}>
                <Profile className="icon" />
                <h4>Profile</h4>
            </div>
            <div className="tab logout-tab" id="logout-tab" onClick={handleLogout}>
                <Logout className="icon" />
                <h4>Logout</h4>
            </div>
        </div>
    )
}

export default Sidebar
