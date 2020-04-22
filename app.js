//API KEY
const auth = API_KEY;

//Local Vars
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');

let searchValue;

//Event Listener

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    recursiveDelete();
    searchPhotos(searchValue);
});

function updateInput(e) {
    searchValue = e.target.value;
}

//recurisive cleaning
function recursiveDelete() {
    console.log(gallery.children.length);
    if (!gallery.lastElementChild) {
        console.log('finished');
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
    console.log(data);
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src="${photo.src.large}" /><p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

//Async functions
async function curatedPhotos() {
    const data = await fetchAPI(
        'https://api.pexels.com/v1/curated?per_page=15&page=1'
    );
    generatePhotos(data);
}

async function searchPhotos(query) {
    const data = await fetchAPI(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    );
    generatePhotos(data);
}

// curatedPhotos();

//DEBUGGING SAMPLING
for (let i = 0; i < 20; i++) {
    const galleryImg = document.createElement('div');
    galleryImg.style.height = '100px';
    galleryImg.style.width = '100px';
    galleryImg.style.backgroundColor = '#cccccc';
    galleryImg.style.margin = '2rem';
    gallery.appendChild(galleryImg);
}
