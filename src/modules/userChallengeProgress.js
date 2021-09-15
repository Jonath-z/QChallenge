const userChallengeProgress = (questionIndex, allQuestions) => {
    const progressValue = (questionIndex / allQuestions.length) * 100;
    // console.log(questionIndex);
    return progressValue;
}

export default userChallengeProgress;