import './DuelPanel.css';
const DuelPanel = (props) => {
    return (
        <div className='duelPanel'>
            <div className='duelPannel-button-controler'>
                <button className='stop-duel' onClick={props.stopDuel}>Stop the duel</button>
                <button className='show-duel-details' onClick={props.showDuelDetails}>Details</button>
            </div>
            <p className='duelLevel-container'>{props.duelLevel}</p>
            <div className='duelCreator-panel'>
                <p className='duelCreator-pseudo'>{props.duelCreatorPseudo}</p>
                <p className='duelCreator-score'>{props.duelCreatorScore}</p>
            </div>
            <p className='versus-container'>VS</p>
            <div className='joiner-pannel'>
                <p className='joiner-pseudo'>{props.duelJoinerPseudo}</p>
                <p className='joiner-score'>{props.duelJoinerScore}</p>
            </div>
        </div>
    );
}

export default DuelPanel
