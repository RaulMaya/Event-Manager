// Assigning event handlers
document.getElementById("btn__sign-in").addEventListener("click", signIn);
document.getElementById("btn__sign-up").addEventListener("click", signUp);
window.addEventListener("resize", widthPage);

// Variable declarations
var form_login = document.querySelector(".form__login");
var form_register = document.querySelector(".form__register");
var container_login_register = document.querySelector(".container__login-register");
var box_back_login = document.querySelector(".box__back-login");
var box_back_register = document.querySelector(".box__back-register");

// Functions

function widthPage(){
    if (window.innerWidth > 850){
        box_back_register.style.display = "block";
        box_back_login.style.display = "block";
    }else{
        box_back_register.style.display = "block";
        box_back_register.style.opacity = "1";
        box_back_login.style.display = "none";
        form_login.style.display = "block";
        container_login_register.style.left = "0px";
        form_register.style.display = "none";   
    }
}

widthPage();

function signIn(){
    if (window.innerWidth > 850){
        form_login.style.display = "block";
        container_login_register.style.left = "10px";
        form_register.style.display = "none";
        box_back_register.style.opacity = "1";
        box_back_login.style.opacity = "0";
    }else{
        form_login.style.display = "block";
        container_login_register.style.left = "0px";
        form_register.style.display = "none";
        box_back_register.style.display = "block";
        box_back_login.style.display = "none";
    }
}

function signUp(){
    if (window.innerWidth > 850){
        form_register.style.display = "block";
        container_login_register.style.left = "410px";
        form_login.style.display = "none";
        box_back_register.style.opacity = "0";
        box_back_login.style.opacity = "1";
    }else{
        form_register.style.display = "block";
        container_login_register.style.left = "0px";
        form_login.style.display = "none";
        box_back_register.style.display = "none";
        box_back_login.style.display = "block";
        box_back_login.style.opacity = "1";
    }
}
