
import { useState, useEffect,useRef } from "react";
import { FaSpinner } from 'react-icons/fa';
import './Theme.css';
import './Gamewindow.css'
import Gamewindow from "./Gamewindow";
import ScoreBar from "./ScoreBar";
import generateOptionForContryAndCapital from '../modules/option';
import generateOptionsOtherThanCountryAndCapital from "../modules/generateOption";
import generateQuestionOtherThanCountryAndCapital from "../modules/question";
import checkAnwers from "../modules/checkAnswer";
// import gameLevel from "../modules/gameLevel";
import scoreProgress from "../modules/scoreProgress";
import { io } from "socket.io-client";


const socket = io('/');

// custome hook
function usePrevious(data){
    const ref = useRef();
    useEffect(()=>{
      ref.current = data
    }, [data])
    return ref.current
}

const Gamespace = () => {
    let questionsInCurrentTheme = useRef(null);
    const [challengeTheme, setChallengeTheme] = useState('Contry and Capital');
    const [myThemes, setMyThemes] = useState(null);
    let maxTimmer = useRef(10);
    let timmer = useRef(maxTimmer);
    let interval = useRef();
    const questions = useRef();
    const [showStart, setShowStart] = useState(false);
    const [chrono, setChrono] = useState(timmer.current);
    const [showQuestion, setShowQuestion] = useState(false);
    const [contry, setContry] = useState('');
    const questionAswersOptions = useRef();
    let questionIndex = useRef(0);
    let score = useRef(0);
    let progressBar = useRef(0);
    const [otherQuestion, setOtherQuestion] = useState('');
    const prevTheme = usePrevious(challengeTheme);
// *************************** FETCH DATA (THEME AND QUESTIONS) ****************************************/  
    useEffect(() => {
        async function data() {
            const data = await fetch('../theme');
            const themes = await data.json();
            window.localStorage.setItem('theme', JSON.stringify(themes));
            const myThemes = JSON.parse(localStorage.getItem('theme'));
            setMyThemes(myThemes);
        }
        data();
        const allQuestions = () => {
            const allQuestions = JSON.parse(localStorage.getItem('userQuestions'));
            // setQuestions(allQuestions);
            questions.current = allQuestions;
            // console.log(allQuestions);
        }
        allQuestions();
    }, []);
// *********************************** SET CURRENT QUESTION DEPENDING TO THE THEME CHOSEN ***********************/
    useEffect(() => {
        setShowStart(true);
        if (challengeTheme) {
            const currentQuestions = questions.current.filter(question => question.theme === `${challengeTheme}`);
            const currentQuestionsWithCity = currentQuestions.filter(question => question.city !== null);
            questionsInCurrentTheme.current = currentQuestionsWithCity;
            console.log('current questions', questionsInCurrentTheme);

        }
    }, [challengeTheme]);
// *************************** START CHALLENGE EVENT HANDLER**********************************/
    const startChallenge = () => {
        generateTheCurrentQuestion();
        setShowStart(false);
        setShowQuestion(true);
        setChronoInterval();
        // reset();
    }

// **************************** SET GAME TIMER ************************************************************// 
    const setChronoGame = () => {
        setChrono(timmer.current--);
        if (timmer.current === -1) {
            generateTheCurrentQuestion();
            return setChrono(timmer.current = 10);
        }
    }
    
    const setChronoInterval = () => {
        interval.current = setInterval(setChronoGame, 1000);
    }

    //**************************************GENERATE THE CURRENTE QUESTION********************************/
    
    const generateTheCurrentQuestion = () => {
        if (questionsInCurrentTheme !== 'undefined') {
            const randomMaxValue = questionsInCurrentTheme.current.length + 1;
            const myQuestions = questionsInCurrentTheme.current[questionIndex.current];
            // console.log(myQuestions, 'on index', questionIndex.current);
            setContry(myQuestions.question);
            // console.log(randomMaxValue);
            questionIndex.current++;
            if (challengeTheme === 'Contry and Capital') {
                const answeroptions = generateOptionForContryAndCapital(myQuestions.city, questionsInCurrentTheme.current,contry);
                questionAswersOptions.current = answeroptions;
                console.log(answeroptions);
                // console.log(display);
            } else {
                const options = questionsInCurrentTheme.current.map(question => question.options);
                // console.log(options)
                const currentQuestion = generateQuestionOtherThanCountryAndCapital(questionsInCurrentTheme.current, questionIndex.current);
                setOtherQuestion(currentQuestion);
                console.log(currentQuestion);
                const currentOptions = generateOptionsOtherThanCountryAndCapital(options, questionIndex.current);
                questionAswersOptions.current = currentOptions;
                
            }
            if (questionIndex.current === randomMaxValue) {
                return reset();
            }
        }
    }
// ********************************* CHECK ANSWERS *********************************************/
    const getAnswer = (e) => {
        const answer = e.target.innerHTML;
        const answerState = checkAnwers(answer, contry, questionsInCurrentTheme.current);
        if (answerState === true) {
            score.current++;
            progressBar.current = scoreProgress(score.current, questionsInCurrentTheme.current);
            // progressBar.current = currentProgressBar;
            // console.log(currentProgressBar, '%');
            clearInterval(interval.current);
            setTimeout(answerChecked,1000);
            generateTheCurrentQuestion(); 
        } else {
            navigator.vibrate(200);
            clearInterval(interval.current);
            setTimeout(answerChecked,1000);
            generateTheCurrentQuestion(); 
        }
        // console.log(answer, answerState);
    }

// *************************** ANSWER CHECKED ******************************************//
    const answerChecked = () => {
        timmer.current =10;
        setChrono(timmer.current);
        setChronoInterval();
        console.log('answerChecked');
    }

// ****************************** RESET THE CHRONO ***********************************************************/
    const reset = () => {
        // maxSecond = 10;
        clearInterval(interval.current);
        timmer.current = 10;
        setChrono(timmer.current);
        setShowQuestion(false);
        setShowStart(true);
        console.log('reset');
    }

//**************************** OPEN CHALLENGE EVENT (CLICK ON THEME)********************************************/
    const openChallenge = (e) => {
        console.log('timmer current', timmer.current);
        if (prevTheme !== e.target.innerHTML && !showStart) {
            clearInterval(interval.current);
            prevTheme && setChallengeTheme(prevTheme);
            const confirmResponse = window.confirm('Do want to leave the challenge ?');
           
            if (confirmResponse) {
                setChallengeTheme(e.target.innerHTML)
                setContry(questionsInCurrentTheme.current[0]);
                setOtherQuestion('');
                // e.target.innerHTML === 'Contry and Capital' && setQuestionFormula('what is the Capital of');
               return reset();
            }
            else {
                setChrono(timmer.current);
                setChronoInterval();
                questionIndex.current = 0;
            }
        }
        else {
            questionIndex.current = 0;
           return setChallengeTheme(e.target.innerHTML);
        }
    }

    return (
        <div className='gamespaceDiv'>
            
            <div className='ThemeContainer'>
                <h3>Challenges</h3>
                
                {
                    myThemes ? myThemes.map((theme, i) => (
                        <div className='themeContainer'>
                            <p key={theme.index} className='theme' onClick={openChallenge}>{theme.theme}</p>
                        </div>
                    )) : <p>loading Challenges <FaSpinner className='spaniner' /></p>
                }

            </div>
            <div className='gameWindowDiv'>
                <ScoreBar
                    progress={progressBar.current}
                    score={score.current}
                    chrono={chrono}
                    // setLevel={gameLevel}
                />
                <Gamewindow
                    startChallenge={startChallenge}
                    showButton={showStart}
                    challengeTheme={challengeTheme}
                    showQuestion={showQuestion}
                    // chrono={chrono}
                    contry={contry}
                    answerOption={questionAswersOptions.current}
                    question={otherQuestion}
                    getAnswer={getAnswer}
                    // questionFormula={questionFormula}
                />
            </div>
        </div>
    );
}

export default Gamespace;
