
const text = document.querySelector('#ipsum_text');
const btn = document.querySelector('#generate');
const copyBtn = document.querySelector('#copy')
const numOfSent = document.getElementById("number_of_sent");
const numOfSentRange = document.getElementById("sentences");
const copy = document.getElementById('copy');

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

//sync the slider with the text box next to it
numOfSent.addEventListener("input", syncSentNumbers);
numOfSentRange.addEventListener("input", syncSentNumbers);

//get a noun, a verb, another noun, a preposition and a corey word from coreyText and add push to an array
function getSentences() {
    let sentences = [];
    let sentenceAmount = getSliderValue();
    for (let i = 0; i < sentenceAmount; i++) {
        let sentence = [];
        sentence.push(coreyText.nouns[Math.floor(Math.random() * coreyText.nouns.length)]);
        sentence.push(coreyText.corey[Math.floor(Math.random() * coreyText.corey.length)]);
        sentence.push(coreyText.verbs[Math.floor(Math.random() * coreyText.verbs.length)]);
        sentence.push(coreyText.conjunctions[Math.floor(Math.random() * coreyText.conjunctions.length)]);
        sentence.push(coreyText.nouns[Math.floor(Math.random() * coreyText.nouns.length)]);
        sentence.push(coreyText.prepositions[Math.floor(Math.random() * coreyText.prepositions.length)]);
        sentence.push(coreyText.corey[Math.floor(Math.random() * coreyText.corey.length)]);
        sentences.push(sentence);
    }
    return sentences;
}

//create the amount of sentences according to the slider value, but don't repeat the same sentence twice
function createSentences() {
    let sentences = getSentences();
    let sentenceAmount = getSliderValue();
    let ipsumText = '';
    for (let i = 0; i < sentenceAmount; i++) {
        let sentence = sentences[Math.floor(Math.random() * sentences.length)];
        //if the sentence is already in the ipsumText, don't add it again
        if (ipsumText.includes(sentence.join(' '))) {
            sentenceAmount++;
        } else {
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        ipsumText += sentence.join(' ') + '. ';
        }
    }
    return ipsumText;
}

//on click of btn createSentences
btn.addEventListener('click', function () {
    text.textContent = createSentences();
    document.getElementById('copy').style.display = 'block';
    copy.textContent = 'Copy';
})

//when the copy button is clicked, copy text to clipboard
function copyText() {
    const copyText = document.getElementById('ipsum_text').innerText;
    navigator.clipboard.writeText(copyText)
    copy.textContent = 'Copied!';
}

copyBtn.addEventListener('click', function() {
    copyText();
})
