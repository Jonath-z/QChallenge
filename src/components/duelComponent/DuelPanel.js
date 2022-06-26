import "./DuelPanel.css";
import MediaQuery from "react-responsive";
import { GoStop } from "react-icons/go";
const DuelPanel = (props) => {
  return (
    <>
      {/************************************** MEDIA QUERY (PHONE INTERFACE)**********************************  */}
      <div className="duelPanel">
        <MediaQuery minWidth={300} maxWidth={414}>
          <div className="duelPannel-button-controler">
            <button className="stop-duel stop-duel-phone-device">
              <GoStop onClick={props.stopDuel} />
            </button>
            {/* <button className='show-duel-details' onClick={props.showDuelDetails}>Details</button> */}
          </div>
          <p className="duelLevel-container">{props.duelLevel}</p>
          <div className="duelCreator-panel">
            <p className="duelCreator-pseudo">{props.duelCreatorPseudo}</p>
            <p className="duelCreator-score">{props.duelCreatorScore}</p>
          </div>
          <p className="versus-container">VS</p>
          <div className="joiner-pannel">
            <p className="joiner-pseudo">{props.duelJoinerPseudo}</p>
            <p className="joiner-score">{props.duelJoinerScore}</p>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={416} maxWidth={2000}>
          <div className="duelPannel-button-controler">
            <button className="stop-duel" onClick={props.stopDuel}>
              Stop the duel
            </button>
            <button
              className="show-duel-details"
              onClick={props.showDuelDetails}
            >
              Details
            </button>
          </div>
          <p className="duelLevel-container">{props.duelLevel}</p>
          <div className="duelCreator-panel">
            <p className="duelCreator-pseudo">{props.duelCreatorPseudo}</p>
            <p className="duelCreator-score">{props.duelCreatorScore}</p>
          </div>
          <p className="versus-container">VS</p>
          <div className="joiner-pannel">
            <p className="joiner-pseudo">{props.duelJoinerPseudo}</p>
            <p className="joiner-score">{props.duelJoinerScore}</p>
          </div>
        </MediaQuery>
      </div>
    </>
  );
};

export default DuelPanel;
