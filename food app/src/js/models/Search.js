import axios from "axios"; //importing the library axios to fetch the data from a server/origin

//Decalres a new class Search to perform the searching tasks for displaying recipes
export default class Search{
	constructor(query){ //Search query i.e pizza/apple/pasta
		this.query = query;
	}
	//Fetches the data from the API
	async getRecipes(){
		try {
			const result = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
			this.recipes = result.data.recipes;//undefined if network error
		} catch(error){
			alert(error);//alerts in the brower if the error is triggered
		}
	}
}