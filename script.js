const apiKey = '870967436c1517d581daf3b245495790'
const displayArea = document.getElementById('show-movies');
const singleDisplayArea = document.getElementById('singleMovie');

function getPopularMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=870967436c1517d581daf3b245495790`)
        .then(res => res.json())
        .then(data => {

            let previousHTML = displayArea.innerHTML;

            data.results.slice(0, 12)
                .map(movie => {
                    const htmlTemplate = `
            <div class="col">
                    <div class="card" onclick="detailsPopUp(${movie.id})">
                    <img src="https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}" alt="${movie.title}">
                    <div class="card-body">
                        <h4 class="card-title">${movie.title}</h4>
                        <p class="card-text">Popularity: ${movie.popularity}</p>
                        <p class="card-text">Release Date: ${movie.release_date}</p>
                    </div>
                    </div>
            </div>
            `;
                    previousHTML += htmlTemplate;
                })

            displayArea.innerHTML = previousHTML;

        })
        .catch(err => console.log(err.message))
}
getPopularMovies()

function detailsPopUp(id) {
    document.getElementById("popupId").classList.toggle("active");
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=870967436c1517d581daf3b245495790&language=en-US`)
        .then(res => res.json())
        .then(data => {
            const insidePopuUp = document.getElementById('popUpContent');
            insidePopuUp.innerHTML = `
            <button class="close-btn" onclick="detailsPopUp()"><i class="far fa-times-circle"></i></button>
            <div class="card">
            <img src="https://image.tmdb.org/t/p/w1280/${data.backdrop_path}" alt="${data.original_title}">
                <div class="card-body">
                <h5 class="card-title">${data.original_title}</h5>
               
                <p class="card-text">${data.overview}</p>
                </div>
            </div>`
        })
        .catch(err => console.log(err.message));
}