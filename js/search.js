"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import Meals from "./meals.js";

class Search{

    constructor(){
        this.meals = new Meals();
        this.addSearchEvents();
    }

    
    addSearchEvents(){

        $("#mealName").on("keyup", async (event)=>{
            console.log(event.target.value);
            await this.meals.getAllMealsByName(event.target.value)
        }); 

        $("#mealFletter").on("keyup",async (event)=>{
            console.log(event.target.value);
            await this.meals.getAllMealsByFirstLetter(event.target.value)
        });
        
    }

}


export default Search;