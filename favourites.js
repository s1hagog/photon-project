const gallery = document.querySelector('.gallery');
const clearBtn = document.querySelector('.clear-favourites');
const svgStar =
    '<svg height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#ffc107"/></svg>';
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
                <div class="image-thumbnail">
                    <img
                        src="${img}"
                        alt=""
                    />
                </div>
                <div class="image-overlay">
                    <div class="btn-group">
                        <button class="overlay-btn save-btn">Save</button>
                        <button class="overlay-btn open-btn">Open</button>
                    </div>
                    <div class="favourite-icon overlay selected">
                        ${svgStar}
                    </div>
                </div>
                `;
        gallery.appendChild(galleryFavImg);
    });
} else {
    displayEmptyMessage();
}

const saveBtns = document.querySelectorAll('.save-btn');
const openBtns = document.querySelectorAll('.open-btn');

//Pure functions

function displayEmptyMessage() {
    if (document.querySelector('main').querySelector('h1')) {
        //Update error message
        document.querySelector('main').querySelector('h1').innerText =
            'Sorry, no favourite images to show';
    } else {
        //Display error message
        const errorText = document.createElement('h1');
        errorText.classList.add('error-message');
        errorText.innerText = 'Sorry, no favourite images to show';
        document.querySelector('main').appendChild(errorText);
    }
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
