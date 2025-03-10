"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import APIController from "./api-controller.js";
import Areas from "./areas.js";
import Categories from "./categories.js";
import ContactUs from "./contact-us.js";
import Ingredients from "./ingredients.js";
import Meals from "./meals.js";
import Search from "./search.js";
import UIController from "./ui-controller.js";


class FoodApp{

    constructor(){
        this.apiController = new APIController()
        this.uiController = new UIController();
        this.meals = new Meals();
        this.addSideBarEvents();
        this.startApp();
    }

    async startApp(){
        this.uiController.hideOtherViews("mainPage");
        await this.meals.getDefaultMeals(); 
    }

    async createObjById(id){
        let obj;
        switch (id) {
            case "search":
                new Search();
                this.uiController.displayPageById(id);
                this.uiController.hideLoader();
                break;
            case "categories":
                obj = new Categories();
                this.uiController.displayPageById(id)
                await obj.getAllCategories();
                break;
            case "area":
                obj = new Areas();
                this.uiController.displayPageById(id)
                await obj.getAllAreas();
                break;
            case "ingredients":
                obj = new Ingredients();
                this.uiController.displayPageById(id)
                await obj.getAllIngredients();
                break;
            case "contactUs":
                new ContactUs();
                this.uiController.displayPageById(id);
                this.uiController.hideLoader();
                break;
        }
    }

    addSideBarEvents(){
        let menuList = $(".side-bar-collapse .top-section .menu li");
        menuList.on("click",async (event)=>{
            event.preventDefault();
            this.uiController.showLoader();
           await this.createObjById(event.target.id);
        })
    }

}

export default FoodApp;