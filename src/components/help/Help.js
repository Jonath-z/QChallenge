import './Help.css';
import { useHistory } from 'react-router';

const Help = () => {
    let history = useHistory();
    return (
        <div className='help'>
            <div className='help-subContainer'>
            <h1 className='help-h1'>HELP:</h1>
            <h3>Self challenge</h3>
            <p>
                Select your challenge theme,then start.
            </p>
            <h3>Make a duel with your friend :</h3>
            <h5>* Create a duel</h5>
            <p className='create-duel-para'>
                - Go to option <b>Create the duel</b>,<br />
                - Copy the duel ID and send it to your friend,<br />
                - Wait to your friend join the duel.
            </p>
            <h5>* Join the duel</h5>
            <p className='join-duel-para'>
                - Go to option <b>Join the duel</b>,<br />
                - Copy the duel ID received on message,<br />
                - Past it in the duel ID form,<br />
                - Then click to <b>Join</b>
            </p>
            <h4>Ready to start ??</h4>
            <p>
                Wait,before, go to <b>Level</b> and click to <b>Set Level</b>,to load all
                parameters about the duel
            </p>
            <h5 className='start-para'
                onClick={() => {
                    history.push(`/QChallenge/?id=${JSON.parse(localStorage.getItem('user')).data.id}`)
                }}
            >Here we are , <b>Start the duel</b></h5>
            </div>
        </div>
    );
}

export default Help
