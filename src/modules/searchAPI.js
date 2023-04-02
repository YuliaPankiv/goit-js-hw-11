import axios from 'axios';

const API_KEY = '34781814-4d601342b4d8de3a0e1d81aeb';
const BASE_URL = 'https://pixabay.com/api/';

export class SearchRequest {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  createConfig() {
    return axios.create({
      baseURL: BASE_URL,
      params: {
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: this.page,
      },
    });
  }

  get inputValue() {
    return this.searchQuery;
  }

  set inputValue(newQuery) {
    this.searchQuery = newQuery;
  }
  getSearchData() {
    return this.createConfig()
      .get()
      .then(res => {
        this.nextPage();
        return res.data;
      });
  }
  nextPage() {
    this.page++;
  }
  resetPage() {
    this.page = 1;
  }
}
