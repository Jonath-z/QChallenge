import Signup from "./SignUp";
import './Login.css';
import { useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
// import upload from "../modules/upload";
import getdefaultAvatar from "../modules/firbaseConfig";



const Login = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [avatar, setAvatar] = useState(null);
    
    const updateShowState = () => {
        setShowSignup(true);
        setShowLogin(false);
    }
    const login = () => {
        const postLogins = async() => {
            const response = await fetch('../login', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json'
                },
                body:JSON.stringify({
                    email: email,
                    password:password
                })
            });
            const data = await response.json();
            if (data.status === '200') {
                console.log(data.id);
                history.push(`/QChallenge/?id=${data.id}`);
                window.location.reload();
                // window.location.href='/QChallenge';
                // <Redirect to='/QChallenge' />
            }
            else if (data.status === '404') {
                setLoginErr('Incorrect password');
            }
            else if (data.status === '404 email') {
                setLoginErr('Incorrect password or email');
            }

            return () => {
                setEmail('');
                setPassword('');
                setLoginErr('');
            }
        }
        postLogins();
    }
    useEffect(() => {
        const userAvatar = getdefaultAvatar();
        setAvatar(userAvatar);
    }, []);
   

    return (
        <div className='loginContainer'>
            <img src={avatar} alt="profile"/>
            <h1 className="appName">QChallenge</h1>
            {showLogin && <div className='login'>
                <input type='email' name='email' placeholder='Email' value={email} onChange={e => { setEmail(e.target.value)}}></input>
                <input type='password' name='password' placeholder='Password' value={password} onChange={e => { setPassword(e.target.value) }}></input>
                <p className='loginErr'>{loginErr}</p>
                <button onClick={login} className='loginBtn'>Submit</button>
                <button onClick={updateShowState} className='signupBtn'>Signup</button>
            </div>}
            {showSignup && <Signup />}
        </div>
    );
}

export default Login;