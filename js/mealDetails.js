"use strict";
import APIController from "./api-controller.js";
import UIController from "./ui-controller.js";

 // Defines that JavaScript code should be executed in "strict mode"

class MealDetails{

    constructor(id){
        this.id = id;
        this.uiController = new UIController(); // Create instance from ui, so we can hid / show / display
        this.apiController = new APIController();
        this.getMealDetails(id);
        this.addCloseBtnEvent(); // Add close action for close icon in the game details screen
    }


    async getMealDetails(id){
        try{
            this.uiController.showLoader();

            let response = await this.apiController.getMealDetailsById(id);
            if (response.ok){
                let mealsList = await response.json();
                console.log(mealsList) 
                this.uiController.displayMealDetails(mealsList.meals[0]);
                this.uiController.hideLoader();

            }

        }catch(err){

        }
    }

    addCloseBtnEvent(){
        // This function to add close event when user click on X icon to close the game details
        $("#detailsCloseBtn").on("click",()=>{
        //TODO:  Know the pervious page ?
        console.log("Ok")
        this.uiController.toggleDetailsView(false);
        this.uiController.toggleMainView();
        // this.ui.hideGameDetailsView(); // hide the game details
        // this.ui.showGamesLisView(); // show the current games list view
   })
    }

}

export default MealDetails;