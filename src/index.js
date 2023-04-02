import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { checkHits } from './modules/isHits';
import { SearchRequest } from './modules/searchAPI';
import { renderList } from './modules/renderCard';

//===============refs=========================
const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.btn_load'),
  galleryContainer: document.querySelector('.gallery'),
};

//===============EVENT===========================
refs.searchForm.addEventListener('submit', onSearch);
window.addEventListener('scroll', onNextPage);

// window.addEventListener('submit', scrollPage);

const newsApiService = new SearchRequest();
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

//============================FUNC======================
async function onSearch(e) {
  e.preventDefault();

  try {
    clearGalleryContainer();
    const value = e.currentTarget.elements.searchQuery.value.trim();

    if (value === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    newsApiService.resetPage();

    newsApiService.searchQuery = value;
    const searchData = await newsApiService.getSearchData();
    checkHits(searchData);

    await appendHitsMarkup(searchData);
  } catch (error) {
    notiflix.Notify.failure('Something went wrong. Please try again later.');
    console.error(error);
  }
}

async function onNextPage() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom === document.documentElement.clientHeight) {
    let nextPage = await newsApiService.getSearchData();
    appendHitsMarkup(nextPage);
  }
}
function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function appendHitsMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', renderList(images));
  lightbox.refresh();
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
