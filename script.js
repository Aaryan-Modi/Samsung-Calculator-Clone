const dispMainEl = document.querySelector(".dispMain");
const dispTempEl = document.querySelector(".dispTemp");
const numbersEl = document.querySelectorAll(".number");
const operatorsEl = document.querySelectorAll(".operator");
const equalEl = document.querySelector(".equal");
const clearEl = document.querySelector(".clear");
const backspaceEl = document.querySelector(".backspace");
const negativeEl = document.querySelector(".negative");
const bracketEl = document.querySelector(".bracket");

let dispExpression = ``;
let calcExpression = ``;
let tmpBracketExpression = ``;
let isDotAdded = false;
let operatorAllowed = false;
let isOperatorAdded = false;
let isOperatorAddedLast = false;
let iscalculating = false;
let isequalPressed = false;
let openBracketCount = 0;
let closeBracketCount = 0;





numbersEl.forEach((number) => {
    number.addEventListener("click", dispNumber);
});

operatorsEl.forEach((operator) => {
    operator.addEventListener("click", dispOperator);
});

equalEl.addEventListener("click", finalAns);

clearEl.addEventListener("click", clearDisp);

backspaceEl.addEventListener("click", clearLast);

bracketEl.addEventListener("click", addBracket);



function dispNumber(e) {

    if (isequalPressed) {
        clearDisp();
        dispMainEl.classList.remove("invisible");
        dispTempEl.classList.remove("animated");
        isequalPressed = false;
    }


    dispTempEl.style.visibility = 'visible';
    let valCurrentNumber = this.dataset.value;
    let dispCurrentNumber = this.innerHTML;
    if (dispCurrentNumber == "." && !isDotAdded) {
        isDotAdded = true;
    }
    else if (dispCurrentNumber == "." && isDotAdded) {
        console.log(dispCurrentNumber)
        return;
    }

    dispExpression += dispCurrentNumber;
    calcExpression += valCurrentNumber;
    tmpBracketExpression += valCurrentNumber;

    dispMainEl.innerHTML = dispExpression;

    if (isOperatorAdded)
        tempAns();

    operatorAllowed = true;
    isOperatorAddedLast = false;
    iscalculating = true;
}

function dispOperator() {
    if (!operatorAllowed)
        return;
    let valCurrentOperator = this.dataset.value;
    let dispCurrentOperator = this.innerHTML;

    if (!isOperatorAddedLast) {
        dispTempEl.style.visibility = 'hidden';
        dispExpression += dispCurrentOperator;
        calcExpression += valCurrentOperator;
        tmpBracketExpression += valCurrentOperator
        dispMainEl.innerHTML = dispExpression;
        isOperatorAddedLast = true;
        isDotAdded = false;
        iscalculating = false;
        isOperatorAdded = true;
    }
}


function addBracket(e) {

    let lastChar = tmpBracketExpression.slice(-1);
    console.log(e);
    if (e == ")") {
        dispExpression += ")";
        tmpBracketExpression += ")";
        closeBracketCount++;
        isOperatorAddedLast = false;

    }
    else if (e == "(") {
        dispExpression += "(";
        tmpBracketExpression = "(" + tmpBracketExpression;
        openBracketCount++;
        dispTempEl.style.visibility = 'hidden';

    }
    else if (/[+\-*/%]/.test(lastChar)) {
        dispExpression += "(";
        tmpBracketExpression = "(" + tmpBracketExpression;
        openBracketCount++;
        dispTempEl.style.visibility = 'hidden';
    }
    else if (openBracketCount > closeBracketCount) {
        dispExpression += ")";
        tmpBracketExpression += ")";
        closeBracketCount++;
        isOperatorAddedLast = false;
    }
    else {
        if (/[0-9)]/.test(lastChar)) {
            dispExpression += document.querySelector(".multiply").innerHTML;
            calcExpression += "*"
            tmpBracketExpression += "*"
        }
        dispExpression += "(";
        tmpBracketExpression = "(" + tmpBracketExpression;
        openBracketCount++;
        dispTempEl.style.visibility = 'hidden';
    }

    if (openBracketCount == closeBracketCount) {
        calcExpression = tmpBracketExpression;
    }
    dispMainEl.innerHTML = dispExpression;

}


function tempAns() {
    dispTempEl.innerHTML = eval(calcExpression);
}

function finalAns() {
    dispTempEl.innerHTML = eval(calcExpression);
    dispMainEl.classList.add("invisible");
    dispTempEl.classList.add("animated");

    isequalPressed = true;
}

function clearDisp() {
    dispMainEl.innerHTML = ``;
    dispTempEl.innerHTML = ``;
    dispExpression = ``;
    calcExpression = ``;
    isDotAdded = false;
    operatorAllowed = false;
    isOperatorAdded = false;
    isOperatorAddedLast = false;
    iscalculating = false;
    isequalPressed = false;
    openBracketCount = 0;
    closeBracketCount = 0;
}

function clearLast() {

    // let lastChar = 

    dispMainEl.innerHTML = dispMainEl.innerHTML.slice(0, -1);
    dispExpression = dispExpression.slice(0, -1);
    calcExpression = calcExpression.slice(0, -1);
    tmpBracketExpression = tmpBracketExpression.slice(0, -1);

    tempAns();
    // Some edit require
}



// Keyboard Events


window.addEventListener("keydown", function (e) {
    const key = e.key;

    if (/\d/.test(key) || key == ".") {
        let el = document.querySelector(`[data-value="${key}"]`);
        dispNumber.call(el);
    }
    else if (/[+\-*/%]/.test(key)) {
        let el = document.querySelector(`[data-value="${key}"]`);
        dispOperator.call(el);
    }
    else if (key == "(" || key == ")") {
        addBracket(key);
    }
    else if (key == "=" || key == "Enter") {
        let el = document.querySelector(`[data-value="${key}"]`);
        finalAns.call(el);
    }
    else if (key == "Backspace") {
        clearLast();
    }
    else if (key == 'c' || key == "C" || key == "Escape") {
        clearDisp();
    }

})



