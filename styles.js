// Personal info page
form = document.getElementById("personal-details") 

function initialSetup(){
    sessionStorage.setItem('planDuration', 0) =
    sessionStorage.setItem('planType', 0)
    sessionStorage.setItem('name', undefined) 
    sessionStorage.setItem('email', undefined) 
    sessionStorage.setItem('phone', undefined)
    sessionStorage.setItem('addon1', 0) 
    sessionStorage.setItem('addon2', 0) 
    sessionStorage.setItem('addon3', 0) 
    sessionStorage.setItem('addOnSelected', [0,0,0])
}

function validate(){     //checks if none of the fields is empty
    validDetails = [0,0,0]; //[name, email, phone]
    if (form[0].value == '') {
        validDetails[0] = 0;
        document.querySelectorAll("form input")[0].style.border = "1.5px solid rgb(211, 4, 4)"
        document.querySelectorAll("form div span")[0].style.visibility = "visible" 
    } 
    else {
        validDetails[0] = 1;
        document.querySelectorAll("form input")[0].style.border = "1px solid hsl(229, 24%, 87%)"
        document.querySelectorAll("form div span")[0].style.visibility = "hidden" 
    }
    if (form[1].value == '') {
        validDetails[1] = 0;
        document.querySelectorAll("form input")[1].style.border = "1.5px solid rgb(211, 4, 4)"
        document.querySelectorAll("form div span")[1].style.visibility = "visible"  
    }     
    else {
        validDetails[1] = 1;
        document.querySelectorAll("form input")[1].style.border = "1px solid hsl(229, 24%, 87%)"
        document.querySelectorAll("form div span")[1].style.visibility = "hidden" 
    }
    if (form[2].value == ''){
        validDetails[2] = 0;
        document.querySelectorAll("form input")[2].style.border = "1.5px solid rgb(211, 4, 4)"
        document.querySelectorAll("form div span")[2].style.visibility = "visible" 
    }      
    else {
        validDetails[2] = 1;
        document.querySelectorAll("form input")[2].style.border = "1px solid hsl(229, 24%, 87%)"
        document.querySelectorAll("form div span")[2].style.visibility = "hidden" }
    var valid = 1;
    for (i in validDetails){
        if (validDetails[i] != 1){
            valid=0;
            break;
        }
    }
    if (valid){
        sessionStorage.setItem('name', form[0].value);
        sessionStorage.setItem('email', form[1].value);
        sessionStorage.setItem('phone', form[2].value);
    }
}

// switching plans to monthly/yearly

checkbox  = document.getElementById("duration-checkbox")
arcade = ["$9/mo", '$90/yr<br><span style="color:hsl(213, 96%, 18%); font-size:14px;">2 months free</span>']
advanced = ["$12/mo", "$120/yr<br><span style='color:hsl(213, 96%, 18%); font-size:14px;'>2 months free</span>"]
pro = ["$15/mo", "$150/yr<br><span style='color:hsl(213, 96%, 18%); font-size:14px;'>2 months free</span>"]

function changePlan(){  // 0: monthly, 1: yearly
    planDuration = sessionStorage.getItem('planDuration');
    if(planDuration==0) {
        document.getElementById("plan-duration-1").innerHTML = "Monthly";
        document.getElementById("plan-duration-2").innerHTML = "month";
    } else {
        document.getElementById("plan-duration-1").innerHTML = "Yearly";
        document.getElementById("plan-duration-2").innerHTML = "year";
    }  
} 

function switchDuration(){
    if (checkbox.checked) {
        sessionStorage.setItem('planDuration', 1); //yearly
        document.querySelectorAll(".plan-grid .plan-prices")[0].innerHTML = arcade[1]
        document.querySelectorAll(".plan-grid .plan-prices")[1].innerHTML = advanced[1]
        document.querySelectorAll(".plan-grid .plan-prices")[2].innerHTML = pro[1]
        document.querySelectorAll("#duration-section p")[0].style.color = "hsl(231, 11%, 63%)"
        document.querySelectorAll("#duration-section p")[1].style.color = "hsl(213, 96%, 18%)"
    } else {
        sessionStorage.setItem('planDuration', 0); //monthly
        document.querySelectorAll(".plan-grid .plan-prices")[0].innerHTML = arcade[0]
        document.querySelectorAll(".plan-grid .plan-prices")[1].innerHTML = advanced[0]
        document.querySelectorAll(".plan-grid .plan-prices")[2].innerHTML = pro[0]
        document.querySelectorAll("#duration-section p")[0].style.color = "hsl(213, 96%, 18%)"
        document.querySelectorAll("#duration-section p")[1].style.color = "hsl(231, 11%, 63%)"
    }
}

// radio button selection

var planType = 0;
function selectPlan(plan){
    planList = document.querySelectorAll(" .plan-grid label")
    planType = plan;
    for(var i=0;i<3;i++){
        document.querySelectorAll(" .plan-grid label")[i].classList.remove("plan-selected")
    }   planList[plan].classList.add("plan-selected")
}

function planSelected(){
    sessionStorage.setItem('planType', planType);
}


// add-on selection

function selectAddon(){
    var addOnSelected = [0,0,0];
    addonList = document.querySelectorAll(".addon-grid div")
    addons = document.querySelectorAll(".addon-grid input[type='checkbox']")
    if(addons[0].checked){
        addOnSelected[0] = 1;
        addonList[0].classList.add("addon-selected")
    }
    else {
        addOnSelected[0] = 0;
        addonList[0].classList.remove("addon-selected")
    }
    if(addons[1].checked) {
        addOnSelected[1] = 1;
        addonList[1].classList.add("addon-selected")
    }
    else {
        addOnSelected[1] = 0;
        addonList[1].classList.remove("addon-selected")
    }
    if(addons[2].checked) {
        addOnSelected[2] = 1;
        addonList[2].classList.add("addon-selected")
    }
    else {
        addOnSelected[2] = 0;
        addonList[2].classList.remove("addon-selected")
    }
    sessionStorage.setItem('addOnSelected', addOnSelected);
}

function addOnSubmit(){
    for (i in addOnSelected){
        if(addOnSelected[i]){
            sessionStorage.setItem('addOn'+i, 1);
        }
        else {
            sessionStorage.setItem('addOn'+i, 0);
        }
    }
}

//FINAL SUBSCRIPTION COST

planPrices = [[9, 90], [12, 120], [15, 150]];  // planPricing[planType][planDuration]
addOnPrices = [[1,10], [2, 20], [2, 20]];       // addonPrices[planType][planDuration]



//showing prices on the final page
var plans = ['Arcade', 'Advanced', 'Pro'];
document.getElementById('plan-type').innerHTML = plans[sessionStorage.getItem('planType')]
document.getElementById('plan-amount').innerHTML = planPrices[sessionStorage.getItem('planType')][sessionStorage.getItem('planDuration')]
document.getElementById('os-amount').innerHTML = addOnPrices[0][sessionStorage.getItem('planDuration')]
document.getElementById('ls-amount').innerHTML = addOnPrices[1][sessionStorage.getItem('planDuration')]
document.getElementById('cp-amount').innerHTML = addOnPrices[2][sessionStorage.getItem('planDuration')]

//showing charge repetition on final page
x = ['mo', 'yr']
y = ['month', 'year']
for (i in document.querySelectorAll(".periodic-price")){
    document.querySelectorAll(".periodic-price")[i].innerHTML = x[sessionStorage.getItem('planDuration')];
}

// calculating and showing total price on final page
var totalAmount = planPrices[sessionStorage.getItem('planType')][sessionStorage.getItem('planDuration')];

// showing only selected addons 
var addOnSelected = sessionStorage.getItem('addOnSelected').split(",")
for (var i=0;i<3;i++){
    if (addOnSelected[i]==1){
        totalAmount += addOnPrices[i][sessionStorage.getItem('planDuration')]
        document.querySelectorAll('.final-prices')[i+1].style.display = ''
    } else {
        document.querySelectorAll('.final-prices')[i+1].style.display = 'none'
    }
}

document.getElementById('total-amount').innerHTML = totalAmount;

changePlan();