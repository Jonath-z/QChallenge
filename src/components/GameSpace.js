
import { useState, useEffect } from "react";
import { FaSpinner } from 'react-icons/fa';
import './Theme.css';
import Gamewindow from "./Gamewindow";
import { scryRenderedComponentsWithType } from "react-dom/cjs/react-dom-test-utils.development";

const Gamespace = () => {
    const [myThemes, setMyThemes] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionInCurrentTheme, setQuestionIncurrentTheme] = useState(null);
    const [showStart, setShowStart] = useState(false);
    let timmer = 10;
    const [chrono, setChrono] = useState(timmer);
    const [showQuestion, setShowQuestion] = useState(false);
    const [challengeTheme, setChallengeTheme] = useState(null);

    useEffect(() => {
        async function data() {
            const data = await fetch('../theme');
            const themes = await data.json();
            setMyThemes(themes);
            
        }
        data();
    }, []);

  const  startChallenge = () => {
      setShowStart(false);
      const allQuestions = JSON.parse(localStorage.getItem('userQuestions'));
    //   console.log(allQuestions);
      allQuestions.map(question => {
          `${question.theme}` === `${challengeTheme}` ? setQuestionIncurrentTheme(question) : console.log('no data');
      });
      setShowQuestion(true);
      setInterval(setChronoGame, 1000);
      getTheCurrentQuestion();
  }
      
    const setChronoGame = () => {
        chrono <= 10 ? setChrono(timmer--) :  timmer = 10;
    }

    const getTheCurrentQuestion = () => {
        const questionIndex = generateRandomIndex(3);
        console.log(questionIndex);        
    }

    chrono == 0 && clearInterval();
    const generateRandomIndex = (max) => {
        return Math.floor(Math.random() * max);
    }

    const openChallenge = (e) => {
        // console.log(e.target.innerHTML);
        setShowStart(true);
        setChallengeTheme(e.target.innerHTML);
        setShowQuestion(false);
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
                    chrono = {chrono}
                />
            </div>
        </div>
    );
}

export default Gamespace;
