import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, signin, clearError, googleAuth } from '../../actions/auth';
import { ReactComponent as Logo } from './Logo.svg';
import { ReactComponent as Google } from './Google.svg';
import Spinner from '../../components/Spinner/Spinner'
import "./Auth.scss";
import { defaultPic } from './defaultPic';


const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profile_picture: defaultPic }
    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false)
    const authError = useSelector(state => state.auth.authError)

    const handleClearError = () => {
        if (authError) {
            dispatch(clearError())
        }
    }
    const clearFormData = () => {
        setFormData(initialState);
    }

    const handleChange = (e) => {
        handleClearError()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSwitch = () => {
        clearFormData();
        handleClearError();
        setIsSignUp(!isSignUp)
    }

    const googleSuccess = async (res) => {
        setLoadingScreen(true)
        const form = {
            firstName: res.profileObj?.givenName,
            lastName: res.profileObj?.familyName,
            email: res.profileObj?.email,
            password: `${res.profileObj?.email}${res.profileObj?.googleId}`,
            confirmPassword: `${res.profileObj?.email}${res.profileObj?.googleId}`,
            profile_picture: defaultPic
        }
        dispatch(googleAuth(form))
        dispatch(clearError())
    }

    const googleFailure = (error) => {
        console.log(error)
    }

    const handleSubmit = (e) => {
        handleClearError()
        setLoadingScreen(true)

        e.preventDefault()

        if (isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    useEffect(() => {
        if (authError) {
            setLoadingScreen(false)
        }
    }, [authError])

    return (
        <div className="auth">
            <div className="background">
                <div className="background-overlay"></div>
            </div>
            <div className="form-section">
                {
                    loadingScreen ? (
                        <div className="loading-screen">
                            <Spinner />
                        </div>
                    ) : ''
                }
                {
                    isSignUp ? (
                        <div className="signup-form form-container">

                            <div className="logo-section">
                                <Logo className='icon logo-icon' />
                                <h2>Keeper</h2>
                            </div>

                            <div className="form-body">
                                <form method="post">
                                    <div className="name-inputs">
                                        <div className="form-input nameInput">
                                            <h4>First Name</h4>
                                            <input type="text" value={formData.firstName} name="firstName" required onChange={handleChange} />
                                        </div>
                                        <div className="form-input nameInput">
                                            <h4>Last Name</h4>
                                            <input type="text" value={formData.lastName} name="lastName" required onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-input email">
                                        <h4>Email</h4>
                                        <input type="email" value={formData.email} name="email" required onChange={handleChange} />
                                    </div>
                                    <div className="form-input password">
                                        <h4>Password</h4>
                                        <input type="password" value={formData.password} name="password" required onChange={handleChange} />
                                    </div>
                                    <div className="form-input confirm-password">
                                        <h4>Confirm Password</h4>
                                        <input type="password" value={formData.confirmPassword} name="confirmPassword" required onChange={handleChange} />
                                    </div>
                                    <div className="error-message">
                                        <span>{authError}</span>
                                    </div>
                                    <div className="submit-btn">
                                        <button className="btn" type="submit" onClick={handleSubmit}>Sign Up</button>
                                    </div>
                                </form>
                                <div className="switch-btn">
                                    <button onClick={handleFormSwitch}>Have an account</button>
                                </div>
                            </div>
                        </div>
                    ) : (

                            <div className="signin-form form-container">

                                <div className="logo-section">
                                    <Logo className='icon logo-icon' />
                                    <h2>Keeper</h2>
                                </div>

                                <div className="form-body">
                                    <form action="" method="post">
                                        <div className="form-input email">
                                            <h4>Email</h4>
                                            <input type="email" value={formData.email} name="email" required onChange={handleChange} />
                                        </div>
                                        <div className="form-input password">
                                            <h4>Password</h4>
                                            <input type="password" value={formData.password} name="password" required onChange={handleChange} />
                                        </div>
                                        <div className="error-message">
                                            <span>{authError}</span>
                                        </div>
                                        <div className="submit-btn">
                                            <button className="btn" type="submit" onClick={handleSubmit}>Sign In</button>
                                        </div>
                                    </form>
                                    <div className="switch-btn">
                                        <button onClick={handleFormSwitch}>Create an account</button>
                                    </div>
                                    <span>or</span>
                                    <div className="google-btn btn">
                                        <GoogleLogin
                                            clientId='689278456234-9dt58abdin3vl7lj3c6b7mp0g47de3e0.apps.googleusercontent.com'
                                            render={(renderProps) => (
                                                <button className="google" onClick={renderProps.onClick}>
                                                    <Google className='icon google-icon' />
                                            Sign with Google
                                                </button>

                                            )}
                                            onSuccess={googleSuccess}
                                            onFailure={googleFailure}
                                            cookiePolicy='single_host_origin'
                                        />
                                    </div>
                                </div>
                            </div>)
                }
            </div>

            <div className="slogan-side">
                <div className="slogan-typo">
                    <h4><span>Keep your </span>Notes, Reminders and Tasks<span> in one place</span></h4>
                </div>
            </div>
        </div>
    )
}

export default Auth
