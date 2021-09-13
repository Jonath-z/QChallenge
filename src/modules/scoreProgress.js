const scoreProgress = (score, allQuestions) => {
    const progressValue = (score * allQuestions.length) / 100;
    return progressValue;
}

export default scoreProgress;