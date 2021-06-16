import React, {useEffect, useState} from 'react'
import './Header.scss'
import {ReactComponent as Logo} from './Logo.svg'
import {ReactComponent as Search} from './Search.svg'
import {ReactComponent as Settings} from './Settings.svg'
import {ReactComponent as Logout} from './Logout.svg'



const Header = ({user, logout}) => {
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
                        <div className="profile-image">
                            {user.profile_pic? 
                                (<img src={user.profile_pic} alt="Profile"/>)
                                :
                                (<span>{user.name[0]}</span>)}
                        </div>
                        <h4>{user.name}</h4>
                                <button><Settings className="icon"/></button>
                                <button onClick={logout}><Logout className="icon"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
