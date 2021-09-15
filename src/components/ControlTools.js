
import './ControlTools.css';
const ControlTools = (props) => {
    return (
        <div className='controlsTolls'>
            <button className='save-button' onClick={props.saveHandler}>{props.save}</button>
            <button className='pause-button' onClick={props.pauseHandler}>{props.pause}</button>     
        </div>
    )
}

export default ControlTools
