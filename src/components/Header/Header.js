import React from 'react'
import './Header.scss'
import {ReactComponent as Logo} from './Logo.svg'
import {ReactComponent as Search} from './Search.svg'


const Header = ({user}) => {
    return (
        <div className='header'>
            <div className="container">
                <div className="logo-section">
                    <div className="logo-svg">
                        <Logo className="icon"/>
                    </div>
                    <div className="logo-typo">
                        <h2>Keeper</h2>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-bar">
                        <button><Search className="icon"/></button>
                        <input type="text" name="search" placeholder="Search" autoComplete="off"/>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="profile-bar">
                        <h4>{user.name}</h4>
                        <div className="profile-image">
                            <img src={user.profile_picture} alt="Profile"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
