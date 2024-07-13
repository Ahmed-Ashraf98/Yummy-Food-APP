"use strict"; // Defines that JavaScript code should be executed in "strict mode"

class APIController{

    constructor(){
        this.baseUrl = "https://www.themealdb.com/api/json/v1"
        this.apiKey  = "1";
    }

    async callAPI(endPoint,queryParams,methodType){
        const options={method: methodType};
        let response = await fetch(`${this.baseUrl}/${this.apiKey}/${endPoint}${ ( queryParams ? `?${queryParams}`:"") }`,options);
        return response;
    }

    async searchMealByName(mealName){
        let endPoint = "search.php";
        let queryParams = `s=${mealName ? mealName : ""}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }
    
    async getAllMealsByFirstLetter(letter){
        let endPoint = "search.php";
        let queryParams = `f=${letter}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getMealDetailsById(id){
        let endPoint = "lookup.php";
        let queryParams = `i=${id}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getAllCategories(){
        let endPoint = "categories.php";
        return await this.callAPI(endPoint,null,'GET');
    }

    async getAllMealsByCategory(categoryName){
        let endPoint = "filter.php";
        let queryParams = `c=${categoryName}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getAllAreas(){
        let endPoint = "list.php";
        let queryParams = `a=list`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }
    

    async getAllMealsByArea(area){
        let endPoint = "filter.php";
        let queryParams = `a=${area}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getAllIngredients(){
        let endPoint = "list.php";
        let queryParams = `i=list`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getAllMealsByIngredient(ingredientName){
        let endPoint = "filter.php";
        let queryParams = `i=${ingredientName}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getAllMealsByName(name){
        let endPoint = "search.php";
        let queryParams = `s=${name}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }

    async getAllMealsByFirstLetter(fLetter){
        let endPoint = "search.php";
        let queryParams = `f=${fLetter}`;
        return await this.callAPI(endPoint,queryParams,'GET');
    }


}



export default APIController