
const checkAnwers = (answer, question, allQuestions) => {
    const answerForQuestionOtherThanCountryAndCapital = answer.charAt(0)
        const currentQuestion = allQuestions.filter(currentQuestion => currentQuestion.question === question);
        if (answer === currentQuestion[0].city) {
            return true;
        } else if (answerForQuestionOtherThanCountryAndCapital === currentQuestion[0].correct) {
            return true;
        }
        else {
            return false;
        } 

}

export default checkAnwers;