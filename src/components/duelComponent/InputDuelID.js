import './InputDuelID.css';
import { MdCancel } from 'react-icons/md';
import MediaQuery from 'react-responsive';
const InputDuelID = (props) => {
    return (
        <div className='inputDuelID-container'>
            {/************************************** MEDIA QUERY (PHONE INTERFACE)**********************************  */}
            <MediaQuery minWidth={300} maxWidth={414}>
                <MdCancel className='cancelIcon' onClick={props.showDuelInputID} />
                <input type='text' className='inputDuelID' placeholder='Duel ID' required={true} onChange={props.getDuelIDFromJoiner} />
                <button className='sendInputDuelID' onClick={props.joinTheDuel}>Join</button>
            </MediaQuery>
            <MediaQuery minWidth={416} maxWidth={2000}>
                <MdCancel className='cancelIcon' onClick={props.showDuelInputID} />
                <label className='inputDuelID-label'>Duel ID</label>
                <input type='text' className='inputDuelID' placeholder='ID' required={true} onChange={props.getDuelIDFromJoiner} />
                <button className='sendInputDuelID' onClick={props.joinTheDuel}>Join</button>
            </MediaQuery>
        </div>
    );
}

export default InputDuelID
