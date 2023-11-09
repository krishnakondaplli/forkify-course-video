import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //for parcel2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for query!Please try again :)';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
