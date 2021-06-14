export default class Likes{
	constructor(){
		this.likes = [];
	}
	addLikes(id,title,author,img){
	   const like = { id,title,author,img };
	   this.likes.push(like);

	   //Persist data in local storage
	   this.persistData();
	   return like;
	}
	deleteLikes(id){
       const index = this.likes.findIndex(el => el.id === id);
       this.likes.splice(index,1);

       //persist data on loicakl storage
       this.persistData();
	}
	isLiked(id){
       return this.likes.findIndex(el => el.id === id) !== -1;
	}
	getNumLikes(){
	  return this.likes.length;
	}
	persistData(){
        localStorage.setItem("likes",JSON.stringify(this.likes));
	}
	readLocalStorage(){
        const storage = JSON.parse(localStorage.getItem("likes"));
        if(storage) this.likes = storage;
	}
}