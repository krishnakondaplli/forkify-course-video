import View from './view';
import icons from 'url:../../img/icons.svg'; //for parcel2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addhandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto; //here + symbol indicates the converting string to number

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPage);
    //1.Page 1, and there are other Pages
    if (curPage === 1 && numPage > 1) {
      return `
       <button data-goto="${
         curPage + 1
       }"class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
       </button> `;
    }

    //3.Last Page.
    if (curPage === numPage && numPage > 1) {
      return `
       <button  data-goto="${
         curPage - 1
       }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
       </button>`;
    }

    //4.Other Page
    if (this._data.page < numPage) {
      return `
      <button  data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
           </svg>
           <span>${curPage - 1}</span>
      </button>

      <button  data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
       </button>
      
      `;
    }
    //2.Page1. and there are No other Pages.
    return '';
  }
}

export default new PaginationView();
