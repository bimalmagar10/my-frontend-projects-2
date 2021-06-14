// import str from "./models/Search";
// // import { add as a,multiply as b } from "./views/searchView";
// import * as searchView from "./views/searchView";
// console.log(`${str}.The addition is ${searchView.add(2,3)} and the multiplication is ${searchView.multiply(2,3)}.`);
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as SearchView from "./views/searchView";
import * as RecipeView from "./views/recipeView";
import * as ListView from "./views/listView";
import * as LikesView from "./views/likesView";
import { elements,renderLoader,clearLoader} from "./views/base";

/** 
**SEARCH CONTROLLER
**/
const state = {};
window.state = state;
const controlSearch = async () =>{
    //Get a query from a  view/UI
    const query = SearchView.getInput();
    if(query){
       //Declare a new Search 
       state.search = new Search(query);
       //Prepare UI for Results 
       SearchView.clearInput();
       SearchView.clearPreviousSearch();
       renderLoader(elements.searchRes);
       try {
         //Search for recipes
         await state.search.getRecipes();
         clearLoader();

         //Display the result to the UI
        //console.log(state.search.recipes);
         SearchView.renderRecipeLists(state.search.recipes);
       } catch(err){
          alert("Something went wrong ihe search!");
       }
    }
};
document.querySelector(".search").addEventListener("submit",(event) =>{
    event.preventDefault();
    controlSearch();
});

elements.pagination.addEventListener("click",(event) => {
  const parent = event.target.closest(".btn--inline");
  if(parent) {
    const getGotoId = parseInt(parent.dataset.goto);
    SearchView.clearPreviousSearch();
    SearchView.renderRecipeLists(state.search.recipes,getGotoId);
  }
});

/** 
**RECIPE CONTROLLER
**/
const controlRecipe = async () =>{
   const id  = window.location.hash.replace("#","");
   
   if(id) {
      // SearchView.highlightRecipeLists(id);
      RecipeView.clearRecipe();
      //Create a new Recipe Object with ID
      if(state.search) SearchView.highlightRecipeLists(id);
      state.recipe = new Recipe(id);
      renderLoader(elements.recipeSection);

      try { 
        //Get data
        await state.recipe.getRecipe();
        clearLoader();
        state.recipe.parseIngredients();
        //Calulate time and servings
        state.recipe.calculateTime();
        state.recipe.calculateServings();
        RecipeView.renderRecipe(
          state.recipe,
          state.likes.isLiked(id));
     } catch(err){
       console.log(err);
        alert("Something went wrong while retrieving data :( !!");
     }
   }
}
// window.addEventListener("hashchange",controlRecipe);
// window.addEventListener("load",controlRecipe);
["hashchange","load"].forEach(el => window.addEventListener(el,controlRecipe));

//LIST CONTROLLER
const controlList = () => {
    if(!state.list) state.list =  new List();

    state.recipe.ingredients.forEach((el,i) => {
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        console.log(item);
        ListView.renderList(item);
    });
};

elements.shopList.addEventListener("click",(e) =>{
  const id = e.target.closest(".shopping__list--item").dataset.itemid;

  if(e.target.matches(".btn--delete,.btn--delete *")){
    //Delete the shopping item to happen
    //Delete from the state 
     state.list.deleteItem(id);
    //Delete from the UI
    ListView.deleteList(id);
  } else if(e.target.matches(".shopping__quantity")){
    const count = parseFloat(e.target.value);
    state.list.updateItem(id,count);
  }
});

//LIKES CONTROLLER
const controlLikes = () => {
    const currentID = state.recipe.id;
    if(!state.likes) state.likes = new Likes();
    
    if(!state.likes.isLiked(currentID)) {
      //Add likes to the state
       const like = state.likes.addLikes(
          currentID,
          state.recipe.title,
          state.recipe.publisher,
          state.recipe.img
        );
      //toggle in the UI
      LikesView.toggleBtn(true);
      //Add to the side-nav
      LikesView.renderLikes(like);
    } else {
      //Delete likes from the state
        state.likes.deleteLikes(currentID);
      //toggle in the UI
         LikesView.toggleBtn(false);
      //Delete from the side-nav
        LikesView.deleteLikes(currentID);
    }
    LikesView.toggleLikesMessage(state.likes.getNumLikes());

};

window.addEventListener("load",() => {
    state.likes = new Likes();
    state.likes.readLocalStorage();
    LikesView.toggleLikesMessage(state.likes.getNumLikes());
    state.likes.likes.forEach(el => {
        LikesView.renderLikes(el);
    });
    
});

//Handle the sewrvings button
document.querySelector(".recipe").addEventListener("click",(event)=>{
     if(event.target.matches(".btn--decrease-servings,.btn--decrease-servings *")){
         //Respond to decrease servings button
         if(state.recipe.servings > 1){
           state.recipe.updateServings("dec");
           RecipeView.updateIngredientsServings(state.recipe);
         }
     }
     if(event.target.matches(".btn--increase-servings,.btn--increase-servings *")){
         //Respond to decrease servings button
         state.recipe.updateServings("inc");
         RecipeView.updateIngredientsServings(state.recipe);
     }
     if(event.target.matches(".recipe__add-to-shopping,.recipe__add-to-shopping *")){
      controlList();
     }
     if(event.target.matches(".btn--round,.btn--round *")){
      controlLikes();
     }
});




