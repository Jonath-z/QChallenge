
const updateUserStat = async (Newscore, theme, level) => {
    const param = window.location.search;
    const userID = param.replace('?id=', '');
    const userData = JSON.parse(localStorage.getItem('user'));
    userData.data.score.find(({ theme }) => theme === theme).score = Newscore;
    userData.data.score.find(({ theme }) => theme === theme).level = level
    localStorage.setItem('user', JSON.stringify(userData));
    try {
        await fetch('../update', {
            method: "POST",
            headers: {
                'accept': '*/*',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                id: userID,
                theme: theme,
                score: Newscore,
                level:level
            })
        })
    }
    catch (err) {
        console.log(err);
    }
}

export default updateUserStat;