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

let search = document.getElementById('search');
let searchbox = document.getElementById('searchbox');

search.onfocus = () => {
    searchbox.style.backgroundColor = "white"
    searchbox.style.border = "1px solid lightgray"
}
search.onblur = () => {
    searchbox.style.backgroundColor = "#F5F5F6"
    searchbox.style.border = "none"
}

let debounceTimer, time;
let searchList = document.getElementById('searchlist');
let searchWindow = document.getElementById('searchresult');

async function autoComplete() {
    let val = search.value;
    // alert('Hare Krishna')
    if (val.length < 3) {
        return;
    }
    let count = 0;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        let a = await fetch(`https://asos2.p.rapidapi.com/v2/auto-complete?q=${val}&store=US&country=US&currency=USD&sizeSchema=US&lang=en-US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "asos2.p.rapidapi.com",
                "x-rapidapi-key": "e41ac5f444mshb544d722349d34cp12a1c9jsn14405c0bb667"
            }
        });
        let b = await a.json();
        searchWindow.style.display = "block";
        searchList.innerHTML = null;
        for (let {searchTerm} of b.suggestionGroups[0].suggestions) {
            let li = document.createElement('li');
            li.innerText = searchTerm;
            if (count == 0) {
                li.focus();
                count = 1;
            }
            li.addEventListener('click', () => {
                alert("hareKrishna")
                localStorage.setItem('searchItem', JSON.stringify({item: searchTerm}));
                window.location.href = "search.htm";
            });
            searchList.appendChild(li);
        }
        clearTimeout(time);
        time = setTimeout(() => {
            searchWindow.style.display = "none";
            searchList.innerHTML = null;
        }, 5000);
        
    }, 1000);
}

search.addEventListener('input', autoComplete);