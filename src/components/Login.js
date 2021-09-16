import Signup from "./SignUp";
import './Login.css';
import { useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import storage from "../modules/firbaseConfig";
import { FaSpinner } from 'react-icons/fa';
import LoginWithGoogle from "./LoginWithGoole";


const Login = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [err, setErr] = useState(false);
    
    useEffect(() => {
        const getdefaultAvatar = async () => {
            await storage.ref('NicePng_avatar-png_3012856.png').getDownloadURL()
                .then(url => {
                    setAvatar(url);
                    // console.log(url);
                    return url;
                });
        }
        getdefaultAvatar();
    }, []);

    const goToSignup = () => {
        setShowSignup(true);
        setShowLogin(false);
    }
    const login = () => {
        setIsDisable(true);
        const postLogins = async () => {
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
                // console.log(data.data.id);
                // console.log('data', data);
                window.localStorage.setItem('user', JSON.stringify(data));
                history.push(`/QChallenge/?id=${data.data.id}`);
                window.location.reload();
                setIsDisable(true);
            }
            else if (data.status === '404') {
                setLoginErr('Incorrect password');
                setIsDisable(true);
                setErr(true);
            }
            else if (data.status === '404 email') {
                setLoginErr('Incorrect password or email');
                setIsDisable(true);
                setErr(true);
            }

            return () => {
                setEmail('');
                setPassword('');
                setLoginErr('');
            }
        }
        postLogins();
    }

    return (

        <div className='loginContainer'>
            {showLogin ? <h1 className="logPageTitle">Log In</h1> : <h1>Sign Up</h1>}
            {showLogin && <div className='login'>
                <input type='email' name='email' placeholder='Email' value={email} onChange={e => { setEmail(e.target.value) }}></input>
                <input type='password' name='password' placeholder='Password' value={password} onChange={e => { setPassword(e.target.value) }}></input>
                {err && <p className='loginErr'>{loginErr}</p>}
                <button onClick={login} disabled={isDisable} className='loginBtn'>Submit</button>
                <p style={{
                    textAlign: 'center',
                }}>or</p>
                <LoginWithGoogle />
                <button onClick={goToSignup} className='signupBtn'>Signup</button>
            </div>}
            {showSignup && <Signup />}
        </div>
    );
}

export default Login;