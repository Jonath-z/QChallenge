import './InputDuelID.css';
import { MdCancel } from 'react-icons/md';
const InputDuelID = (props) => {
    return (
        <div className='inputDuelID-container'>
            <MdCancel className='cancelIcon' onClick={props.showDuelInputID} />
            <label className='inputDuelID-label'>Duel ID</label>
            <input type='text' className='inputDuelID' placeholder='ID' required={true} onChange={props.getDuelIDFromJoiner }/>
            <button className='sendInputDuelID' onClick={props.joinTheDuel}>Join</button>
        </div>
    )
}

export default InputDuelID
