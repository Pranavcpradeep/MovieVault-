const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.toggle,.dropdown a,.movie-list-item h4"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});


function goToGenre(genre) {
  window.location.href = `genre.html?genre=${genre}`;
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("movies.json")
        .then(response => response.json())
        .then(movies => {
            let movieContainers = document.querySelectorAll(".movie-list-item");
            let usedIndexes = new Set();

            movieContainers.forEach((container, index) => {
                if (movies.length === usedIndexes.size) return; // Stop if all movies are used

                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * movies.length);
                } while (usedIndexes.has(randomIndex)); // Ensure no repetition

                usedIndexes.add(randomIndex);
                let movie = movies[randomIndex];

                container.querySelector(".movie-list-item-img").src = movie.poster;
                container.querySelector(".movie-list-item-img").alt = movie.name;
                container.querySelector(".movie-list-item-title").textContent = movie.name;
                container.querySelector(".movie-list-item-desc").textContent = movie.description;
                
                // Ensure the button correctly navigates to details.html with movie name as parameter
                container.querySelector(".movie-list-item-button").onclick = function () {
                    window.location.href = `details.html?movie=${encodeURIComponent(movie.name)}`;
                };
            });
        })
        .catch(error => console.error("Error loading movies:", error));
});
