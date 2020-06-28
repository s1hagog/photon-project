//API KEY
const auth = API_KEY;

//Local Vars
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');
const moreBtn = document.querySelector('.more-btn');
const svgStar =
    '<svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#ffc107"/></svg>';

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

// function rename() {
//     console.log('ahahaha');
//     console.log('Hello');
//     console.log('world');
// }

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
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        let altText = photo.url.replace('https://www.pexels.com/photo/', '');
        altText = altText.replace(/[0-9]/g, '').slice(0, -2);

        //For SEO alt text
        altText = altText.replace(/-/g, ' ');

        if (altText.length == 0) {
            altText = photo.photographer;
        }

        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <div class="gallery-info">
                <p>${photo.photographer}</p>
            </div>
            <img src="${photo.src.large}"  alt="${altText}"/>
            <div class="favourite-icon">${svgStar}</div>
            <div class="gallery-download">
                <a href="${photo.src.medium}" target="_blank">Small</a>
                <a href="${photo.src.large}" target="_blank">Medium</a>
                <a href="${photo.src.original}" target="_blank">Original</a>
            </div>
        `;
        gallery.appendChild(galleryImg);
    });
}

function addToFavourite(e) {
    //Add class which changes color
    e.target.classList.add('selected');

    //Get image absolute path from the src
    const imgSrc = e.target.parentNode.querySelector('img').src;

    //Get alt text for download filename
    const altText = e.target.parentNode.querySelector('img').alt;

    //Path to store in local storage
    addToLocalStorage(imgSrc, altText);
}

function addToLocalStorage(img, altText) {
    const pic = {
        img,
        altText,
    };

    //Prepare empty array or create array from existing JSON string
    const imageArray = localStorage.getItem('favitem')
        ? JSON.parse(localStorage.getItem('favitem'))
        : [];

    imageArray.push(pic);

    //serialize array to store in local storage
    const jsonArray = JSON.stringify(imageArray);

    //Save JSON string in local storage
    localStorage.setItem('favitem', jsonArray);
}

function resetLocalStorage() {
    localStorage.removeItem('favitem');
}

//Async functions
async function curatedPhotos() {
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
    const data = await fetchAPI(fetchLink);
    generatePhotos(data);
    return true;
}

async function searchPhotos(query) {
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchAPI(fetchLink);
    generatePhotos(data);
}

async function prepareFavIcons() {
    const ready = await curatedPhotos();

    if (ready) {
        const favIcons = document.querySelectorAll('.favourite-icon');
        favIcons.forEach((icon) => {
            icon.addEventListener('click', addToFavourite);
        });
    }
}

prepareFavIcons();

//DEBUGGING SAMPLING
// for (let i = 0; i < 20; i++) {
//     const galleryImg = document.createElement('div');
//     galleryImg.style.height = '100px';
//     galleryImg.style.width = '100px';
//     galleryImg.style.backgroundColor = '#cccccc';
//     galleryImg.style.margin = '2rem';
//     gallery.appendChild(galleryImg);
// }

//Debug functions;
window.page = pageValue;
window.emptyLocal = resetLocalStorage;
