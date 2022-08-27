import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
const gallerySection = onCreateGalleryItems(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", gallerySection);

function onCreateGalleryItems(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
        `
    }).join("");
}

galleryEl.addEventListener('click', onImgClick);

function onImgClick(evt) {
    evt.preventDefault();
    const imgEl = evt.target;
    const isImage = imgEl.classList.contains('gallery__image');
    if (!isImage) {
        return;
    }

    const currentImgLink = imgEl.dataset.source;
    const instance = basicLightbox.create(`<img class="modal__image" src="${currentImgLink}"/>`);
    instance.show();

    //Закриття модального вікна після натискання клавіші Escape

    window.addEventListener('keydown', onEscKeyPress);
    function onEscKeyPress(event) {
        const ESC_KEY_CODE = 'Escape';

        if (event.code === ESC_KEY_CODE) {
            instance.close();

            window.removeEventListener('keydown', onEscKeyPress);
        }
    }

}
