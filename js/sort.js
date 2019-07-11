'use strict';

(function () {
  var NUMBER_OF_NEW_PHOTOS = 10;
  var photos = [];

  function updatePhotos(filter) {
    switch (filter) {
      case 'filter-new':
        window.gallery.render(newPhotos());
        break;
      case 'filter-discussed':
        window.gallery.render(discussedPhotos());
        break;
      default:
        window.gallery.render(photos);
    }
  }

  function newPhotos() {
    var arr = [];

    while (arr.length < NUMBER_OF_NEW_PHOTOS) {
      var randomElement = window.util.getRandomElement(photos);
      if (arr.indexOf(randomElement) === -1) {
        arr.push(randomElement);
      }
    }

    return arr;
  }

  function discussedPhotos() {
    return photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function onFilterClick(evt) {
    var photoFilterButtonElements = document.querySelectorAll('.img-filters__button');

    for (var i = 0; i < photoFilterButtonElements.length; i++) {
      photoFilterButtonElements[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    window.debounce(function () {
      updatePhotos(evt.target.id);
    });
  }

  function successHandler(data) {
    var photoFilterElement = document.querySelector('.img-filters');
    var photoFilterFormElement = document.querySelector('.img-filters__form');

    photoFilterElement.classList.remove('img-filters--inactive');
    photos = data;
    updatePhotos();
    photoFilterFormElement.addEventListener('click', onFilterClick);
  }

  window.sort = {
    init: successHandler
  };
})();
