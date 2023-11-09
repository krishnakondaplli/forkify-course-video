import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import restoreBookmarks from './model.js';
import addRecipeView from './views/addRecipeView.js';
import uploadRecipe from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//This is not real javascript it is comes form the parcel
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //0.Update result view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    // 1)Updating bookamrks view
    bookmarksView.update(model.state.bookmarks);
    //2).Loading Recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //3).Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
  // console.log(model.state.recipe);
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);

    //1.Get search Query
    const query = searchView.getQuery();
    if (!query) return;

    //2.Load Search Results
    await model.loadSearchResults(query);

    //3.Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //4.Render initial Pagination Buttons.
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

//Creating another controller for pagination
const controlPagination = function (gotoPage) {
  //3.Render  New Results

  resultsView.render(model.getSearchResultsPage(gotoPage));

  //4.Render New Pagination Buttons.
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update recipe servings(in State)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  //update methode use for just updates DOM events not rendering whole page
};
const controlAddBookmark = function () {
  //Add/Remove bookmarks
  if (!model.state.recipe.bookmarks) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //Update Recipe view
  recipeView.update(model.state.recipe);

  //Renderbookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);

    //Render loading spinner
    addRecipeView.renderSpinner();
    //Upload new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render recipe
    recipeView.render(model.state.recipe);
    //successfull message
    addRecipeView.renderMessage();

    //Render Bookmark View
    bookmarksView.render(model.state.bookmarks);
    //Chnage Id in URL
    window.history.pushState(null, '', ` #${model.state.recipe.id}`);
    //PushState() here is used to change the url and give the Id without loading and by using this we can go back to the page.
    //window.history.back()
    //CLose form windwo
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};
const newFeature = function () {
  console.log('wellcome to the new feature');
};

const init = function () {
  bookmarksView.addhandlerRender(controBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addhandlerUpdateServings(controlServings);
  recipeView.addhandlerAddBookmark(controlAddBookmark);
  searchView.addhandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPagination);
  addRecipeView.addhandlerUpload(controlAddRecipe);
  model.restoreBookmarks();
  newFeature();
};
init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
