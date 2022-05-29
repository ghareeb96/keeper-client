import React, { useEffect, useState } from 'react'
import './Switcher.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/auth';


const Switcher = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const userData = useSelector(state => state.auth.authData)

    const toggleTheme = () => {
        dispatch(updateUser(user.result._id, { ...user.result, darkTheme: !user.result.darkTheme }))
    }


    useEffect(() => {
        if (userData !== null) {
            setUser(userData)
        }
    }, [userData])

    useEffect(() => {
        const toggler = document.getElementById('toggler')
        if (userData !== null) {
            userData.result.darkTheme ?
                toggler.classList.add('toggler-right') :
                toggler.classList.remove('toggler-right')
        }
        else{
            user.result.darkTheme ?
                toggler.classList.add('toggler-right') :
                toggler.classList.remove('toggler-right')
        }
    },[userData, user])


    return (
        <div className="switcher">
            <div className="switch-container" onClick={toggleTheme}>
                <div className="toggler" id='toggler'></div>
            </div>
        </div>
    )
}

export default Switcher
