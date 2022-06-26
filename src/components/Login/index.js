import Signup from "../SignUp";
import "./Login.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import storage from "../../modules/firbaseConfig";
// import { FaSpinner } from 'react-icons/fa';
import LoginWithGoogle from "../LoginWithGoole";

const getMessages = async () => {
  const allMessages = await fetch(
    `${process.env.REACT_APP_QCHALLENGE_API_URI}/all-messages`
  );
  const formatedMessages = await allMessages.json();
  const encryptMessages = CryptoJS.AES.encrypt(
    JSON.stringify(formatedMessages),
    `${process.env.REACT_APP_CRYPTO_KEY}`
  );
  localStorage.setItem("messages", encryptMessages);
};
getMessages();

const getQuestions = async () => {
  await fetch(`${process.env.REACT_APP_QCHALLENGE_API_URI}/challenges`)
    .then((res) => {
      return res.json();
    })
    .then((myQuestions) => {
      localStorage.setItem("userQuestions", JSON.stringify(myQuestions));
    });
};
getQuestions();

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isDisable, setIsDisable] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const getdefaultAvatar = async () => {
      await storage
        .ref("NicePng_avatar-png_3012856.png")
        .getDownloadURL()
        .then((url) => {
          return url;
        });
    };
    getdefaultAvatar();
  }, []);

  const goToSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  const login = () => {
    setIsDisable(true);
    const postLogins = async () => {
      await fetch(`${process.env.REACT_APP_QCHALLENGE_API_URI}/login`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === "200") {
            window.localStorage.setItem("user", JSON.stringify(data));
            // const allQuestions = JSON.parse(localStorage.getItem('userQuestions'));
            // console.log('all questions :', allQuestions);
            // if (allQuestions !== null) {
            history.push(`/QChallenge/?id=${data.data.id}`);
            // console.log('question is null');
            // }
            setIsDisable(true);
          } else if (data.status === "404") {
            setLoginErr("Incorrect password");
            setIsDisable(true);
            setErr(true);
          } else if (data.status === "404 email") {
            setLoginErr("Incorrect password or email");
            setIsDisable(true);
            setErr(true);
          }
        });

      return () => {
        setEmail("");
        setPassword("");
        setLoginErr("");
      };
    };
    postLogins();
  };

  return (
    <>
      {showLogin && (
        <div className="loginContainer">
          <h1 className="logPageTitle">Log In</h1>
          {showLogin && (
            <div className="login">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              {err && <p className="loginErr">{loginErr}</p>}
              <button onClick={login} disabled={isDisable} className="loginBtn">
                Log in
              </button>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                or
              </p>
              <LoginWithGoogle />
              <p onClick={goToSignup} className="singup-para">
                Create an account
              </p>
            </div>
          )}
        </div>
      )}
      {showSignup && <Signup />}
    </>
  );
};

export default Login;
