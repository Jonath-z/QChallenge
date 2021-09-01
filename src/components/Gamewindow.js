import { useState, useEffect } from "react";
// import Theme from "./Theme";

const Gamewindow = (props) => {
    const [questions, setQuestions] = useState(null);
    useEffect(() => {
        const getQuestions = async () => {
            const questions = await fetch('../challenges');
            const myQuestions = await questions.json();
            console.log(myQuestions);
            window.localStorage.setItem('userQuestions', JSON.stringify(myQuestions));
        }
        getQuestions();
    }, []);

    return (
        <div>
            <h4>{props.challengeTheme}</h4>
            <div>
        
            </div>
            {props.showButton && <button onClick={props.startChallenge}>Start the Challenge</button>}
        </div>
    );
}

export default Gamewindow;
