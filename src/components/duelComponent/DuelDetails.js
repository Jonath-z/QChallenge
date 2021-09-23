import { MdCancel } from 'react-icons/md';
import { IoCopySharp } from 'react-icons/io5'
import { useState,useEffect } from 'react';
import './DuelDetails.css';


const DuelDetails = (props) => {
    // const [duelLevel, setDuelLevel] = useState();

    // const getduelValue = () => {
    //     const currentUserData = JSON.parse(localStorage.getItem('user'));
    //     const currentDuelLevel = currentUserData.duelLevel;
    //     console.log(currentDuelLevel);
    //     setDuelLevel(currentDuelLevel);
    // }
    // setInterval(getduelValue, '1');
    return (
        <div className='DuelDetails'>
            <MdCancel className='cancelIcon' onClick={props.showDuelDetails} />
            <p className='duelID'>Duel ID: {props.duelID} <IoCopySharp
                className='copyIcon'
                onClick={props.copyDuelID}
            /></p>
            <p className='duelLevel'>Duel Level: {'Medium'}</p>
        </div>
    );
}

export default DuelDetails
