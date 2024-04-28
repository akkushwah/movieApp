
let movieData = JSON.parse(localStorage.getItem("responseData"));


function showData() {
  var server = new XMLHttpRequest();

  server.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      localStorage.setItem('responseData', this.response)

      let movieData = JSON.parse(this.responseText);

      movieData["Movies"].map((val) => {

        let num = parseInt(val.rating[0]);
        let stars = "";
        while (num > 0) {
          stars += "⭐";
          num--;
        }
        showCards(val.cover, val.title, val.category, val.rating, stars, val.link, val.language);
      })
    }
  }
  server.open("GET", "data.json", true);
  server.send();
};

showData();



let selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
let selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'));
let selectedRating = JSON.parse(localStorage.getItem('selectedRating'));

if (selectedCategory !== null && selectedLanguage !== '' && selectedRating !== null) {

  document.querySelector(".filterTitle").style.display = "Block";

  let returnedMovie = movieData["Movies"].filter((m) => {
    return (selectedLanguage == m.language) && (selectedCategory.includes(m.category) || selectedRating.includes(m.rating));
  });
  console.log("returned data ", returnedMovie)

  if (returnedMovie == "") {
    document.querySelector('.filterTitle').innerHTML = "Not Found"
  }

  returnedMovie.map(val => {
    let num = parseInt(val.rating[0]);
    let stars = "";
    while (num > 0) {
      stars += "⭐"
      num--;
    }

    document.querySelector('#topResult').innerHTML = "";
    filterCards(val.cover, val.title, val.category, val.rating, stars, val.link, val.language);
  })
} else {
  document.querySelector(".filterTitle").style.display = "none";
}



// Filter Button
let buttons = document.querySelectorAll('.filterButton .btn');

buttons.forEach((button) => {
  button.addEventListener('click', function (event) {

    let selectedCategory = button.textContent;
    console.log("sleected category", selectedCategory)
    let crossIcon = button.querySelector('.crossIcon');

    let filteredMovies = movieData["Movies"].filter((val) => {
      return button.innerText === val.category;
    });

    console.log(filteredMovies)

    // Check if the button is already selected
    if (button.classList.contains('selected')) {
      button.classList.remove('selected'); // Deselect the button
      crossIcon.style.display = "none";    // Hide the cross icon
      console.log("hello")
      window.location.reload();

    } else {
      // Deselect all buttons
      buttons.forEach(btn => {
        btn.classList.remove('selected');  // Remove 'selected' class from all buttons
        let btnCrossIcon = btn.querySelector('.crossIcon');
        btnCrossIcon.style.display = "none";  // Hide cross icon for all buttons
      });

      // Select the clicked button
      button.classList.add('selected');
      crossIcon.style.display = "inline-block";

      // Appying Filter

      document.querySelector('#topResult').innerHTML = "";
      filteredMovies.map(val => {
        let num = parseInt(val.rating[0]);
        let stars = "";
        while (num > 0) {
          stars += "⭐"
          num--;
        }
        filterCards(val.cover, val.title, val.category, val.rating, stars, val.link, val.language)
      })

    }
    // window.location.reload();

  });
});



function showCards(cover, title, category, rating, stars, link, language) {
  document.querySelector('#result').innerHTML += `
        <div class="col-md-3 col-sm-6">
        <div class="card my-4 mx-auto" style="width: 18rem;">
        <img class="card-img-top" src="${cover}" alt="Card image cap" style="height:300px;object-fit:cover">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p>
          <span>${category}</span>
          <span class="px-2">• ${language}</span>
          </p>

          <span>${rating}</span>
          <span class="mx-3">${stars}</span>
          <a href="${link}" style="display:block;margin-block:2rem;" target=_blank class="btn btn-dark">Watch now</a>
        </div>
      </div>
      </div>
      `}


function filterCards(cover, title, category, rating, stars, link, language) {
  document.querySelector('#topResult').innerHTML += `
        <div class="col-md-3 col-sm-6">
        <div class="card my-4 mx-auto" style="width: 18rem;">
        <img class="card-img-top" src="${cover}" alt="Card image cap" style="height:300px;object-fit:cover">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p>
          <span>${category}</span>
          <span class="px-2">• ${language}</span>
          </p>
          <span>${rating}</span>
          <span class="mx-3">${stars}</span>
          <a href="${link}" style="display:block;margin-block:2rem;" target=_blank class="btn btn-dark">Watch now</a>
        </div>
      </div>
      </div>
      `
}





