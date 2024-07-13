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
            

        }catch(err){

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

        }catch(err){

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

        }catch(err){

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

        }catch(err){

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

        }catch(err){

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

        }catch(err){

        }
    }

    addMealCardsEvents(){
        let mealCard = $(".main-card.meal");
        mealCard.on("click",async (event)=>{
            event.preventDefault();
            let elementId = event.currentTarget.getAttribute("data-id");
            // 1- Hide Main View section
            this.uiController.toggleMainView(false)
            this.uiController.toggleDetailsView();
            // 2- Show Loading
            this.uiController.showLoader();
            new MealDetails(elementId);
        })
    }

    
}

export default Meals;