import { elements } from "./base"; //importing the elements from base.js file
export const getInput = () => elements.searchInput.value; //returns the input search query from the user
export const clearInput = () => {
    elements.searchInput.value = "";
};
export const clearPreviousSearch = () => {
    elements.searchResults.innerHTML = "";
    elements.pagination.innerHTML = "";
};
//Reduces tht title length such that it'll display in one line
export const simplifyTitle = (title,limit = 17) => {
    if(title.length > 17){
        const newTitle = [];
        title.split(" ").reduce((acc,value) =>{
            if((acc + value.length) <=17){
                newTitle.push(value);
            }
            return acc + value.length;
        },0);
        return `${newTitle.join(" ")} ...`;
    }
    return title;
};
const renderRecipe = recipe => {
    //Stores the HTML markup for displaying the seaerch results
    const markup = `
        <li>
            <a href="#${recipe.recipe_id}" class="results__link">
                <figure class="results__fig">
                    <img src=${recipe.image_url} alt=${simplifyTitle(recipe.title)} class="results__img">
                </figure>
                <div class="results__data">
                    <h4 class="results__title">${simplifyTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    //Adds the markup to before the ending of search list container 
    elements.searchResults.insertAdjacentHTML("beforeend",markup);
};

const createButton = (page,type) => {
     const btn = `
        <button class="btn--inline pagination__btn--${type}" data-goto="${type === "prev" ? page - 1:page + 1}">
            <span>Page ${type === "prev" ? page - 1:page + 1}</span>
            <svg class="pagination__icon">
                <use href="img/icons.svg#icon-arrow-${type === "prev" ?"left":"right"}"></use>
            </svg>
        </button>
     `;
     return btn;
};
const renderButtons = (page,numOfRecipes,recPerPages) => {
    const pages = Math.ceil(numOfRecipes / recPerPages);
    let button;
    if(page === 1 ){
        //Render only one button with page 2 text on it
        button = createButton(page,"next");
    } else if(page < pages){
        //Render two buttons with "Previous" and "Next" text on it
        button =`
            ${createButton(page,"prev")}
            ${createButton(page,"next")}
        `;
    } else if(page === pages){
        //Render only one button with 'Previous' text on it
        button = createButton(page,"prev");
    }

    elements.pagination.insertAdjacentHTML("afterbegin",button);
};
export const renderRecipeLists = (recipes,page=1,recPerPages = 10) => {
    const start = (page - 1) * recPerPages;//0
    const end = page * recPerPages;
    recipes.slice(start,end).forEach(renderRecipe); //loops through each recipes
    renderButtons(page,recipes.length,10);
};
export const highlightRecipeLists = id => {
   const recipeLists = Array.from(document.querySelectorAll(".results__link--active"));
   recipeLists.forEach(el =>{
    el.classList.remove("results__link--active");
   });
   document.querySelector(`.results__link[href="#${id}"`).classList.add("results__link--active");
};