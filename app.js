//API KEY
const auth = API_KEY;

//Local Vars
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');

let searchValue;

async function curatedPhotos() {
    const dataFetch = await fetch(
        'https://api.pexels.com/v1/curated?per_page=15&page=1',
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth,
            },
        }
    );
    const data = await dataFetch.json();
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src="${photo.src.large}" /><p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

curatedPhotos();
