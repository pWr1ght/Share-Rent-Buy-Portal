document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").disabled = true;
    document.getElementById("fname").focus();
});

const pass = document.getElementById("password");
const pattern = pass.getAttribute('pattern');
var reg_ex = new RegExp(pattern)

pass.onkeyup = function() {
    if (reg_ex.test(pass.value)) {
        document.getElementById("btn").disabled = false;
    }
}