import { MdCancel } from 'react-icons/md';
import { IoCopySharp } from 'react-icons/io5'
import './DuelDetails.css';


const DuelDetails = (props) => {
    return (
        <div className='DuelDetails'>
            <MdCancel className='cancelIcon' onClick={props.showDuelDetails} />
            <p className='duelID'>Duel ID: {props.duelID} <IoCopySharp
                className='copyIcon'
                onClick={props.copyDuelID}
            /></p>
            <p className='duelLevel'>Duel Level: {props.duelLevel}</p>
        </div>
    );
}

export default DuelDetails
