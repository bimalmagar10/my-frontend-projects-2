import { elements } from "./base";
export const renderList = list => {
	const markup =`
        <li class="shopping__list--item" data-itemid="${list.id}">
			<input type="number" value="${list.count}" step="${list.count}" class="shopping__quantity">
			<span class="shopping__unit">${list.unit}</span>
			<span class="shopping__name">${list.ingredient}</span>
			<button class="btn--delete">&times;</button>
	    </li>
	`;
    elements.shopList.insertAdjacentHTML("beforeend",markup);
};

export const deleteList = id => {
	const listEl = document.querySelector(`[data-itemid="${id}"]`);
	listEl.parentElement.removeChild(listEl);
};