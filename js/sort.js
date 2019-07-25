'use strict';

(function () {
  var NUMBER_OF_NEW_PHOTOS = 10;
  var photos = [];

  function getNewPhotos() {
    var arr = [];

    while (arr.length < NUMBER_OF_NEW_PHOTOS) {
      var randomElement = window.util.getRandomElement(photos);

      if (arr.indexOf(randomElement) === -1) {
        arr.push(randomElement);
      }
    }

    return arr;
  }

  function getDiscussedPhotos() {
    return photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function updatePhotos(filter) {
    switch (filter) {
      case 'filter-new':
        window.gallery.render(getNewPhotos());
        break;
      case 'filter-discussed':
        window.gallery.render(getDiscussedPhotos());
        break;
      default:
        window.gallery.render(photos);
        break;
    }
  }

  function onFilterClick(evt) {
    var photoFilterButtonElements = document.querySelectorAll('.img-filters__button');

    photoFilterButtonElements.forEach(function (el) {
      el.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');

    window.util.removeDebounce(function () {
      updatePhotos(evt.target.id);
    });
  }

  function addFilterListener(data) {
    var photoFilterElement = document.querySelector('.img-filters');
    var photoFilterFormElement = document.querySelector('.img-filters__form');

    photoFilterElement.classList.remove('img-filters--inactive');
    photos = data;

    photoFilterFormElement.addEventListener('click', onFilterClick);
  }

  window.sort = {
    init: addFilterListener
  };
})();
