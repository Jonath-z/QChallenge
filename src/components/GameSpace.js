
import { useState, useEffect,useRef } from "react";
import { FaSpinner } from 'react-icons/fa';
import './Theme.css';
import './Gamewindow.css'
import Gamewindow from "./Gamewindow";
import { io } from "socket.io-client";
// import { options } from "../../server/routes/challenge";

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
    let timmer = useRef(10);
    let interval = useRef();
    const questions = useRef();
    const [showStart, setShowStart] = useState(false);
    const [chrono, setChrono] = useState(timmer.current);
    const [showQuestion, setShowQuestion] = useState(false);
    const [contry, setContry] = useState('');
    const questionAswersOptions = useRef();
    // const [questionFormula, setQuestionFormula] = useState('');
    const prevTheme = usePrevious(challengeTheme);
  
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

    useEffect(() => {
        setShowStart(true);
        if (challengeTheme) {
            const currentQuestions = questions.current.filter(question => question.theme === `${challengeTheme}`);
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

    //**************************************GENERATE THE CURRENTE QUESTION************************************************ */
    const generateTheCurrentQuestion = () => {
        if (questionsInCurrentTheme !== 'undefined') {
            const randomMaxValue = questionsInCurrentTheme.current.length + 1;
            const myQuestions = questionsInCurrentTheme.current[questionIndex];
            // console.log(myQuestions, 'on index', questionIndex);
            setContry(myQuestions.question);
            // socket.emit('question', { theme: challengeTheme, question: myQuestions.question });
            // console.log(randomMaxValue);
            questionIndex++;
            if (challengeTheme === 'Contry and Capital') {
                const answeroptions = generateOptionForContryAndCapital(myQuestions.city, questionsInCurrentTheme.current);
                questionAswersOptions.current = answeroptions;
                console.log(answeroptions);
                // const display = displayAnswerOptions();
                // console.log(display);
            } else {

                console.log(questionsInCurrentTheme.current.options);
                questionAswersOptions.current = questionsInCurrentTheme.current.options;
            }
            if (questionIndex === randomMaxValue) {
                return reset();
            }
        }
    }

// *************************************GENERATE THE ANSWERS OPTION********************************************************/
    const generateOptionForContryAndCapital = (correct, allCountries) => {
        let wrongCountries = allCountries.filter(country => country.city !== contry.correct);
        // console.log(wrongCountries);
        const answerOption = 5;
        const correctAnswerPosition = Math.floor(Math.random() * (answerOption + 1));
        const answers = [];
        for (let i = 0; i < answerOption; i++) {
            if (i === correctAnswerPosition) {
                answers.push(correct);
            }
            else {
                let randomAnswer = wrongCountries[Math.floor(Math.random() * wrongCountries.length)];
                wrongCountries = wrongCountries.filter(country => country.city !== randomAnswer.city);
                answers.push(randomAnswer.city);
            }
        }
        // console.log(answers);
        return answers;
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
        // timmer.current = timmer.current
        if (prevTheme !== e.target.innerHTML && !showStart) {
            clearInterval(interval.current);
            prevTheme && setChallengeTheme(prevTheme);
            const confirmResponse = window.confirm('Do want to leave the challenge ?');
           
            if (confirmResponse) {
                setChallengeTheme(e.target.innerHTML)
                // e.target.innerHTML === 'Contry and Capital' && setQuestionFormula('what is the Capital of');
               return reset();
            }
            else {
              return  setChrono(timmer.current);
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
                            <p key={theme.index} className='theme' onClick={openChallenge}>{theme.theme}</p>
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
                    contry={contry}
                    answerOption={questionAswersOptions.current}
                    // questionFormula={questionFormula}
                />
            </div>
        </div>
    );
}

export default Gamespace;
