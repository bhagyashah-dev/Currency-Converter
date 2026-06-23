const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

window.addEventListener("load", () =>{
    updateExchRate();
})

for (let select of dropdowns){
    for (currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(select.name=="from" && currCode=="USD"){
            newOpt.selected = "selected";
        } else if(select.name=="to" && currCode=="INR"){
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener ("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (targetel) => {
    let currCode = targetel.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = targetel.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchRate();
})

const updateExchRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerText =
        `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};