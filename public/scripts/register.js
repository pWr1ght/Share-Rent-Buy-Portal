document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registerBtn").disabled = true;
    /*
    document.getElementById("registerBtn").addEventListener("click", ()=>{
        event.preventDefault();
    });*/
    document.getElementById("edit_firstname").focus();
});

const pass = document.getElementById("edit_password");
const pattern = pass.getAttribute('pattern');
var reg_ex = new RegExp(pattern)

pass.onkeyup = function() {
    if (reg_ex.test(pass.value)) {
        document.getElementById("registerBtn").disabled = false;
        document.getElementById("passwordOK").style.display = "block";
    }else{
        document.getElementById("registerBtn").disabled = true;
        document.getElementById("passwordOK").style.display = "none";
    }
}

function registerUser(){
    if(allValid2()){
        console.log("yeah")
    }
}
