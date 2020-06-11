const form = document.getElementById("form");
const nameField = document.getElementById("name");
const nameSpan = nameField.nextElementSibling;
const email = document.getElementById("mail");
const ccNumber = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const emailSpan = email.nextElementSibling;
const ccSpan = ccNumber.nextElementSibling;
const zipSpan = zip.nextElementSibling;
const cvvSpan = cvv.nextElementSibling;
const cBoxSpan = document.getElementById("cBox")
let formField = 0;

function isValidName(names) {
    return /^[A-Z a-z]+\s?[A-z a-z]?$/.test(names);
}
function isValidEmail(email){
    return/^[^@]+@[^@]+\.([a-z]{3})+$/.test(email);
}
function isValidCardNumber(card){
    return /^\d?\d?\d?(\d{13})$/.test(card);
}
function isValidZipCode(zip){
     return /^(\d{5})$/.test(zip);
}

function isValidCVV(cvv){
    return /^(\d{3})$/.test(cvv);
}

function fixErrors(valid,fix,area) {
    if(valid){
        fix.style.display = "inherit";
    } else {
        fix.style.display = "none";
    }
}

function createListener(validator){
    return e => {
        const input = e.target.value;
        const inputArea = e.target;
        const valid = validator(input);
        const inputError = input !== "" && !valid;
        const showFix = e.target.nextElementSibling;
        fixErrors(inputError,showFix,inputArea);
    }
}

nameField.addEventListener("input", createListener(isValidName));
email.addEventListener("input", createListener(isValidEmail));
ccNumber.addEventListener("input", createListener(isValidCardNumber));
zip.addEventListener("input", createListener(isValidZipCode));
cvv.addEventListener("input", createListener(isValidCVV));
form.addEventListener("submit", e =>{
    e.preventDefault();
    let validName = nameField.value;
    let validEmail = email.value;
    let validCC = ccNumber.value;
    let validZip = zip.value;
    let validCVV = cvv.value;
    if(isValidName(validName) && isValidEmail(validEmail) && isValidCardNumber(validCC) && isValidZipCode(validZip) && isValidCVV(validCVV)
     && lastCallCheckboxes()){
        form.submit();
    }else if(isValidName(validName) && isValidEmail(validEmail) && payment.value == "paypal" && lastCallCheckboxes()){
        form.submit();
    }else if(isValidName(validName) && isValidEmail(validEmail) && payment.value == "bitcoin" && lastCallCheckboxes()){
        form.submit();
    }else{
        if(isValidName(validName) !== true || validName === ""){
            nameSpan.style.display = "inherit";
        }
        if(isValidEmail(validEmail) !== true || validEmail === ""){
            emailSpan.style.display = "inherit";
        }
        if(isValidCardNumber(validCC) !== true || validCC === ""){
            ccSpan.style.display = "inherit";
        }
         if(isValidZipCode(validZip) !== true || validZip === ""){
            zipSpan.style.display = "inherit";
        }
         if(isValidCVV(validCVV) !== true || validCVV === ""){
            cvvSpan.style.display = "inherit";
        }
         if(lastCallCheckboxes() === false){
            cBoxSpan.style.display = "inherit";
        }
    }
});