import { nanoid } from 'nanoid';
export default class List{
	constructor(){
		this.items = [];
	}
	addItem(count,unit,ingredient){
      const item = {
      	id:nanoid(),
      	count,
      	unit,
      	ingredient
      };
      this.items.push(item);
      return item;
	}
	deleteItem(id){
	   const itemIndex = this.items.findIndex(el => el.id === id);
       this.items.splice(itemIndex,1);
	}
	updateItem(id,newCount){
		this.items.find(el => el.id === id).count = newCount;
	}
}