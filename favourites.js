const gallery = document.querySelector('.gallery');
const clearBtn = document.querySelector('.clear-favourites');
let imagesArray = [];

//Checking that our JSON string is correct
try {
    imagesArray = JSON.parse(localStorage.getItem('favitem'));
} catch (error) {
    console.log(error);
}

//Check that it is not empty even if correct;
if (imagesArray && imagesArray.length != 0) {
    imagesArray.forEach((img) => {
        const galleryFavImg = document.createElement('div');
        galleryFavImg.classList.add('gallery-img');
        galleryFavImg.innerHTML = `
                    <div class="gallery-info">
                        <p>Sample Info</p>
                    </div>
                    <img src="${img}" />
                `;
        gallery.appendChild(galleryFavImg);
    });
} else {
    displayEmptyMessage();
}

//Pure functions

function displayEmptyMessage() {
    //Display error message
    const errorText = document.createElement('h1');
    errorText.classList.add('error-message');
    errorText.innerText = 'Sorry, no favourite images to show';
    document.querySelector('main').appendChild(errorText);
}

//Event Listeners
clearBtn.addEventListener('click', clearFavourites);

//Event Functions

function clearFavourites() {
    //Remove all html from parent gallery div
    gallery.innerHTML = '';
    displayEmptyMessage();

    //Clear local storage
    localStorage.removeItem('favitem');
}
