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