"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import APIController from "./api-controller.js";
import UIController from "./ui-controller.js";
import Meals from "./meals.js";

class Categories{

    constructor(){
       this.apiController = new APIController()
       this.uiController = new UIController();
       
    }   


    async getAllCategories(){
        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllCategories();
            if (response.ok){
                let categoriesList = await response.json();

                this.uiController.displayAllCategories(categoriesList.categories);
                this.addCategoryCardsEvents();
                this.uiController.hideLoader();

            }

        }catch(err){

        }
    }


    


    addCategoryCardsEvents(){
        let categoryCards = $(".main-card.category");
        categoryCards.on("click",async (event)=>{
            event.preventDefault();
            let categoryName = event.currentTarget.getAttribute("data-name");
            
            console.log(categoryName)
            // 2- Show Loading
            this.uiController.showLoader();
            this.uiController.toggleMainView();
            // 3- Create instance from GameDetails, to display the game details
            let meals = new Meals();
            await meals.getAllMealsByCategory(categoryName);
        })
    }

}

export default Categories;