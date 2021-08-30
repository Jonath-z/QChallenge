import Signup from "./SignUp";
import { useState } from "react";

const Login = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    
    const updateShowState = () => {
        setShowSignup(true);
        setShowLogin(false);
    }
    return (
        <>
            {showLogin && <div className='login'>
                <input type='email' name='email' placeholder='Email'></input>
                <input type='password' name='password' placeholder='Password'></input>
                <button>Submit</button>
                <button onClick={updateShowState}>Sign up</button>
            </div>}
            {showSignup && <Signup />}
        </>
    );
}

export default Login;