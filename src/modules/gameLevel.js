const gameLevel = (e, maxTimmer) => {
    if (e.target.innerHTML === 'Low') {
        console.log('timmer', 20);
        return maxTimmer.current = 20;
    } else if (e.target.innerHTML === 'Medium') {
        console.log('timmer', 10);
        return maxTimmer.current = 10;
    } else if (e.target.innerHTML === 'Hight') {
        console.log('timmer', 5);
        return maxTimmer.current = 5;
    }
    
}

export default gameLevel;