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

let men = document.getElementById('men');
let women = document.getElementById('women')
let kids = document.getElementById('kids');
let home = document.getElementById('home');
let beauty = document.getElementById('beauty');
let mennav = document.getElementById('nav_men');
let womennav = document.getElementById('nav_women');
let kidsnav = document.getElementById('nav_kids');
let homenav = document.getElementById('nav_home');
let beautynav = document.getElementById('nav_beauty');
let catNav = document.getElementById('navExpansions');
let over = false;

catNav.onmouseenter = () => {
    over = true;
}
catNav.onmouseleave = () => {
    over = false;
    vanish();
}

women.addEventListener('mouseenter', () => {
    over = true;
    vanish();
    womennav.style.display = "flex";
})
women.onmouseleave = setInterval(() => {
    if (!over) {
        over = false;
        vanish();
    }
}, 400);
men.addEventListener('mouseenter', () => {
    over = true;
    vanish();
    mennav.style.display = "flex";
})
men.onmouseleave = setInterval(() => {
    if (!over) {
        over = false;
        vanish();
    }
}, 400);
kids.addEventListener('mouseenter', () => {
    over = true;
    vanish();
    kidsnav.style.display = "flex";
})
kids.onmouseleave = setInterval(() => {
    if (!over) {
        over = false;
        vanish();
    }
}, 400);
home.addEventListener('mouseenter', () => {
    over = true;
    vanish();
    homenav.style.display = "flex";
})
home.onmouseleave = setInterval(() => {
    if (!over) {
        over = false;
        vanish();
    }
}, 400);
beauty.addEventListener('mouseenter', () => {
    over = true;
    vanish();
    beautynav.style.display = "flex";
})
beauty.onmouseleave = setInterval(() => {
    if (!over) {
        over = false;
        vanish();
    }
}, 400);

function vanish() {
    womennav.style.display = "none";
    mennav.style.display = "none";
    kidsnav.style.display = "none";
    homenav.style.display = "none";
    beautynav.style.display = "none";
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

searchWindow.addEventListener('mouseover', () => {
    clearTimeout(time);
})
searchWindow.addEventListener('mouseleave', () => {
    clearTimeout(time);

    time = setTimeout(() => {
        searchList.innerHTML = null;
        searchWindow.style.display = "none";
    }, 2000);
})

search.addEventListener('input', autoComplete);