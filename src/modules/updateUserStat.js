
const updateUserStat = async (Newscore, challengeTheme, level) => {
    const param = window.location.search;
    const userID = param.replace('?id=', '');
    const userData = JSON.parse(localStorage.getItem('user'));
    userData.data.score.find(({ theme }) => theme === challengeTheme).score = Newscore;
    userData.data.score.find(({ theme }) => theme === challengeTheme).level = level
    userData.duelLevel = level;
    localStorage.setItem('user', JSON.stringify(userData));
    try {
        await fetch(`${REACT_APP_QCHALLENGE_API_URI}/update`, {
            method: "POST",
            headers: {
                'accept': '*/*',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: userID,
                theme: challengeTheme,
                score: Newscore,
                level: level,
                duelLevel: level
            })
        });
    }
    catch (err) {
        console.log(err);
    }
}

export default updateUserStat;