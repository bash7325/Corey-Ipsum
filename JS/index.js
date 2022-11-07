
const text = document.querySelector('#ipsum_text');
const btn = document.querySelector('#generate');

//get a word from each category in coreyText and push to an array
function getWords() {
    let words = [];
    for (let category in coreyText) {
        let word = coreyText[category][Math.floor(Math.random() * coreyText[category].length)];
        words.push(word);
    }
    return words;
}

//on button click get random words
btn.addEventListener('click', function () {
    text.textContent = getWords().join(' ');
})
