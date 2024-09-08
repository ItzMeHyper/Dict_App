const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    const inpWord = document.getElementById("input-word").value.trim();
    
    if (!inpWord) {
        result.innerHTML = `<h3 class="error">Please enter a word</h3>`;
        return;
    }

    fetch(`${url}${inpWord}`)
        .then(response => response.json())
        .then(data => {
            if (data && data[0] && data[0].meanings && data[0].meanings[0].definitions[0]) {
                updateResult(data[0], inpWord);
            } else {
                showError("Couldn't find the word");
            }
        })
        .catch(() => showError("Couldn't find the word"));
});

function updateResult(data, word) {
    result.innerHTML = `
        <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${data.meanings[0].partOfSpeech}</p>
            <p>/${data.phonetic}/</p>
        </div>
        <p class="word-meaning">
           ${data.meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${data.meanings[0].definitions[0].example || ""}
        </p>`;
    //sound.setAttribute("src", `${data.phonetics[1].audio}`);;
}

function showError(message) {
    result.innerHTML = `<h3 class="error">${message}</h3>`;
}

function playSound() {
    sound.play();
}
