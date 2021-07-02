import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup, signin } from '../../actions/auth';
import { ReactComponent as Logo } from './Logo.svg';
import "./Auth.scss";


const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profile_picture: 'data:image/png;base64,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' }
    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    return (
        <div className="auth">
            <div className="background">
                <div className="background-overlay"></div>
            </div>
            <div className="form-section">
                {
                    isSignUp ? (
                        <div className="signup-form form">

                            <div className="logo">
                                <Logo className='icon logo-icon' />
                                <h1>Keeper</h1>
                            </div>

                            <div className="form-title">
                                <h1>Sign Up</h1>
                            </div>

                            <div className="form-body">
                                <form method="post">
                                    <div className="name-inputs">
                                        <div className="form-input nameInput">
                                            <h4>First Name</h4>
                                            <input type="text" name="firstName" required onChange={handleChange} />
                                        </div>
                                        <div className="form-input nameInput">
                                            <h4>Last Name</h4>
                                            <input type="text" name="lastName" required onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-input email">
                                        <h4>Email</h4>
                                        <input type="email" name="email" required onChange={handleChange} />
                                    </div>
                                    <div className="form-input password">
                                        <h4>Password</h4>
                                        <input type="password" name="password" required onChange={handleChange} />
                                    </div>
                                    <div className="form-input confirm-password">
                                        <h4>Confirm Password</h4>
                                        <input type="password" name="confirmPassword" required onChange={handleChange} />
                                    </div>
                                    <div className="submit-btn">
                                        <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </form>
                                <div className="switch-form">
                                    <p>Already have an account ?</p>
                                    <button onClick={() => setIsSignUp(false)}>Sign in</button>
                                </div>
                            </div>
                        </div>
                    ) : (<div className="signin-form form">

                        <div className="logo">
                            <Logo className='icon logo-icon' />
                            <h1>Keeper</h1>
                        </div>
                        <div className="form-title">
                            <h1>Sign In</h1>
                        </div>
                        <div className="form-body">
                            <form action="" method="post">
                                <div className="form-input email">
                                    <h4>Email</h4>
                                    <input type="email" name="email" required onChange={handleChange} />
                                </div>
                                <div className="form-input password">
                                    <h4>Password</h4>
                                    <input type="password" name="password" required onChange={handleChange} />
                                </div>
                                <div className="submit-btn">
                                    <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
                                </div>
                            </form>
                            <div className="switch-form">
                                <p>Don't have an account ?</p>
                                <button onClick={() => setIsSignUp(true)}>Sign Up</button>
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
