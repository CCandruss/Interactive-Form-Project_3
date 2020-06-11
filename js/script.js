
const title = document.getElementById("title");
const colorBox = document.getElementById("color");
const colorOption = document.querySelectorAll("#color option");
const design = document.getElementById("design");
const activities = document.querySelector(".activities");
const checkboxes = document.querySelectorAll(".activities input");
const inTotal = document.querySelector("#totalCost");
const payment = document.getElementById("payment");
const submitButton = document.getElementById("submit");
const otherRole = document.getElementById("other-title");
let totalChecked = 0;
let totalCost = 0;
//
function nameFieldFocus() {
        nameField.focus();
    }
window.onload = function hideRoleBox() {
    const otherRole = document.getElementById("other-title");
    otherRole.style.display= "none";
}

function jobRoleInfo(show){
    const titleBox = document.getElementById("other-title");
    if(show){
        titleBox.style.display = "inherit";
    } else{
        titleBox.style.display = "none"; 
    }
}

function themeSelected(theme){
    for(let i = 0; i < colorBox.length; i+=1){
        let values = colorOption[i].index;
        if(theme == "js puns"){
            colorBox.value = "";
            for(let i = 0; i < colorBox.length; i+=1){
            if(i >= 2 && i  < 5 ){
            colorOption[i].style.display = "inherit";
            } else {
            colorOption[i].style.display = "none";
            }
        }
        } else if (theme == "heart js"){
            colorBox.value = "";
            for(let i = 0; i < colorBox.length; i+=1){
                if(i >= 5 && i  <=7 ){
                colorOption[i].style.display = "inherit";
                } else  {
                colorOption[i].style.display = "none";
                } 
            }
        } else {
            colorBox.value = "select-theme";
            colorOption[i].style.display = "none";
            colorOption[0].style.display = "inherit";
        }
}
}

function paymentOptions(option) {
    const ccDIV = document.getElementById("credit-card");
    const ppDIV = document.getElementById("paypal");
    const bitcoinDIV =document.getElementById("bitcoin");
    if(option == "credit card"){
        ccDIV.style.display = "inherit";
        ppDIV.style.display = "none";
        bitcoinDIV.style.display = "none";
    } else if (option == "paypal"){
        ccDIV.style.display = "none";
        ppDIV.style.display = "inherit";
        bitcoinDIV.style.display = "none";
    } else if (option == "bitcoin"){
        ccDIV.style.display = "none";
        ppDIV.style.display = "none";
        bitcoinDIV.style.display = "inherit";
    }
}



activities.addEventListener("click", e => {
    totalCost = 0;
    const selectedActivity = e.target;
    const selectedActivityTime = e.target.getAttribute("data-day-and-time");
    for(let i = 0; i < checkboxes.length; i++){
        const time = checkboxes[i].getAttribute("data-day-and-time");
        if(selectedActivityTime == time && selectedActivity !== checkboxes[i] ){
            if(selectedActivity.checked){
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }    
        }
    }
    inTotal.innerHTML = ``;
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            const price = parseInt(checkboxes[i].getAttribute("data-cost"));
            totalCost = totalCost += price;
            inTotal.innerHTML = `Total Cost: $${totalCost}.`; 
        }
    }
    if(lastCallCheckboxes() === true){
        cBoxSpan.style.display = "none";
}
});

function fixErrors(error,fix,area) {
    if(valid){
        fix.style.display = "inherit";
        area.style.border = "solid #ff0000";
    } else {
        fix.style.display = "none";
    }
}

function createListener(validator){
    return e => {
        const input = e.target.value;
        const inputArea = e.target;
        const valid = validator(text);
        const inputError = text !== "" && !valid;
        const showFix = e.target.nextElementSibling;
        fixErrors(inputError,showFix,inputArea);
    }
}

function lastCallCheckboxes(){
    totalChecked = 0;
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            totalChecked+=1;
        } 
            if(totalChecked > 0 ){
            return true; 
            } else {
            return false;
            }
    }
}

title.addEventListener("click", e => {
    const text = e.target.value;
    const textValue = text == "other";
    jobRoleInfo(textValue);
});

design.addEventListener("click", e => {
    const theme = e.target.value;
    themeSelected(theme);
});

payment.addEventListener("click", e =>{
    const payType = e.target.value;
    paymentOptions(payType);
});

themeSelected();
paymentOptions("credit card");
