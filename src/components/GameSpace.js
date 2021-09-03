
import { useState, useEffect,useRef } from "react";
import { FaSpinner } from 'react-icons/fa';
import './Theme.css';
import Gamewindow from "./Gamewindow";

function usePrevious(data){
    const ref = useRef();
    useEffect(()=>{
      ref.current = data
    }, [data])
    return ref.current
  }

const Gamespace = () => {
    let maxSecond = 10;
    let questionsInCurrentTheme = useRef(null);

    const [challengeTheme, setChallengeTheme] = useState(null);
    const [myThemes, setMyThemes] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [showStart, setShowStart] = useState(false);
    const [chrono, setChrono] = useState(maxSecond);
    const [showQuestion, setShowQuestion] = useState(false);
    const prevTheme = usePrevious(challengeTheme);
  
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

    const changeTheme = () => {
        if (challengeTheme) {
            setShowStart(true);
        }
        if (showQuestion) {
            clearInterval(interval);
            prevTheme && setChallengeTheme(prevTheme);
            const confirmResponse = window.confirm('Do want to leave the challenge ?');
            if (confirmResponse) {
                setShowQuestion(false);
                return reset();
            }
            else {
                setChrono(maxSecond);
            }
            
        }
    }

    // useEffect(() => {
    //     // console.log(prevTheme);
    //     if (challengeTheme) {
    //         setShowStart(true);
    //     }
    //     if (showQuestion) {
    //         clearInterval(interval);
    //         prevTheme && setChallengeTheme(prevTheme);
    //         const confirmResponse = window.confirm('Do want to leave the challenge ?');
    //         if (confirmResponse) {
    //             setShowQuestion(false);
    //             return reset();
    //         }
    //         else {
    //             setChrono(maxSecond);
    //         }
            
    //     }
    // }, [challengeTheme]);

    const startChallenge = () => {
        generateTheCurrentQuestion();
        setShowStart(false);
        setShowQuestion(true);
        setChronoInterval();
        // reset();
    }

    let questionIndex = 0;
    let interval;
    const setChronoGame = () => {
        setChrono(maxSecond--);
        if (maxSecond == -1) {
            generateTheCurrentQuestion();
            return maxSecond = 10;
        }
    }
    
    const setChronoInterval = () => {
        interval = setInterval(setChronoGame, 1000);
    }


    const generateTheCurrentQuestion = () => {
        if (questionsInCurrentTheme !== 'undefined') {
            const randomMaxValue = questionsInCurrentTheme.current.length + 1;
            const myQuestions = questionsInCurrentTheme.current[questionIndex];
            console.log(myQuestions, 'on index', questionIndex);
            console.log(randomMaxValue);
            questionIndex++;
            if (questionIndex == randomMaxValue) {
                return reset();
            }
        }
    }

    const reset = () => {
        maxSecond = 10;
        setChrono(maxSecond);
        clearInterval(interval);
        console.log('reset');
    }
        // generateTheCurrentQuestion();


    // const generateRandomIndex = (max) => {
    //     return Math.floor(Math.random() * max);
    // }


    const openChallenge = (e) => {
        setChallengeTheme(e.target.innerHTML);
        // console.log(questionIndex);
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
                <Gamewindow 
                    startChallenge={startChallenge}
                    showButton={showStart}
                    challengeTheme={challengeTheme}
                    showQuestion={showQuestion}
                    chrono={chrono}
                />
            </div>
        </div>
    );
}

export default Gamespace;
