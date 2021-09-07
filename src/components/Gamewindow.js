import { useEffect } from "react";
import './Gamewindow.css'
// import Theme from "./Theme";

const Gamewindow = (props) => {
    // const [questions, setQuestions] = useState(null);
    useEffect(() => {
        const getQuestions = async () => {
            const questions = await fetch('../challenges');
            const myQuestions = await questions.json();
            // console.log(myQuestions);
            window.localStorage.setItem('userQuestions', JSON.stringify(myQuestions));
        }
        getQuestions();
    }, []);

    return (
        <div>
            <h4>{props.challengeTheme}</h4>
            <div>
                <div className='chronoContainer'>
                    <p>{props.chrono}S</p>
                </div>
                {props.showQuestion && <div className='questionContainer'>
                    <p><span>{props.contry}</span></p>
                </div>}
            </div>
            {props.showButton && <button className="startButton" onClick={props.startChallenge}>Start the Challenge</button>}
        </div>
    );
}

export default Gamewindow;
