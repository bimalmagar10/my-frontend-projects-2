import { elements } from "./base";
import { Fraction } from "fractional";
export const clearRecipe = () => {
	elements.recipeSection.innerHTML = "";
};
export const formatCount = count => {
	//2.5 = 5/2
	if(count){
		const newCount = Math.round(count * 1000) / 1000;
		let [int,dec]= newCount.toString().split(".").map(el => parseInt(el));
		if(!dec) return newCount;
		if(int === 0){
			const fr = new Fraction(newCount);
			return `${fr.numerator}/${fr.denominator}`;
		} else {
			const fr = new Fraction(newCount - int);
			return `${int} ${fr.numerator}/${fr.denominator}`;
		}
	}
	return "?";
};
const createIngredients = ingredient =>`
	<li class="recipe__ingredient">
		<svg class="recipe__icon">
			<use href="img/icons.svg#icon-check"></use>
		</svg>
		<div class="recipe__quantity">${formatCount(ingredient.count)}</div>
		<div class="recipe__description">
			<span class="recipe__unit">${ingredient.unit}</span>${ingredient.ingredient}
		</div>
	</li>
`;

export const renderRecipe = (recipe,isLiked) => {
	const markup = `
		<figure class="recipe__fig">
			<img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
			<h1 class="recipe__title">
				<span>${recipe.title}</span>
			</h1>
		</figure>
		<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-clock">
				</svg>
				<span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
				<span class="recipe__info-text">minutes</span>
			</div>
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-users">
				</svg>
				<span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
				<span class="recipe__info-text">Servings</span>
				<div class="recipe__info-buttons">
					<button class="btn--tiny btn--decrease-servings">
						<svg class="recipe__info-icon">
							<use href="img/icons.svg#icon-minus-circle"></use>
						</svg>
					</button>
					<button class="btn--tiny btn--increase-servings">
						<svg class="recipe__info-icon">
							<use href="img/icons.svg#icon-plus-circle"></use>
						</svg>
					</button>
				</div>
			</div>
			<button class="btn--round">
				<svg>
					<use href="img/icons.svg#icon-bookmark${isLiked ? "-fill" : ""}"></use>
				</svg>
			</button>
		</div>
		<div class="recipe__ingredients">
			<h2 class="heading--secondary">Recipe Ingredients</h2>
			<ul class="recipe__ingredients-list">
			    ${recipe.ingredients.map(el => createIngredients(el)).join("")}
			</ul>
			<button class="btn--add recipe__add-to-shopping">
				<span>Add to Shopping</span>
				<svg>
					<use href="img/icons.svg#icon-arrow-right"></use>
				</svg>
			</button>
		</div>
		<div class="recipe__directions">
			<h2 class="heading--secondary">How to cook it?</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by 
				<span class="recipe__publisher">${recipe.publisher}</span>.Please check out the direction at their website.
			</p>
			<a href="${recipe.url}" class="btn--small recipe__btn">
				<span>Directions</span>
				<svg>
					<use href="img/icons.svg#icon-arrow-right"></use>
				</svg>
			</a>
		</div>
	`;
	elements.recipeSection.insertAdjacentHTML("beforeend",markup);

};
export const updateIngredientsServings = recipe => {
	//Servings
	document.querySelector(".recipe__info-data--people").textContent = recipe.servings;

	//Ingredients
	const countElements = Array.from(document.querySelectorAll(".recipe__quantity"));
	countElements.forEach((el,i) => {
		el.textContent = formatCount(recipe.ingredients[i].count);
	});
};