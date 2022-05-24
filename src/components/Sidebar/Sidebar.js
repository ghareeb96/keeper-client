import React, { useEffect } from 'react'
import './Sidebar.scss';
import Switcher from '../Switcher/Switcher';

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
    const handleActiveTab = (e) => {
        if (activeTab !== e.target.id) {
            document.getElementById(activeTab).classList.remove("active")
            setActiveTab(e.target.id)
        }
        if (document.getElementById('home-body').classList.contains('sidebar-opened')) {
            document.getElementById('home-body').classList.remove('sidebar-opened')
        }
    }


    useEffect(() => {
        document.getElementById(activeTab).classList.add("active")
    }, [activeTab])

    return (
        <div className="sidebar">
            <div className="tab notes-tab active" id="notes-tab" onClick={handleActiveTab}>
                <h4>Notes</h4>
            </div>

            <div className="tab Tasks-tab" id="tasks-tab" onClick={handleActiveTab}>
                <h4>Tasks</h4>
            </div>
            <div className="tab profile-tab" id="profile-tab" onClick={handleActiveTab}>
                <h4>Profile</h4>
            </div>
            <div className="tab logout-tab" id="logout-tab" onClick={handleLogout}>
                <h4>Logout</h4>
            </div>
            <div className="tab nightmode-tab" id="nightmode-tab" >
                <h4>Night mode</h4>
                <div className="theme-switcher">
                    <Switcher />
                </div>
            </div>


        </div>
    )
}

export default Sidebar
