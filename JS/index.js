
const text = document.querySelector('#ipsum_text');
const btn = document.querySelector('#generate');
const numOfSent = document.getElementById("number_of_sent");
const numOfSentRange = document.getElementById("sentences");

//get the value from the slider
function getSliderValue() {
    const slider = document.querySelector('.slider');
    return slider.value;
}

function syncSentNumbers(e) {
    const value = e.target.value;
    numOfSent.value = value;
    numOfSentRange.value = value;
  }

numOfSent.addEventListener("input", syncSentNumbers);
numOfSentRange.addEventListener("input", syncSentNumbers);
//get a noun, a verb, another noun, a preposition and a corey word from coreyText and add push to an array
function getSentences() {
    let sentences = [];
    for (let i = 0; i < 5; i++) {
        let sentence = [];
        sentence.push(coreyText.nouns[Math.floor(Math.random() * coreyText.nouns.length)]);
        sentence.push(coreyText.verbs[Math.floor(Math.random() * coreyText.verbs.length)]);
        sentence.push(coreyText.conjunctions[Math.floor(Math.random() * coreyText.conjunctions.length)]);
        sentence.push(coreyText.nouns[Math.floor(Math.random() * coreyText.nouns.length)]);
        sentence.push(coreyText.prepositions[Math.floor(Math.random() * coreyText.prepositions.length)]);
        sentence.push(coreyText.corey[Math.floor(Math.random() * coreyText.corey.length)]);
        sentences.push(sentence);
    }
    return sentences;
}

//create the amount of sentences according to the slider value
function createSentences() {
    let sentences = getSentences();
    let sentenceAmount = getSliderValue();
    let ipsumText = '';
    for (let i = 0; i < sentenceAmount; i++) {
        let sentence = sentences[Math.floor(Math.random() * sentences.length)];
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        ipsumText += sentence.join(' ') + '. ';
    }
    return ipsumText;
}

//on click of btn createSentences
btn.addEventListener('click', function () {
    text.textContent = createSentences();
})

