"use strict";// Defines that JavaScript code should be executed in "strict mode"

class ContactUs{

    formInputs ={
        userName: {
            status: false
        },
    
        userEmail: {
            status: false,
        },
    
        userPassword: {
            status: false,
        },

        userPhone: {
            status: false,
        },

        userAge: {
            status: false,
        },

        rePassword: {
            status: false,
        }
    }

    inputsRegex = {

        userName: {
            pattern: /^[A-Za-z\s]{3,15}$/
        },
    
        userEmail: {
            pattern: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
        },
    
        userPassword: {
            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        },

        userPhone: {
            pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        },

        userAge: {
            pattern: /^(?:1[01][0-9]|120|[1-9]?[0-9])$/
        }

    }


    constructor(){
        this.addInputValidationEvents();
        this.clearInputs();
        this.addSubmitBtnEvent();
    }

    setInputValidaty(element,feedbackEle,inputIsValid,classToRmv,classToAdd,msg){
        // This function is used to :
        // - Update the input field status
        // - Mark the input as valid / in-valid
        // - Add messages in the feedback element
        
        let elementId = element[0].id;
        console.log(this.formInputs)
        this.formInputs[elementId] = inputIsValid;
        classToRmv && element.removeClass(classToRmv);
        classToAdd && element.addClass(classToAdd);
        if(msg){
            feedbackEle.html(`<div class="alert alert-danger mt-1" role="alert">${msg}</div>`);
        }else{
            feedbackEle.html("");
        }
        
    }

    
    AllInputsAreValid(){
        let allInputsValid = true;
        for (const key in this.formInputs) {
            if (!this.formInputs[key]) {
                allInputsValid = false;
            }
        }
        return allInputsValid;
    }


    clearInputs(){
        for (const inputId in this.formInputs) {
            this.formInputs[inputId]=false;
            $(`#${inputId}`).val("");
            $(`#${inputId}`).removeClass(["is-valid","is-invalid"]);
            $(`#${inputId}`).next().html("");

        }
    }

    validateInput(inputId){
        let inputElemnet = $(`input#${inputId}`);
        let eleVal = inputElemnet.val();
        // Get the feedback element, the div of feedback is next element of input
        // element.next => Element Sibling [ feedback div ]
        let feedbackElement = inputElemnet.next();

        if (this.inputsRegex[inputId].pattern.test(eleVal)) { 
            
            this.setInputValidaty(inputElemnet,feedbackElement,true,"is-invalid","is-valid",null);
            
            if( inputId == "userPassword" ){
                this.enableRePassInput();
            }

        } else { // if input is valid, then remove the error message and mark it as valid
            let msg;
            switch (inputId) {
                case "userName": msg = "Inavlid User Name, special chars and numbers are not allowed and the name should have at least 3 chars";
                    break;
                case "userEmail": msg = "Email Not Valid, example@yyy.com is an example of valid email pattern ";
                    break;
                case "userPhone": msg = "Inavlid Phone Number";
                    break;
                case "userAge": msg = "Inavlid User Age, the age should be between 1 - 120";
                    break;
                case "userPassword": msg = "Inavlid Password,User Password must have: [ Min 8 chars ,At least one upper case ,One lower case,One number and one special character ] ";
                    break;
            }

            if( inputId == "userPassword" ){
                $("#rePassword").val("");
                this.disableRePassInput();
            }

            this.setInputValidaty(inputElemnet,feedbackElement,false,"is-valid","is-invalid",msg);
        }

    }

    addInputValidationEvents(){
        $("#contactUsForm input").on("input",(event)=>{
            let element = event.target;
        
            if(element.id=="rePassword"){
                this.validatePasswordsEquality();
            }else{
                this.validateInput(element.id)
            }
            
            if(this.AllInputsAreValid()){
                // enable the submit button
                this.enableSubmitBtn()
            }

        })
    }

    validatePasswordsEquality(){
        let pass = $("#userPassword");
        let rePass = $("#rePassword");

        let passInputVal = pass.val();
        let rePassInputVal = rePass.val();

        let feedbackElement = rePass.next();

        if(passInputVal == rePassInputVal){
            this.setInputValidaty(rePass,feedbackElement,true,"is-invalid","is-valid",null);
        }else{
            this.setInputValidaty(rePass,feedbackElement,false,"is-valid","is-invalid","Password doesn't match");
        }

    }

    disableRePassInput(){
        $(`#rePassword`).prop( "disabled", true );
    }

    enableRePassInput(){
        $(`#rePassword`).prop( "disabled", false );
    }

    disableSubmitBtn(){
        $(`#submitBtn`).prop( "disabled", true );
    }

    enableSubmitBtn(){
        $(`#submitBtn`).prop( "disabled", false );
    }

    addSubmitBtnEvent(){
        $("#submitBtn").on("click",(event)=>
        {
            event.preventDefault();
            alert("Data Submitted Successfully!!");
            this.clearInputs();
            this.disableRePassInput();
            this.disableSubmitBtn();
        })
    }

}

export default ContactUs;