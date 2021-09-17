
import './Gamewindow.css';

const Gamewindow = (props) => {
    return (
        <div>
            <h4>{props.challengeTheme}</h4>
            <div >
                {/* <div className='chronoContainer'>
                    <p>{props.chrono}S</p>
                </div> */}
                {props.challengeTheme === 'Contry and Capital' ? props.showQuestion && <div className='questionContainer'>
                    <p className='country'> What's the Capital of <span>{props.contry}</span></p>
                </div> : <p className='question'>{props.question}</p>}
            </div>
            {props.showButton && <button className="startButton" onClick={props.startChallenge}>Start the Challenge</button>}
            {props.showQuestion && <div className='AnswerOptionContainer'>
                <div className='option-subContainer'>
                    {props.answerOption.map((option, i) => {
                        // if (option === null) {
                        //     option[i] = 'no capital available';
                        // }
                        return <p className='Answeroption' key={i} onClick={props.getAnswer}>{option}</p>
                    }
                    )}
                </div>
            </div>}
        </div>
    );
}

export default Gamewindow;
