//API KEY
const auth = API_KEY;

//Local Vars
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');
const moreBtn = document.querySelector('.more-btn');

let searchValue;
let pageValue = 1;
let fetchLink = '';
let currentSearch = '';

//Event Listener

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    recursiveDelete();
    currentSearch = searchValue;
    pageValue = 1;
    searchPhotos(searchValue);
});
moreBtn.addEventListener('click', loadMorePhotos);

function updateInput(e) {
    searchValue = e.target.value;
}

async function loadMorePhotos() {
    //Increment page
    pageValue++;

    //Check if we searched or not
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${pageValue}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${pageValue}`;
    }

    const data = await fetchAPI(fetchLink);

    generatePhotos(data);
}

//recurisive cleaning
function recursiveDelete() {
    if (!gallery.lastElementChild) {
        return false;
    } else {
        gallery.removeChild(gallery.lastElementChild);
        recursiveDelete();
    }
}

// Modular Functions
async function fetchAPI(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    return data;
}

function generatePhotos(data) {
    console.log(data.photos[0]);
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <div class="gallery-info">
                <p>${photo.photographer}</p>
            </div>
            <img src="${photo.src.large}" />
            <div class="favourite-icon"><img src="./icons/star.svg" /></div>
            <div class="gallery-download">
                <a href="${photo.src.medium}" target="_blank">Small</a>
                <a href="${photo.src.large}" target="_blank">Medium</a>
                <a href="${photo.src.original}" target="_blank">Original</a>
            </div>
        `;
        gallery.appendChild(galleryImg);
    });
}

//Async functions
async function curatedPhotos() {
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
    const data = await fetchAPI(fetchLink);
    generatePhotos(data);
}

async function searchPhotos(query) {
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchAPI(fetchLink);
    generatePhotos(data);
}

curatedPhotos();

//DEBUGGING SAMPLING
// for (let i = 0; i < 20; i++) {
//     const galleryImg = document.createElement('div');
//     galleryImg.style.height = '100px';
//     galleryImg.style.width = '100px';
//     galleryImg.style.backgroundColor = '#cccccc';
//     galleryImg.style.margin = '2rem';
//     gallery.appendChild(galleryImg);
// }

window.page = pageValue;
