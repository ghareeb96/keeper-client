import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss'
import { updatePicture } from '../../actions/auth';


const Profile = () => {
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.authData)

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
            dispatch(updatePicture(user.result._id, { ...user.result, profile_picture: base64 }))
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

            <div className="picture-section">
                <div className="profile-picture">
                    <img src={user.result.profile_picture} alt="pp" />
                </div>

                <div className="profile-pic-btn">
                    <div className="file-input">
                        <input type="file" id="myfile" accept="image/*" className="myfile" onChange={handleUpload} />
                        <label htmlFor="myfile"> <i className="fas fa-image"></i>Change Picture</label>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <div className="info email">
                    <h6>Email</h6>
                    <h2>{user.result.email}</h2>
                </div>
                <div className="info name">
                    <h6>Name</h6>
                    <h2>{user.result.name}</h2>
                </div>
            </div>

        </div>
    )
}

export default Profile
