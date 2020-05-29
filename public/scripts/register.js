document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registerBtn").disabled = true;
    document.getElementById("edit_firstname").focus();

});

const pass_match = document.getElementById("edit_pwd");
const pass = document.getElementById("edit_password");
const pattern = pass.getAttribute('pattern');
var reg_ex = new RegExp(pattern)

pass.onkeyup = function() {
    checkPassword();
}

pass_match.onkeyup = function() {
    checkPassword();
}

function checkPassword() {
    if (reg_ex.test(pass.value) && matchPassword()) {
        document.getElementById("registerBtn").disabled = false;
        document.getElementById("passwordOK").style.display = "block";
        document.getElementById("edit_password_label").style.color = "rgb(1, 190, 1)";
    }else{
        document.getElementById("registerBtn").disabled = true;
        document.getElementById("passwordOK").style.display = "none";
        document.getElementById("edit_password_label").removeAttribute("style");
    }
}

function registerUser(){
    if(allValid2()){
        console.log("yeah")
    }
}

function matchPassword() { 
    let password1 = document.getElementById("edit_pwd").value;
    let password2 = document.getElementById("edit_password").value;
    if (password1 == password2) {
        return true;
    } else {
        return false;
    }
} 
