"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import APIController from "./api-controller.js";
import UIController from "./ui-controller.js";
import Meals from "./meals.js";

class Areas{

    constructor(){
        this.apiController = new APIController()
        this.uiController = new UIController(); 
    }

    async getAllAreas(){
        
        try{
            this.uiController.showLoader();
            let response = await this.apiController.getAllAreas();
            if (response.ok){
                let areasList = await response.json();
                this.uiController.hideLoader();
                this.uiController.displayAllAreas(areasList.meals);
                this.addAreaCardsEvents();
            }
        }catch(error){
            console.log(error);   
        }
    }

    addAreaCardsEvents(){
        let areaCards = $(".main-card.area");
        areaCards.on("click",async (event)=>{
            event.preventDefault();
            let areaName = event.currentTarget.getAttribute("data-name");
        
            // 2- Show Loading
            this.uiController.showLoader();
            this.uiController.toggleMainView();
            let meals = new Meals();
            await meals.getAllMealsByArea(areaName);
        })
    }

}


export default Areas;