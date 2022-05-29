import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss'
import { updateUser, changePassword } from '../../actions/auth';


const Profile = () => {
    const initialState ={ oldPassword: '', newPassword: '', confirmNewPassword: '' } 
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [passwordData, setPasswordData] = useState(initialState)
    const [passwordState, setPasswordState] = useState(null)
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.authData)
    const passChangeState = useSelector(state => state.auth.passwordChange)
    const joinDate = new Date(user.result.createdAt)
    const birth_date = new Date(user.result?.birthdate)


    const getBase64 = (file) => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                setBase64(baseURL);
                setFile(null)
            };
        });
    }
    const handleUpload = async (e) => {
        setFile(e.target.files[0])
    }

    const addMobile = () => {
        const re = /^[0-9\b]+$/
        const mobile_num = document.querySelector("#mobile").value
        if (mobile_num.length >= 10 && re.test(mobile_num)) {
            dispatch(updateUser(user.result._id, { ...user.result, mobile: mobile_num }))

        } else {
            alert("Please enter a valid Mobile Number")
            document.querySelector("#mobile").value = ""
        }
    }
    const addBirthDate = () => {
        const birthDate = document.querySelector("#birthdate").value
        if (birthDate) {
            dispatch(updateUser(user.result._id, { ...user.result, birthdate: birthDate }))
        } else {
            alert("Please enter your birth date")
            document.querySelector("#birthdate").value = ""
        }
    }

    const showModal = () => {
        document.querySelector(".password-modal").classList.add("active")
    }
    const closeModal = (e) => {
        if (e.target.classList.contains("password-modal")) {
            document.querySelector(".password-modal").classList.remove("active")
            setPasswordData(initialState)
        }
    }

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
        if(passwordState){
            setPasswordState("")
        }
    }

    const updatePassword = async () => {

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setPasswordState("New password doesn't match")
            return
        }

        dispatch(changePassword(user.result._id, passwordData))
    }


    useEffect(() => {
        if (file !== null) {
            getBase64(file)
        }
    }, [file])

    useEffect(() => {
        if (base64 !== '') {
            dispatch(updateUser(user.result._id, { ...user.result, profile_picture: base64 }))
            setBase64('')
        }
    }, [base64, dispatch, user.result])

    useEffect(() => {
        if (passChangeState !== null) {
            if (passChangeState === "Incorrect Password") {
                setPasswordState(passChangeState)
            } else {
                document.querySelector(".password-modal").classList.remove("active")
                document.querySelector(".pass-successfull-change").classList.add("active")
                setPasswordData(initialState)
                setTimeout(() => document.querySelector(".pass-successfull-change").classList.remove("active"), 5000);
            }

        }
    }, [passChangeState])

    useEffect(() => {
        if (userData !== null) {
            setUser(userData)
        }
    }, [userData])

    return (
        <div className='profile'>

            <h4 className="pass-successfull-change">Password Changed Successfully !</h4>


            <div className="upper-section">
                <div className="profile-picture">
                    <img src={user.result.profile_picture} alt="pp" />
                </div>

                <div className="name-password-btn">
                    <div className="name">
                        <h2>{user.result.name}</h2>
                    </div>
                    <div className="file-input">
                        <input type="file" id="myfile" accept="image/*" className="myfile " onChange={handleUpload} />
                        <label htmlFor="myfile" > <i className="fas fa-image"></i>Change Picture</label>
                    </div>
                    <div className="change-password">
                        <button className="btn" id="password-btn" onClick={showModal}>
                            Change Password
                        </button>

                        <div className="password-modal" onClick={closeModal}>
                            <div className="password-form">
                                <div className="input-data" id="old-password">
                                    <h5>Old Password</h5>
                                    <input
                                        type="password"
                                        id="old-password-input"
                                        value={passwordData.oldPassword}
                                        name='oldPassword'
                                        onChange={handleChange}
                                        maxLength="8" />
                                </div>
                                <div className="input-data" id="new-password" >
                                    <h5>New Password</h5>
                                    <input type="password" id="new-password-input"
                                        name='newPassword'
                                        value={passwordData.newPassword}
                                        onChange={handleChange}
                                        maxLength="8" />
                                </div>
                                <div className="input-data" id="confirm-new-password" >
                                    <h5>Confirm New Password</h5>
                                    <input type="password" id="confirm-new-password-input"
                                        name='confirmNewPassword'
                                        value={passwordData.confirmNewPassword}
                                        onChange={handleChange}
                                        maxLength="8" />
                                </div>
                                <div className="error">{passwordState}</div>
                                <button className="password-save-btn" onClick={updatePassword}>Update Password</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="data-section">

                <div className="profile-info">
                    <h6>Email</h6>
                    <h3>{user.result.email}</h3>
                </div>
                <div className="profile-info">
                    <h6>Mobile</h6>
                    {
                        user.result.mobile ?
                            <h3>{user.result.mobile}</h3>
                            :
                            <>
                                <input type="text" name="Mobile" id="mobile" pattern="[0-9]+" />
                                <button className="btn add-mobile" onClick={addMobile}>Add Mobile</button>
                            </>
                    }

                </div>
                <div className="profile-info">
                    <h6>Birth date</h6>
                    {
                        user.result.birthdate ?
                            <h3>{`${birth_date.getDate()} - ${birth_date.getMonth() + 1} - ${birth_date.getFullYear()}`}</h3>
                            :
                            <>
                                <input type="date" name="birthdate" id="birthdate" />
                                <button className="btn add-birthdate" onClick={addBirthDate}>Add Birth date</button>
                            </>
                    }
                </div>
                <div className="profile-info">
                    <h6>Date joined</h6>
                    <h3>{`${joinDate.getDate()} - ${joinDate.getMonth() + 1} - ${joinDate.getFullYear()}`}</h3>
                </div>
            </div>

        </div>
    )
}

export default Profile
