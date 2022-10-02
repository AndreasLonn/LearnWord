function $(s, e=document) {return e.querySelector(s)}
function $s(s, e=document) {return e.querySelectorAll(s)}

var ipt = $("input#word-input");
var word = new URLSearchParams(window.location.search).get("word") || prompt(strings.whatword);
ipt.focus();

var numTries = 0;

$("form#word").addEventListener("submit", e => {
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
    if(++numTries >= 3 && confirm(strings.moretries))
        alert(strings.wordwas);
});
$("form button#forgot").addEventListener("click", () => alert(strings.wordwas));
