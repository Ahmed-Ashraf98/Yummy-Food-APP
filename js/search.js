"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import APIController from "./api-controller.js";
import UIController from "./ui-controller.js";
import Meals from "./meals.js";

class Search{

    constructor(){
        this.uiController = new UIController();
        this.apiController = new APIController();
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
            this.meals.getAllMealsByFirstLetter(event.target.value)
        }); 


    }
    
    


}


export default Search;