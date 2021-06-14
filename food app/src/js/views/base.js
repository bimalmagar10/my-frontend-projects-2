//Selecting the particular element from the HTML DOM  as a value in the OBJECT
export const elements = {
    searchInput:document.querySelector(".search__field"),
    searchResults:document.querySelector(".results__list"),
    error:document.querySelector(".error"),
    searchRes:document.querySelector(".results"),
    pagination:document.querySelector(".pagination"),
    recipeSection:document.querySelector(".recipe"),
    shopList:document.querySelector(".shopping__list"),
    bookmarksList:document.querySelector(".bookmarks__list"),
    likesMessage:document.querySelector(".message")
};
export const elementsStrings = {
    loader:"loader"
};
export const clearLoader = () => {
    const loader =  document.querySelector(`.${elementsStrings.loader}`);
    loader.parentElement.removeChild(loader);
};
export const renderLoader = parent => {
    const loader = `
     <div class=${elementsStrings.loader}>
        <svg>
           <use href="./img/icons.svg#icon-loader"></use>
        </svg>
     </div>
    `;
    parent.insertAdjacentHTML("afterbegin",loader);
};