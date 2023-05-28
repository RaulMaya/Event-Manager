// Validation functions

function validateEmail(email) {
    // A simple regex for email validation
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    // Ensure the password is at least 6 characters long
    return password.length >= 6;
}

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
    var username = form_login.querySelector("input[name='username']").value;
    var password = form_login.querySelector("input[name='password']").value;

    const user = {
        username: username,
        password: password
    };
        
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    fetch('/login', options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Redirect to dashboard or do something else...
        });
    // ... existing code ...
}

// ... your existing code ...

function signUp(){
    var fullname = form_register.querySelector("input[name='fullName']").value;
    var email = form_register.querySelector("input[name='email']").value;
    var username = form_register.querySelector("input[name='username']").value;
    var password = form_register.querySelector("input[name='password']").value;

    if (!validateEmail(email)) {
        alert("Invalid email!");
        return;
    }

    if (!validatePassword(password)) {
        alert("Invalid password! It must be at least 6 characters long.");
        return;
    }

    const user = {
        fullname: fullname,
        email: email,
        username: username,
        password: password,
    };
        
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    fetch('/register', options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Redirect to login or do something else...
        });

    // This code should be inside the signUp function
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
