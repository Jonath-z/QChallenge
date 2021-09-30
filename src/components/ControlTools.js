import { useState,useEffect} from 'react';
import './ControlTools.css';
const ControlTools = (props) => {
    const [buttonRippleClickSave, setButtonRippleClickSave] = useState('hsl(190, 47%, 86%)');
    const [buttonRippleClickPause, setButtonRippleClickPause] = useState('hsl(190, 47%, 86%)');
    const buttonRippleSave = () => {
        setButtonRippleClickSave('blue');
    }
    const buttonRipplePause = () => {
        setButtonRippleClickPause('blue');
    }
    useEffect(() => {
        if (buttonRippleClickSave === 'blue') {
            setTimeout(setButtonRippleClickSave('hsl(190, 47%, 86%)'), 2000);
        }
    }, [buttonRippleClickSave]);
    useEffect(() => {
        // if (buttonRippleClickPause === 'blue') {
            setTimeout(setButtonRippleClickPause('hsl(190, 47%, 86%)'), 2000);
        // }
    }, [buttonRippleClickPause]);

    return (
        <div className='controlsTolls'>
            <button className='save-button' onClick={() => { props.saveHandler(); buttonRippleSave() }} style={
                {
                    background: buttonRippleClickSave
                }}>
                {props.save}
            </button>
            
            <button className='pause-button' onClick={() => { props.pauseHandler(); buttonRipplePause() }} style={
                {
                    background: buttonRippleClickPause
                }}>
                {props.pause}
            </button>
        </div>
    );
}

export default ControlTools
