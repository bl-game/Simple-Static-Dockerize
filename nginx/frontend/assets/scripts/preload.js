let lang = navigator.language;
const hiText = document.querySelector(".hi-text");
if (hiText) {
    // console.log("Lang: ", lang)
    lang = "en"
    if (lang.includes("ru")) {
        hiText.innerText = "Установка Игры..."
    } else {
        hiText.innerText = "Installing The Game..."
    }

}