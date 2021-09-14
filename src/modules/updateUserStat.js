
const updateUserStat = async (Newscore,theme,level,id) => {
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
                id: id,
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