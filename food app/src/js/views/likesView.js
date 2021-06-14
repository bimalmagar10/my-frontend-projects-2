import { elements } from "./base";
import { simplifyTitle } from "./searchView";
export const toggleBtn = (isLiked) => {
      const result = isLiked === true ? "bookmark-fill" : "bookmark";
      document.querySelector(".btn--round use").setAttribute("href",`img/icons.svg#icon-${result}`);
};
export const deleteLikes = id => {
		const el =  document.querySelector(`.bookmarks__link[href="#${id}"]`).parentElement;
        el.parentElement.removeChild(el);
};
export const toggleLikesMessage = likesLength => {
  elements.likesMessage.style.display = likesLength > 0 ? "none" : "block";
};
export const renderLikes = likes  => {
	 const markup = `
		<li class="bookmarks__list--item">
			<a href="#${likes.id}" class="bookmarks__link">
				<figure class="bookmarks__fig">
					<img src="${likes.img}" alt="${likes.title}" class="bookmarks__img">
				</figure>
				<div class="bookmarks__data">
					<h4 class="bookmarks__name">
						${simplifyTitle(likes.title)}
					</h4>
					<div class="bookmarks__author">${likes.author}</div>
				</div>
			</a>
		</li>
	 `;
	 elements.bookmarksList.insertAdjacentHTML("beforeend",markup);
};