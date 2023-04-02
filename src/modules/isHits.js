import Notiflix from 'notiflix';

export function checkHits({ hits, totalHits }) {

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

}
