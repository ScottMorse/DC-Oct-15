const menuButton = document.querySelector('#menu-button')
const menuItems = document.querySelector('#menu-items')

function getMovies(runMainOnLoad) {

    fetch('http://www.omdbapi.com/?s=batman&apikey=74941019')
    .then(function(response) {
        return response.json()
    })
    .then(function(theJson){
        runMainOnLoad(theJson.Search)
    })

}

let batmanMovies
getMovies(function(movies){
    batmanMovies = movies
    let i = 0
    batmanMovies.forEach(movie => {
        newMenuItem = document.createElement('div')
        newMenuItem.id = 'menu-item' + i
        newMenuItem.classList.add('menu-item')
        newMenuItem.innerHTML = movie.Title
        menuItems.appendChild(newMenuItem)
        newMenuItem.addEventListener('click',displayMovie)
        i++
    })
    menuButton.addEventListener('click',clickMenuButton)
    window.addEventListener('click',clickOutsideMenu)
})

let clicked = false
function toggleMenu(toShow){
    if(toShow){
        menuButton.style.borderRadius = '5% 5% 0% 0% / 20% 20% 0% 0%'
        menuItems.style.display = 'block'
        setTimeout(()=>menuItems.style.opacity = '1',100)
        clicked = true
    }
    else{
        menuButton.style.borderRadius = '5% / 20%'
        menuItems.style.opacity = '0'
        setTimeout(()=>menuItems.style.display = 'none',500)
        clicked = false
    }
}

function clickMenuButton(){
    if(!clicked){
        toggleMenu(true)
    }
    else{
        toggleMenu(false)
    }
}

function clickOutsideMenu(e){
    if(e.target.id.slice(0,4) != 'menu' && clicked){
        toggleMenu(false)
    }
}

const movieTitle = document.querySelector('#movie-title')
const movieYear = document.querySelector('#year')
const movieLink = document.querySelector('#movie-link')
const movieImage = document.querySelector('#movie-image')

const digitRegex = new RegExp(/[\d]+/)
function displayMovie(){
    const movieIdIndex = this.id.match(digitRegex)[0]
    const movieObject = batmanMovies[movieIdIndex]
    
    movieTitle.innerHTML = movieObject.Title
    movieYear.innerHTML = movieObject.Year
    movieLink.innerHTML = 'View on IMDb'
    movieLink.href = 'http://www.imdb.com/title/' + movieObject.imdbID
    movieImage.src = movieObject.Poster
    toggleMenu(false)
}