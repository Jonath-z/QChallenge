const scoreProgress = (score, allQuestions) => {
    const progressValue = (score / allQuestions.length) * 100;
    console.log(score);
    return progressValue;
}

export default scoreProgress;