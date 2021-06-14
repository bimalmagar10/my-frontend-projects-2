import axios from "axios";

export default class Recipe{
	constructor(id){
		this.id = id;
	}
	async getRecipe(){
		try {
			const recipe = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			console.log(recipe);
			this.title = recipe.data.recipe.title;
			this.ingredients = recipe.data.recipe.ingredients;
			this.publisher = recipe.data.recipe.publisher;
			this.img = recipe.data.recipe.image_url;
			this.url = recipe.data.recipe.source_url;
		} catch(error){
			alert(error);
		}
	}
	calculateTime(){
		//Three ingredients takes 15 minutes of time
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}
	calculateServings() {
		this.servings = 4;
	}
	parseIngredients(){
		const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon',
		'cups','pounds'];

		const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
		
		const newIngredients = this.ingredients.map(el =>{
			//1. Uniform units
			let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,index) =>{ 
            	ingredient = ingredient.replace(unit,unitsShort[index]);
            });

			//2.Replace brackets
                ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

			//3.Separate count,unit and ingredients in as a single property
			const arrIng = ingredient.split(" ");
			const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
			let objIng;
			if(unitIndex  > -1){
				//The unit is present and number is also present
				const arrCount =  arrIng.slice(0,unitIndex);
				let count;
				if(arrCount.length === 1){
					count = eval(arrIng[0].replace("-","+"));
				} else {
					count =  eval(arrCount.join("+"));
				}
				objIng = {
					count,
					unit:arrIng[unitIndex],
					ingredient:arrIng.slice(unitIndex + 1).join(" ")
				};

			} else if(parseInt(arrIng[0])){
			   //No unit but the number is present
			   objIng = {
			   	count:parseInt(arrIng[0]),
			   	unit:"",
			   	ingredient:arrIng.slice(1).join(" ")
			   };
			} else if(unitIndex === -1 ){
				//NO unit and No Number
				objIng = {
					count:1,
					unit:"",
					ingredient
				}; 
			}

			return objIng;
		});
		this.ingredients = newIngredients;
	}
	updateServings(type){
	      //Servings
	      let newServings = type === "dec"? this.servings - 1:this.servings + 1;
	      
	      //Ingredients
	      
	      this.ingredients.forEach(ing => {
	      	ing.count *= (newServings / this.servings);
	      });
	      this.servings = newServings;
	}
}