 
// *************** GENERATE THE ANSWER OPTION FOR OTHER CHALLEGES***********************/
const generateOptionsOtherThanCountryAndCapital = (allOptions, questonIndex) => {
    const currentOptions = allOptions[questonIndex];
    return currentOptions
}

// *****************GENERATE THE ANSWERS OPTION FOR COUNTRY AND CAPITAL***********************/
const generateOptionForContryAndCapital = (correct, allCountries,currentCountry) => {
   let wrongCountries = allCountries.filter(country => country.city !== currentCountry.correct);
    // console.log(wrongCountries);
    const answerOption = 5;
    const correctAnswerPosition = Math.floor(Math.random() * (answerOption + 1));
    const answers = [];
    for (let i = 0; i < answerOption; i++) {
        if (i === correctAnswerPosition) {
            answers.push(correct);
        }
        else {
            let randomAnswer = wrongCountries[Math.floor(Math.random() * wrongCountries.length)];
            wrongCountries = wrongCountries.filter(country => country.city !== randomAnswer.city);
            answers.push(randomAnswer.city);
        }
    }
    // console.log(answers);
    return answers;
}

export {
    generateOptionsOtherThanCountryAndCapital,
    generateOptionForContryAndCapital as default
}
