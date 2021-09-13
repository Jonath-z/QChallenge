import './ScoreBar.css';

const ScoreBar = (props) => {
    return (
        <div className='ScoreBar'>
            <div className='chronoContainer'>
                <p className="chrono-para">{props.chrono}S</p>
            </div>
            <div className='score-div'>Score {props.score}</div>
            <div className="level-container">
                <p className='level-para'>Level
                    <div className="level-list">
                        <ul className='level-list-ul'>
                            <li className='level-list-li' onClick={props.setLevel}>Low</li>
                            <li className='level-list-li' onClick={props.setLevel}>Medium</li>
                            <li className='level-list-li'onClick={props.setLevel}>Hight</li>
                        </ul>
                    </div>
                </p>
            </div>
            <div className='progress-bar'>
                <progress className='progress-bar-dynamic' value={props.progress} max="100"></progress>
            </div>
        </div>
    );
}

export default ScoreBar
