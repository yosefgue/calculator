const selectnumbers = document.querySelectorAll(".number");
const selectoperators = document.querySelectorAll(".operator");
const selectequal = document.querySelector(".equal");
const selectdelete = document.querySelector(".delete");
const selecth3 = document.querySelector(".result");
const selecth6 = document.querySelector(".holder");
let singlenumberlist = [];
let combinednumberlist = [];
let operatorlist = [];
let finalresult;
let operatorcheck; // this will prevent operators to be typed many times.
let numbertyped;
let operatortyped;
let combinednumber;

// function to calculate the result from the lists
function calculateresult(operatorlist, combinednumberlist) {
    let operatorcharacter;
    let operationresult;
    for (let i = 0; i < operatorlist.length;) {
        operatorcharacter = operatorlist[i];
        switch (operatorcharacter) {
            case "*":
                operationresult = combinednumberlist[i] * combinednumberlist[i+1];
                combinednumberlist.splice(i, 2, operationresult);
                operatorlist.splice(i, 1);
                break;
            case "/":
                operationresult = combinednumberlist[i] / combinednumberlist[i+1];
                combinednumberlist.splice(i, 2, operationresult);
                operatorlist.splice(i, 1);
                break;
            default:
                ++i;
        }
    }
    for (let i = 0; i < operatorlist.length;) {
        operatorcharacter = operatorlist[i];
        switch (operatorcharacter) {
            case "+":
                operationresult = combinednumberlist[i] + combinednumberlist[i+1];
                combinednumberlist.splice(i, 2, operationresult);
                operatorlist.splice(i, 1);
                break;
            case "-":
                operationresult = combinednumberlist[i] - combinednumberlist[i+1];
                combinednumberlist.splice(i, 2, operationresult)
                operatorlist.splice(i, 1);
                break;
            default:
                ++i;
        }
    }
    return combinednumberlist[0];
}
// function to push numbers typed into a list
function pushoperatortolist(operatorlist, operatortyped) {
    switch (operatortyped) {
        case "plus":
            operatorlist.push('+');
            return;
        case "minus":
            operatorlist.push('-');
            return;
        case "divide":
            operatorlist.push('/');
            return;
        case "multiply":
            operatorlist.push('*');
            return;
    }
}

function resetlists(list1, list2, list3) {
    list1.length = 0;
    list2.length = 0;
    list3.length = 0
}

selectnumbers.forEach(number => {
    number.addEventListener("click", (e) => {
        operatorcheck = 0;
        numbertyped = e.target.textContent;
        singlenumberlist.push(numbertyped);
        // update UI
        if (selecth3.textContent === "0") {
            selecth3.textContent = String(numbertyped);
        }
        else {
            selecth3.textContent += numbertyped;
        }
    })
})

selectoperators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        operatortyped = e.target.id;
        if (operatorcheck === 0) {
            combinednumber = Number(singlenumberlist.join(''));
            combinednumberlist.push(combinednumber);
            pushoperatortolist(operatorlist, operatortyped);
            operatorcheck = 1;
            singlenumberlist.length = 0;
            //update UI
            let operatortypedtext = e.target.textContent;
            selecth3.textContent += " " + operatortypedtext + " ";
        }
        else if (operatorcheck === 2) {
            pushoperatortolist(operatorlist, operatortyped)
            operatorcheck = 1;
            // update UI
            let operatortypedtext = e.target.textContent;
            selecth3.textContent += " " + operatortypedtext + " ";
        }
        else {
            //do nothing if double operator is typed
        }
    })
})

selectequal.addEventListener("click", () => {
    if (operatorcheck === 0) {
        combinednumber = Number(singlenumberlist.join(''));
        combinednumberlist.push(combinednumber);
        finalresult = calculateresult(operatorlist, combinednumberlist);
        singlenumberlist.length = 0;
        operatorcheck = 2;
        //update UI
        selecth6.textContent = selecth3.textContent + " " + "=";
        selecth3.textContent = String(finalresult);
    }
    else {
        // do nothing if operator typed many times
    }
})

selectdelete.addEventListener("click", () => {
    resetlists(singlenumberlist, combinednumberlist, operatorlist);
    selecth3.textContent = "0";
    selecth6.textContent = "";
    operatorcheck = 0;
})

document.querySelector(".checkbox").addEventListener("change",togglelightmode)

function togglelightmode() {
    const htmlbody = document.querySelector("html");
    const lightnumber = document.querySelectorAll("button");
    const lightequal = document.querySelector(".equal");
    const lightdelete = document.querySelector(".delete");
    const lighth3 = document.querySelector(".result");
    const lightholder = document.querySelector(".holder");
    const lightborder = document.querySelector(".container");

    htmlbody.classList.toggle("light-mode");
    lighth3.classList.toggle("light-result");
    lightholder.classList.toggle("light-holder");
    lightequal.classList.toggle("light-equal");
    lightdelete.classList.toggle("light-delete");
    lightborder.classList.toggle("light-border");
    lightnumber.forEach( btn => {
        btn.classList.toggle("light-number")
    })
    selectoperators.forEach(btn => {
        btn.classList.toggle("light-operator")
    })
}
