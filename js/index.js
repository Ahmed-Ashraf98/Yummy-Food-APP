"use strict"; // Defines that JavaScript code should be executed in "strict mode"

// * ===================== [ Imports ] ===========================

import FoodApp from "./foodApp.js";

// * ===================== [ Get elements ] ===========================

const sideBar = $("#sideBar");
const sideBarTogglerBtn = $("#sideBarTogglerBtn");

// * ======================== Sidebar ==================================

// offsetLeft

let sideBarIsOpned = () => sideBar[0].offsetLeft == 0;

function toggleSideBar(leftPx,classToAdd,classToRemove){
    sideBar.animate({left:`${leftPx}px`},500);
    sideBarTogglerBtn[0].classList.remove(classToRemove);
    sideBarTogglerBtn[0].classList.add(classToAdd);
    let menuItems = $(".side-bar-collapse .top-section .menu li");
    if(leftPx == 0){
        menuItems.animate({top: "0px" }, 500)
    }else{
        menuItems.animate({top:"300px"},500);
    }
    

}

sideBarTogglerBtn.on("click",function(){

    if(sideBarIsOpned()){
        // close the sidebar and update icon of toggler button
        toggleSideBar(-266,"fa-bars","fa-xmark");
        
    }else{
        // open the sidebar and update icon of toggler button  
        toggleSideBar(0,"fa-xmark","fa-bars");
    }
});



new FoodApp();