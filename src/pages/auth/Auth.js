import React from 'react'
import "./Auth.scss"


const Auth = () => {
    return (
        <div className="auth">
            <div className="background"></div>

            <div className="form-section">
                <div className="signup-form form">
                    <div className="form-title">
                        <h1>Sign Up</h1>
                    </div>
                    <form action="http://localhost:5000/" method="post">
                        <div className="name-inputs">
                            <div className="form-input firstName">
                                <h4>First Name</h4>
                                <input type="text" name="firstName" required />
                            </div>
                            <div className="form-input lastName">
                                <h4> Last Name</h4>
                                <input type="text" name="lastName" required />
                            </div>
                        </div>
                        <div className="form-input email">
                            <h4 >Email</h4>
                            <input type="email" name="email" required />
                        </div>
                        <div className="form-input password">
                            <h4 >Password</h4>
                            <input type="password" name="password" required />
                        </div>
                        <div className="form-input confirm-password">
                            <h4 >Confirm Password</h4>
                            <input type="password" name="confirmPassword" required />
                        </div>
                        <div className="submit-btn">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </form>
                    <div className="switch-form">
                        <p>Already have an account ?</p>
                        <button>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
