
import { useState, useEffect,useRef } from "react";
import { FaSpinner } from 'react-icons/fa';
import './Theme.css';
import Gamewindow from "./Gamewindow";
// import { scryRenderedComponentsWithType } from "react-dom/cjs/react-dom-test-utils.development";

const Gamespace = () => {
    const [challengeTheme, setChallengeTheme] = useState(null);
    const [myThemes, setMyThemes] = useState(null);
    // const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questions, setQuestions] = useState(null);
    // const [questionsInCurrentTheme, setQuestionsIncurrentTheme] = useState(null);
    const [showStart, setShowStart] = useState(false);
    let timmer = useRef(10);
    let maxSecond = 10;
    let questionsInCurrentTheme = useRef(null);

    const [chrono, setChrono] = useState(timmer);
    const [showQuestion, setShowQuestion] = useState(false);

    useEffect(() => {
        async function data() {
            const data = await fetch('../theme');
            const themes = await data.json();
            setMyThemes(themes);
            
        }
        data();
    }, []);

    useEffect(() => {
        const allQuestions = () => {
            const allQuestions = JSON.parse(localStorage.getItem('userQuestions'));
            setQuestions(allQuestions);
        }
        allQuestions();
    }, []);

    useEffect(() => {
        if (challengeTheme) {
            const currentQuestions = questions.filter(question => question.theme == `${challengeTheme}`);
            questionsInCurrentTheme.current = currentQuestions;
            console.log('current questions', questionsInCurrentTheme);

        }
    }, [challengeTheme]);

    const startChallenge = () => {
        generateTheCurrentQuestion();
        setShowStart(false);
        setShowQuestion(true);
        setChronoInterval();
        return timmer = 10;
    }

    let questionIndex = 0;
    let interval;
    const setChronoGame = () => {
        timmer.current = setChrono(maxSecond - 1);
        if (timmer.current === -1) {
            generateTheCurrentQuestion();
            return timmer.current = 10;
        }
    }
    
    const setChronoInterval = () => {
        interval = setInterval(setChronoGame, 1000);
    }
 

    const generateTheCurrentQuestion = () => {
        if (questionsInCurrentTheme !== 'undefined') {
            const randomMaxValue = questionsInCurrentTheme.length;
            const myQuestions = questionsInCurrentTheme.current[questionIndex];
            console.log(myQuestions, 'on index', questionIndex);
            questionIndex++;
            if (questionIndex === randomMaxValue) {

                return {
                    // timer : timmer = 10,
                    resetInterval: clearInterval(interval)
                }
                
            }
        }
    }
        // generateTheCurrentQuestion();


    // const generateRandomIndex = (max) => {
    //     return Math.floor(Math.random() * max);
    // }


    const openChallenge = (e) => {
        setChallengeTheme(e.target.innerHTML);
        setShowStart(true)
        setShowQuestion(false);
        questionIndex = 0;
        console.log(questionIndex);
            // timer : timmer = 10,
    }

    return (
        <div className='gamespaceDiv'>
            
            <div className='ThemeContainer'>
                <h3>Challenges</h3>
                
                {
                    myThemes ? myThemes.map((theme, i) => (
                        <div className='themeContainer'>
                            <p key={i} className='theme' onClick={openChallenge}>{theme.theme}</p>
                        </div>
                    )) : <p>loading Challenges <FaSpinner className='spaniner' /></p>
                }

            </div>
            <div className='gameWindowDiv'>
                <Gamewindow ref={timmer}
                    startChallenge={startChallenge}
                    showButton={showStart}
                    challengeTheme={challengeTheme}
                    showQuestion={showQuestion}
                    chrono={chrono.current}
                />
            </div>
        </div>
    );
}

export default Gamespace;
