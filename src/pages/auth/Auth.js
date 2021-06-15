import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup, signin } from '../../actions/auth';
import "./Auth.scss";


const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
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
            <div className="background"></div>

            <div className="form-section">
                {
                    isSignUp ? (
                        <div className="signup-form form">
                            <div className="form-title">
                                <h1>Sign Up</h1>
                            </div>
                            <form action="" method="post">
                                <div className="name-inputs">
                                    <div className="form-input firstName">
                                        <h4>First Name</h4>
                                        <input type="text" name="firstName" required onChange={handleChange} />
                                    </div>
                                    <div className="form-input lastName">
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
                    ) : (<div className="signin-form form">
                        <div className="form-title">
                            <h1>Sign In</h1>
                        </div>
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
                    </div>)
                }





            </div>
        </div>
    )
}

export default Auth
