const gameLevel = (e)=>{
    if (e.target.innerHTML === 'Low') {
        console.log(e.target.innerHTML)
        return  20;
    } else if (e.target.innerHTML === 'Medium') {
        return  10;
    } else if (e.target.innerHTML === 'Hight') {
        return  20;
    }
    
}

export default gameLevel;