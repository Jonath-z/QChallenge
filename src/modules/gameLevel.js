const gameLevel = (e, maxTimmer) => {
    if (e.target.innerHTML === 'Low') {
        // console.log('timmer', 20);
////////////////////////////////////// set Level for duel usage /////////////////////////////////////
        localStorage.setItem('duelLevel', e.target.innerHTML);
        return maxTimmer.current = 20;
    } else if (e.target.innerHTML === 'Medium') {
        // console.log('timmer', 10);
////////////////////////////////////// set Level for duel usage /////////////////////////////////////
        localStorage.setItem('duelLevel', e.target.innerHTML);
        return maxTimmer.current = 10;
    } else if (e.target.innerHTML === 'Hight') {
        // console.log('timmer', 5);
////////////////////////////////////// set Level for duel usage /////////////////////////////////////
        localStorage.setItem('duelLevel', e.target.innerHTML);
        return maxTimmer.current = 5;
    }
    
}

export default gameLevel;