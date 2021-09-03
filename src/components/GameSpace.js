
import { useState, useEffect,useRef } from "react";
import { FaSpinner } from 'react-icons/fa';
import './Theme.css';
import Gamewindow from "./Gamewindow";


// custome hook
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

    const [challengeTheme, setChallengeTheme] = useState('Contry and Capital');
    const [myThemes, setMyThemes] = useState(null);
    // const [questions, setQuestions] = useState(null);
    const questions = useRef();
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
        const allQuestions = () => {
            const allQuestions = JSON.parse(localStorage.getItem('userQuestions'));
            // setQuestions(allQuestions);
            questions.current = allQuestions;
            // console.log(allQuestions);
        }
        allQuestions();
    }, []);

    useEffect(() => {
        setShowStart(true);
        if (challengeTheme) {
            const currentQuestions = questions.current.filter(question => question.theme == `${challengeTheme}`);
            questionsInCurrentTheme.current = currentQuestions;
            console.log('current questions', questionsInCurrentTheme);

        }
    }, [challengeTheme]);

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
        setShowQuestion(false);
        setShowStart(true);
        console.log('reset');
    }


    const openChallenge = (e) => {
        if (prevTheme !== e.target.innerHTML && !showStart) {
            clearInterval(interval);
            prevTheme && setChallengeTheme(prevTheme);
            const confirmResponse = window.confirm('Do want to leave the challenge ?');
           
            if (confirmResponse) {
                setChallengeTheme(e.target.innerHTML)
                maxSecond = 10;
                setChrono(maxSecond);
                clearInterval(interval);
                setShowQuestion(false);
                setShowStart(true);
                
            }
            else {
                return setChrono(maxSecond);
            }
        }
        else {
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
