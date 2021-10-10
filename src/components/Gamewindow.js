import { useState } from 'react';
import './Gamewindow.css';


const Gamewindow = (props) => {
    const [background, setBackground] = useState('rgb(3,4,56)');
    return (
        <div >
            <h4 className='challenge-title'>{props.challengeTheme}</h4>
            <div >
                {/* <div className='chronoContainer'>
                    <p>{props.chrono}S</p>
                </div> */}
                {props.challengeTheme === 'Contry and Capital' ? props.showQuestion && <div className='questionContainer'>
                    <p className='country'> What's the Capital of <span>{props.contry}</span></p>
                </div> : <p className='question'>{props.question}</p>}
            </div>
            {props.showButton &&  <button className="startButton" onClick={props.startChallenge} >Start the Challenge</button>}
            {props.showQuestion && <div className='AnswerOptionContainer'>
                <div className='option-subContainer'>
                    {props.answerOption.map((option, i) => {
                        return <p className='Answeroption' key={i} onClick={(e) => {
                            props.getAnswer(e);
                            setTimeout(setBackground('rgb(3,4,56)'), 100);
                        }
                        } style={{
                            background: background,
                            color:'white'
                        }}>{option}</p>
                    }
                    )}
                </div>
            </div>}
        </div>
    );
}

export default Gamewindow;
