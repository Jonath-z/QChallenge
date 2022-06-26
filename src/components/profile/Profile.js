import "./Profile.css";
const Profile = (props) => {
  return (
    <div className="profile-container">
      <div
        className="profile"
        stye={{
          display: "block",
        }}
        onClick={props.stillShowingUserProfileDetails}
      >
        <div className="profile-image">
          <img src={props.avatar} className="user-profile-image" alt="" />
        </div>
        {props.userScore !== undefined &&
          props.userScore.map((score, index) => {
            return (
              <div className="user-profile-details" key={index}>
                <ul className="user-profile-details-ul">
                  <li className="user-profile-details-li">{score.theme}</li>
                  <li className="user-profile-details-li">
                    Score: {score.score}
                  </li>
                  <li className="user-profile-details-li">
                    Questions: {score.level}
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
