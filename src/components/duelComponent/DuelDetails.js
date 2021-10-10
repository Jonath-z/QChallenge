import { MdCancel } from 'react-icons/md';
import { IoCopySharp } from 'react-icons/io5';
import MediaQuery from 'react-responsive';
import './DuelDetails.css';


const DuelDetails = (props) => {
    return (
        <div className='DuelDetails'>
            <MediaQuery minWidth={300} maxWidth={414}>
            <MdCancel className='cancelIcon' onClick={props.showDuelDetails} />
            <p className='duelID'>Duel ID: {props.duelID} <IoCopySharp
                className='copyIcon'
                onClick={props.copyDuelID}
            /></p>
            <p className='duelLevel'>Duel Level: {props.duelLevel}</p>
            </MediaQuery>

            <MediaQuery minWidth={416} maxWidth={2000}>
            <MdCancel className='cancelIcon' onClick={props.showDuelDetails} />
            <p className='duelID'>Duel ID: {props.duelID} <IoCopySharp
                className='copyIcon'
                onClick={props.copyDuelID}
            /></p>
            <p className='duelLevel'>Duel Level: {props.duelLevel}</p>
            </MediaQuery>
        </div>
    );
}

export default DuelDetails
