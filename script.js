// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
};

// Function to fetch and display the image of the day for a given date
const getImageOfTheDay = (date) => {
  const apiKey = "oLcB74UfDa7tsmIk665brfOHfS2QH5SCErk4d1vN";
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=oLcB74UfDa7tsmIk665brfOHfS2QH5SCErk4d1vN&date=${date}`;


  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Save date to local storage
      saveSearch(date);
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
          <img src="${data.url}" alt="${data.title}" />
          <p> <strong> ${data.date}</strong> ${data.copyright} </p>
          <h2>${data.title}</h2>
          <p>${data.explanation}</p>
          
        `;
    })
    .catch((error) => console.log(error));
};

// Function to fetch and display the current image of the day
const getCurrentImageOfTheDay = () => {
  const currentDate = getCurrentDate();
  getImageOfTheDay(currentDate);
};

// Function to save a date to local storage
const saveSearch = (date) => {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  if(!searches.includes(date)){
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
  displaySearchHistory(searches[searches.length-1]);

  }
};

// Function to display the search history list in the UI
const displaySearchHistory = () => {
  const searchHistoryList = document.getElementById("search-history");
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searchHistoryList.innerHTML = "";
  searches.forEach((search) => {
    const searchItem = document.createElement("li");
    searchItem.innerHTML = search;
    searchItem.addEventListener("click", () => {
      getImageOfTheDay(search);
    });
    searchHistoryList.appendChild(searchItem);
  });
};

getCurrentImageOfTheDay();
displaySearchHistory();
window.addEventListener('load', function () {
});

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const searchDate = searchInput.value;
  getImageOfTheDay(searchDate);
  searchInput.value = "";
  displaySearchHistory();
});
