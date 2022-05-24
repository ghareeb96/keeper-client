import React from 'react'
import './Header.scss'
import { ReactComponent as Logo } from './Logo.svg'
import { ReactComponent as Menu } from './Menu.svg'


const Header = ({ user }) => {

    const toggleSidebar = () => {
        document.getElementById('home-body').classList.toggle('sidebar-opened');

    }

    return (
        <div className='header'>
            <div className="container">
                <div className="logo-section">
                    <div className="logo-svg">
                        <Logo className="icon logo-icon" />
                    </div>
                    <div className="logo-typo">
                        <h2>Keeper</h2>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="profile-bar">
                        <h4>{user.name}</h4>
                        <div className="profile-image">
                            <img src={user.profile_picture} alt="Profile" />
                        </div>
                    </div>
                </div>

                <div className="menu-btn">
                    <Menu className='icon menu-icon' onClick={toggleSidebar} />
                </div>
            </div>
        </div>
    )
}

export default Header
