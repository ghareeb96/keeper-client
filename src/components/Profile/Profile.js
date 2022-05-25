import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss'
import { updateUser } from '../../actions/auth';


const Profile = () => {
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.authData)
    const joinDate = new Date(user.result.createdAt)

    const getBase64 = (file) => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Called", reader);
                baseURL = reader.result;
                setBase64(baseURL);
                setFile(null)
            };
        });
    }
    const handleUpload = async (e) => {
        setFile(e.target.files[0])
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
        if (userData !== null) {
            setUser(userData)
        }
    }, [userData])

    return (
        <div className='profile'>

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
                        <label htmlFor="myfile" > <i className="fas fa-image"></i>Change Password</label>
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
                            <button className="btn add-mobile">Add Mobile</button>
                    }

                </div>
                <div className="profile-info">
                    <h6>Birth date</h6>
                    {
                        user.result.birthdate ?
                            <h3>{user.result.birthdate}</h3>
                            :
                            <button className="btn add-birthdate">Add Birth date</button>
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
