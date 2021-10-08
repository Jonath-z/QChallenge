import './ScoreBar.css';
import { FiCheck, FiX } from 'react-icons/fi';
import MediaQuery from 'react-responsive';

const ScoreBar = (props) => {
    return (
        <div className='ScoreBar'>
            <MediaQuery minWidth={300} maxWidth={414}>
            <div className='chronoContainer'>
                {props.chrono}S
            </div>
            <div className='score-div'>Score {props.score} </div>
            <div className="level-container">
                <p className='level-para'>Level: { props.level}</p>
                { props.showDropLevelList && <div className="level-list">
                    <ul className='level-list-ul'>
                        <li className='level-list-li' onClick={props.setLevel}>Low</li>
                        <li className='level-list-li' onClick={props.setLevel}>Medium</li>
                        <li className='level-list-li' onClick={props.setLevel}>Hight</li>
                    </ul>
                </div>}
                {props.showDropDuelLevelList &&
                    <div className="level-list">
                        <ul className='level-list-ul'>
                        <li className='level-list-li' onClick={props.setLevel}>Set Duel level</li>
                        </ul>
                        </div>
                }
            </div>
            </MediaQuery>
            <MediaQuery minWidth={416} maxWidth={2000}>
            <div className='chronoContainer'>
                {props.chrono}S
            </div>
            <div className='score-div'>Score {props.score} </div>
            <div className="level-container">
                <p className='level-para'>Level: { props.level}</p>
                { props.showDropLevelList && <div className="level-list">
                    <ul className='level-list-ul'>
                        <li className='level-list-li' onClick={props.setLevel}>Low</li>
                        <li className='level-list-li' onClick={props.setLevel}>Medium</li>
                        <li className='level-list-li' onClick={props.setLevel}>Hight</li>
                    </ul>
                </div>}
                {props.showDropDuelLevelList &&
                    <div className="level-list">
                        <ul className='level-list-ul'>
                        <li className='level-list-li' onClick={props.setLevel}>Set Duel level</li>
                        </ul>
                        </div>
                }
            </div>
            <div className='progress-bar'>
                <progress className='progress-bar-dynamic' value={props.progress} max="100"></progress>
        
                {props.success ?<FiCheck className='chechAnswerSuccess' />:<FiX className='chechAnswerNoSuccess'/>}

            </div>
            </MediaQuery>
        </div>
    );
}

export default ScoreBar
