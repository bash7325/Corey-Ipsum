
const text = document.querySelector('#ipsum_text');
const btn = document.querySelector('#generate');
const copyBtn = document.querySelector('#copy')
const numOfSent = document.getElementById("number_of_sent");
const numOfSentRange = document.getElementById("sentences");
const copy = document.getElementById('copy');
const container = document.querySelector('.container');
const darkMode = document.querySelector('#dark_mode');
const nsfw = document.getElementById("nsfw");
var img = document.createElement("img");
img.src = "images/corey.png";
img.className  = "corey_img";

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

//nsfw checkbox listener
nsfw.addEventListener('change', function() {
    if (this.checked) {
      this.value = "Y"
    } else {
      this.value = "N"
    }
  });

//get a noun, a verb, another noun, a preposition and a corey word from coreyText and add push to an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const sentenceTemplates = [
  "{noun} {verb} {corey} {preposition} {noun}.",
  "{interjection}! {corey} {verb} {noun}.",
  "{noun} {verb} {corey} {conjunction} {noun} {verb} {noun}.",
  "{determiner} {corey} {verb} {preposition} {noun}.",
  "{noun} {verb} {corey}.",
  "{corey} {verb} {noun} {conjunction} {noun} {verb}.",
  "{interjection}! {noun} {verb} {corey} {conjunction} {noun}.",
  "{noun} {verb} {corey} {preposition} {noun} {conjunction} {noun} {verb}.",
  "{determiner} {noun} {verb} {corey} {conjunction} {noun} {verb}.",
  "{corey} {verb} {noun} {conjunction} {noun} {verb} {preposition} {noun}.",
  "{noun} {verb} {corey} {conjunction} {noun} {verb} {preposition} {noun}.",
  "{interjection}! {noun} {verb} {corey} {conjunction} {noun} {verb}.",
  "{determiner} {noun} {verb} {corey} {preposition} {noun} {conjunction} {noun}.",
  "{corey} {verb} {noun} {conjunction} {noun} {verb} {preposition} {noun} {conjunction} {noun}.",
  "{noun} {verb} {corey} {conjunction} {noun} {verb} {preposition} {noun} {conjunction} {noun} {verb}.",
  "{interjection}! {noun} {verb} {corey} {conjunction} {noun} {verb} {preposition} {noun}.",
  "{determiner} {noun} {verb} {corey} {conjunction} {noun} {verb} {preposition} {noun} {conjunction} {noun}.",
];

function getSentences() {
    let sentences = new Set();
    let sentenceAmount = getSliderValue();
    while(sentences.size < sentenceAmount) {
        let usedWords = new Set();
        let getUniqueRandomElement = (arr) => {
            let word;
            do {
                word = getRandomElement(arr);
            } while (usedWords.has(word));
            usedWords.add(word);
            return word;
        };
        let template = getRandomElement(sentenceTemplates);
        let nouns = [...coreyText.nouns] ;
        let corey = [...coreyText.corey] ;
        if (nsfw.value == "Y") {
            nouns = [...nouns, ...coreyText["nouns-nsfw"]];
            corey = [...corey, ...coreyText["corey-nsfw"]];
        }
        let sentence = template
            .replace(/{noun}/g, () => getUniqueRandomElement(nouns))
            .replace(/{verb}/g, () => getUniqueRandomElement(coreyText.verbs))
            .replace(/{preposition}/g, () => getUniqueRandomElement(coreyText.prepositions))
            .replace(/{interjection}/g, () => getUniqueRandomElement(coreyText.interjections))
            .replace(/{determiner}/g, () => getUniqueRandomElement(coreyText.determiners))
            .replace(/{corey}/g, () => getUniqueRandomElement(corey))
            .replace(/{conjunction}/g, () => getUniqueRandomElement(coreyText.conjunctions));
        sentences.add(sentence.charAt(0).toUpperCase() + sentence.slice(1));
    }
    return Array.from(sentences);
}

function createSentences() {
    let sentences = getSentences();
    let sentenceAmount = getSliderValue();
    let ipsumText = '';
    for (let i = 0; i < sentenceAmount; i++) {
        let sentence = sentences[i];
        ipsumText += sentence + ' ';
    }
    return ipsumText;
}

//function for generate button
function generateBtn() {
  let sentences = createSentences();
  text.textContent = sentences;
  typeEffect(text, 5); // adjust speed aof the typing text with this
}

//on click of btn createSentences
btn.addEventListener('click', generateBtn)

//when the copy button is clicked, copy text to clipboard
function copyText() {
    const copyText = document.getElementById('ipsum_text').innerText;
    navigator.clipboard.writeText(copyText)
    copy.textContent = 'Copied!';
}

copyBtn.addEventListener('click', function() {
    copyText();
})

//onclick of #dark_mode button add class .dark_mode
darkMode.addEventListener('click', function () {
    document.body.classList.toggle('dark_mode');
    // and change the button color to light
    if (darkMode.textContent === 'Dark Mode') {
        darkMode.textContent = 'Light Mode';
    }
    else {
        darkMode.textContent = 'Dark Mode';
    }
})

// Get the modal
var aboutModal = document.getElementById("aboutModal");
var contactModal = document.getElementById("contactModal");

// Get the button that opens the modal
var aboutBtn = document.getElementById("aboutBtn");
var contactBtn = document.getElementById("contactBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
aboutBtn.onclick = function() {
  aboutModal.classList.add('open');
}

contactBtn.onclick = function() {
  contactModal.classList.add('open');
}

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < span.length; i++) {
  span[i].onclick = function() {
    aboutModal.classList.remove('open');
    contactModal.classList.remove('open');
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == aboutModal) {
    aboutModal.classList.remove('open');
  }
  if (event.target == contactModal) {
    contactModal.classList.remove('open');
  }
}

//typing effect
function typeEffect(element, speed) {
  let text = element.textContent;
  element.textContent = "";

  let i = 0;
  let timer = setInterval(function() {
      if (i < text.length) {
          element.append(text.charAt(i));
          element.append(text.charAt(i + 1));
          element.append(text.charAt(i + 2));
          element.append(text.charAt(i + 3));
          i+=4;
      } else {
          clearInterval(timer);
          document.getElementById('copy').style.display = 'block';
          copy.textContent = 'Copy';
          container.appendChild(img);
      }
  }, speed);
}
