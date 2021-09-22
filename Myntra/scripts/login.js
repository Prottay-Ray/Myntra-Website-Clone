let num = document.getElementById('mobno');
let numBox = document.getElementById('mob');
let danger = document.getElementById('inval');
let success = false;
var attempted = false;
let cont = document.getElementById('button')
let load = document.getElementById('loading');
let errmsg = document.getElementById('msg');
var timer;

num.onfocus = () => {
    numBox.style.border = "1px solid black";
}
num.onblur = () => {
    numBox.style.border = "1px solid lightgray";
}
function checkNumber() {
    if (isNaN(num.value) || Number(num.value) < 1 || num.value.length < 10) {
        danger.style.display = "block";
        attempted = true;
    }
    else {
        danger.style.display = "none";
        success = true;
    }
}
num.addEventListener('input', numSubmit);
function numSubmit() {
    if (attempted === true) {
        checkNumber();
    }
}
function submitPhone(e) {
    load.style.display = "block";
    e.preventDefault();
    checkNumber();
    if (success) {
        setTimeout(() => {
            localStorage.setItem("mobile", JSON.stringify({number: num.value}));
            window.location.href = "otplogin.htm"
        }, 500);  
    } else {
        setTimeout(() => {
            load.style.display = "none";
            errmsg.style.display = "block";
            num.select();
        }, 500);
        setTimeout(() => {
            errmsg.style.display = "none";
        }, 2000);
    }
}

cont.addEventListener('click', submitPhone);