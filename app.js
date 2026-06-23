const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"

const dropdowns = document.querySelectorAll(".dropdown select");

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