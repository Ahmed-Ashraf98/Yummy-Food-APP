"use strict"; // Defines that JavaScript code should be executed in "strict mode"

class UIController {

    static numberOfRowData = 20;

    showLoader() {
        // fade-in-a-flex-box : requires to set th display as flex then hide the element then fadeIn
        $("#mainLoader").css("display", "flex").hide();
        $("#mainLoader").fadeIn("slow");
    }

    hideLoader() {
        $("#mainLoader").fadeOut("slow");
    }


    displayPageById(id) {
        switch (id) {
            case "search":
                this.toggleSearchPage();
                this.hideOtherViews(id);
                break;
            case "contactUs":
                this.toggleContactUsPage();
                this.hideOtherViews(id);
                break;
            default:
                this.toggleMainView();
                this.hideOtherViews(id);
                break;
        }
    }

    showViewById(currentViewId){
        $(`section#${currentViewId}View`).show();
    }

    hideOtherViews(currentViewId){
        $(`section:not(#${currentViewId}View)`).hide();  // hide everything that isn't currentViewId
    }

    toggleMainView(show=true) {
        // call main page HTML
        if(show){
            $("#mainPageView").css("display","block");
        }else{
            $("#mainPageView").css("display","none");
        }
    }

    toggleDetailsView(show=true) {
        // call main page HTML
        if(show){
            $("#mealDetailsView").css("display","block");
        }else{
            $("#mealDetailsView").css("display","none");
        }
    }

    toggleSearchPage(show=true) {
        // call main page HTML
        if(show){
            
            $("#searchView").css("display","block");
        }else{
            $("#searchView").css("display","none");
        }
    }

    toggleContactUsPage(show=true) {
        if(show){
            $("#contactUsView").css("display","block");
        }else{
            $("#contactUsView").css("display","none");
        }
    }


    //* ====================== Display Data =============

    displayAllCategories(categoriesList){
        
        let htmlBox=``;

        for (let i = 0; i < categoriesList.length; i++) {
            htmlBox +=  `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <figure class="main-card category position-relative rounded rounded-3 overflow-hidden" data-id="${categoriesList[i].idCategory}" data-name="${categoriesList[i].strCategory}" >
                <img class="w-100" src="${categoriesList[i].strCategoryThumb}" alt="${categoriesList[i].strCategory} image">
                <figcaption class="main-card-layer text-center position-absolute">
                    <h3 class="fs-2 ps-2 mt-1">${categoriesList[i].strCategory}</h3>
                    <p>${categoriesList[i].strCategoryDescription.slice(0,80)}</p>
                </figcaption>
                </figure>
            </div>
            `;
        }

        $("#rowData").html(htmlBox);
    }


    displayAllAreas(areasList){
       
        let areasHtmlBox= ``;
        for (let i = 0; i < areasList.length; i++) {
            areasHtmlBox +=  `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="main-card area border border-2 border-white rounded rounded-2 d-flex flex-column justify-content-center align-items-center text-white" data-name="${areasList[i].strArea}">
                    <i class="fa-solid fa-map-location-dot fs-1"></i>
                    <h3>${areasList[i].strArea}</h3>
                </div>
            </div>
            `;
        }

        $("#rowData").html(areasHtmlBox);


    }

    displayAllIngredients(ingredList){

        let ingredHtmlBox= ``;
        for (let i = 0; i < UIController.numberOfRowData; i++) {
            ingredHtmlBox +=  `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="main-card ingredient border border-2 border-white rounded rounded-2 p-2 d-flex flex-column justify-content-center align-items-center text-white" data-id="${ingredList[i].idIngredient}" data-name="${ingredList[i].strIngredient}">
                    <i class="fa-solid fa-plate-wheat fs-1"></i>
                    <h3>${ingredList[i].strIngredient}</h3>
                    <p>${ingredList[i].strDescription.slice(0,50)}</p>
                </div>
            </div>
            `;
        }
   
        $("#rowData").html(ingredHtmlBox);
    }

    displayMealsList(mealsList,sectionId="rowData"){

        let mealsBox=``;
        console.log("----------------------------------")
        console.log(mealsList)

        let size = mealsList.length > 20 ?  UIController.numberOfRowData : mealsList.length;

        for (let i = 0; i < size; i++) {
          
            mealsBox +=  `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <figure class="main-card meal position-relative rounded rounded-3 overflow-hidden" data-id="${mealsList[i].idMeal}" data-name="${mealsList[i].strMeal}">
                <img class="w-100" src="${mealsList[i].strMealThumb}" alt="${mealsList[i].strMeal} image">
                <figcaption class="main-card-layer position-absolute">
                    <h3 class="fs-2 ps-2">${mealsList[i].strMeal}</h3>
                </figcaption>
                </figure>
            </div>
            `;
        }


        $(`#${sectionId}`).html(mealsBox);
    }

    displayMealDetails(mealObj){

        let recipesList=[];
        let recipesHtmlItems =``;

        for (const key in mealObj) {
            if(key.startsWith("strIngredient")){
                recipesList.push(mealObj[key])
            }
        }

        for (let i = 0; i < recipesList.length; i++) {
            recipesHtmlItems += `<li class="badge badge-recipes">${recipesList[i]}</li>`
        }

        let tagsHtmlItems =``;
        if(mealObj.strTags){ // if not null
            let tags =mealObj.strTags.split(",");
            for (let i = 0; i < tags.length; i++) {
                tagsHtmlItems += `<li class="badge badge-tags">${tags[i]}</li>`
            }
        }

        
        let sourceBtn=``;
        let youtubeBtn =``;

        if(mealObj.strSource){ // if not null
            sourceBtn = ` <a href="${mealObj.strSource}" target="_blank" role="button" class="btn btn-success me-2"> Source </a>`
        }else{
            sourceBtn = ` <a class="btn btn-success me-2 disabled" role="button" aria-disabled="true"> Source </a>`
        }


        if(mealObj.strYoutube){ // if not null
            youtubeBtn = `<a href="${mealObj.strYoutube}" target="_blank" role="button" class="btn btn-danger"> Youtube </a>`
        }else{
            youtubeBtn = `<a  class="btn btn-danger disabled" role="button" aria-disabled="true"> Youtube </a>`
        }


        let mealBox =`
          <div class="col-md-4">
              <figure class="overflow-hidden rounded rounded-2">
                <img class="w-100 rounded rounded-2" src="${mealObj.strMealThumb}" alt="${mealObj.strMeal} image">
                <figcaption>
                  <h3 class="mt-3">${mealObj.strMeal}</h3>
                </figcaption>
              </figure>
          </div>
          <div class="col-md-8">
            <h3>Instructions</h3>
            <p>${mealObj.strInstructions}</p>
            <h3>Area : ${mealObj.strArea}</h3>
            <h3>Category: ${mealObj.strCategory}</h3>
            <h4>Recipes:</h4>
            <ul class="list-unstyled recipes-list d-flex flex-wrap">
                ${recipesHtmlItems}
            </ul>
            <h4>Tags :</h4>

            <ul class="list-unstyled d-flex flex-wrap mt-1">
              ${tagsHtmlItems}
            </ul>

            <ul class="list-unstyled d-flex flex-wrap mt-1">
              <li>${sourceBtn}</li>
              <li>${youtubeBtn}</li>
            </ul>
          </div>
        `;

        $("#mealDetailsData").html(mealBox);
    
    }

}






export default UIController;