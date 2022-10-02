function q(query, parent=document) { return parent.querySelector(query); }
function qs(query, parent=document) { return parent.querySelectorAll(query); }

const ipt = q("input#word-input");

// Base64 encoding to hide the word in the URL (atob: b64 -> text, btoa: text -> b64)
const word = atob(new URLSearchParams(window.location.search).get("word") || btoa(prompt(strings.whatWord)));

ipt.focus();

var numTries = 0;

q("form#word").addEventListener("submit", e => {
    e.preventDefault();

    if(ipt.value === word) {
        ipt.value = "";
        numTries = 0;
    }

    else {
        ipt.setCustomValidity(strings.incorrect);
        ipt.addEventListener("input", function f() {
            ipt.setCustomValidity("");
            ipt.removeEventListener("input", f);
        });
        numTries++;
    }
});

ipt.addEventListener("invalid", () => {
    if(++numTries >= 3 && confirm(strings.moreTries))
        alert(strings.wordWas);
});

q("form button#forgot").addEventListener("click", () => alert(strings.wordWas));

q("form button#link").addEventListener("click", () =>
    prompt(strings.linkToWord, `${window.location.href.split('?')[0]}?word=${btoa(word)}`));
