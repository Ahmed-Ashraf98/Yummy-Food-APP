"use strict";
import APIController from "./api-controller.js";
import UIController from "./ui-controller.js";
import MealDetails from "./mealDetails.js";

 // Defines that JavaScript code should be executed in "strict mode"

class Meals{

    constructor(){
        this.uiController = new UIController();
        this.apiController = new APIController();
    }

    async getDefaultMeals(){
        
        try{
            this.uiController.showLoader();

            let response = await this.apiController.searchMealByName();
            if (response.ok){
                let mealsList = await response.json();
                this.uiController.hideLoader();
                this.uiController.displayMealsList(mealsList.meals);
                this.addMealCardsEvents();
            }
        }catch(error){
            console.log(error);  
        }
    }

    async getAllMealsByCategory(categoryName){

        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllMealsByCategory(categoryName);
            if (response.ok){
                let mealsList = await response.json();
                console.log(mealsList)
                this.uiController.hideLoader();
                this.uiController.displayMealsList(mealsList.meals);
                this.addMealCardsEvents();
            }

        }catch(error){
            console.log(error);    
        }
    }

    async getAllMealsByArea(areaName){

        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllMealsByArea(areaName);
            if (response.ok){
                let mealsList = await response.json();
                console.log(mealsList)
                this.uiController.hideLoader();
                this.uiController.displayMealsList(mealsList.meals);
                this.addMealCardsEvents();
            }

        }catch(error){
            console.log(error);    
        }
    }

    async getAllMealsByIngredient(ingredientName){
        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllMealsByIngredient(ingredientName);
            if (response.ok){
                let mealsList = await response.json();
                console.log(mealsList)
                this.uiController.hideLoader();
                this.uiController.displayMealsList(mealsList.meals);
                this.addMealCardsEvents();
            }

        }catch(error){
            console.log(error);    
        }
    }


    async getAllMealsByName(name){
        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllMealsByIngredient(name);
            if (response.ok){
                let mealsList = await response.json();
         
                this.uiController.hideLoader();
                this.uiController.displayMealsList(mealsList.meals,"searchResult");
                this.addMealCardsEvents();
                
            }

        }catch(error){
            console.log(error);    
        }
    }

    async getAllMealsByFirstLetter(fLetter){
        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllMealsByFirstLetter(fLetter);
            if (response.ok){
                let mealsList = await response.json();
   
                this.uiController.hideLoader();
                this.uiController.displayMealsList(mealsList.meals,"searchResult");
                this.addMealCardsEvents();
            }

        }catch(error){
            console.log(error);    
        }
    }

    addMealCardsEvents(){
        let mealCard = $(".main-card.meal");
        mealCard.on("click",async (event)=>{
            event.preventDefault();
            let elementId = event.currentTarget.getAttribute("data-id");
            // 1- Hide Main View section
            this.uiController.toggleMainView(false)
            // 2- Show Meal Details Section
            this.uiController.toggleDetailsView();
            // 3- Create an instance for Meal details and pass the id
            new MealDetails(elementId);
        })
    }

    
}

export default Meals;