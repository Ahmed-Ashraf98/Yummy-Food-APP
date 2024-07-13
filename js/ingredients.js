"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import APIController from "./api-controller.js";
import UIController from "./ui-controller.js";
import Meals from "./meals.js";

class Ingredients{

    constructor(){
        this.apiController = new APIController()
        this.uiController = new UIController(); 
    }

    async getAllIngredients(){
        
        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllIngredients();
            if (response.ok){
                let ingredientsList = await response.json();
                this.uiController.displayAllIngredients(ingredientsList.meals);
                this.addIngredientsCardsEvents();
                this.uiController.hideLoader();
            }

        }catch(err){

        }
    }

    addIngredientsCardsEvents(){
        let ingredientsCards = $(".main-card.ingredient");
        ingredientsCards.on("click",async (event)=>{
            event.preventDefault();
            let ingredientName = event.currentTarget.getAttribute("data-name");
        
            // 2- Show Loading
            this.uiController.showLoader();
            this.uiController.toggleMainView();
            let meals = new Meals();
            await meals.getAllMealsByIngredient(ingredientName);
        })
    }

}


export default Ingredients;