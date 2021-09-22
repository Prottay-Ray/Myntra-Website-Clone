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
