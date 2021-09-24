let bear = {
    weight: 250,
    hunger: 200
}

let tents = [
    {
        name: "Green Tent",
        campers: [
            { name: "Joe", weight: 50},
            { name: "Barry", weight: 200}
        ]
    },
    {
        name: "Red Tent",
        campers: [
            { name: "Karen", weight: 120 },
            { name: "Becky", weight: 125 }
        ]
    }
]

function updateBearStats() {
    let bearWeightElement = document.getElementById("BearStatWeight");
    let bearHungerElement = document.getElementById("BearStatHunger");
    bearWeightElement.innerHTML = bear.weight.toString();
    bearHungerElement.innerHTML = bear.hunger.toString();
}

function populateTentDropdown() {
    let tentDropdownElement = document.getElementById("TentsDropdown");
    for (var i = 0; i < tents.length; i++) {
        var newTentOption = document.createElement("option");
        newTentOption.value = i;
        newTentOption.innerText = tents[i].name;
        tentDropdownElement.appendChild(newTentOption);
    }
}

function lookInsideSelectedTent() {
    let tentDropdownElement = document.getElementById("TentsDropdown");
    let selectedTentElement = document.getElementById("SelectedTent");
    let selectedTentTitleElement = document.getElementById("TentName");
    let selectedTentCamperListElement = document.getElementById("CamperList");

    if (tentDropdownElement.value === "none") {
        selectedTentElement.classList.add("hidden");
        return;
    }

    selectedTentCamperListElement.innerHTML = '';
    
    selectedTentElement.classList.remove("hidden");
    selectedTentTitleElement.innerText = tents[tentDropdownElement.value].name;
    
    for(var i = 0; i < tents[tentDropdownElement.value].campers.length; i++) {
        var newCamperElement = document.createElement("li");
        newCamperElement.classList.add("stat");
        newCamperElement.innerText = tents[tentDropdownElement.value].campers[i].name;
        selectedTentCamperListElement.appendChild(newCamperElement);
    }


    


    // If a tent is not selected, hide the tentDropdownElement
    // Otherwise, populate the selectedTentElement with data from the tent
}

function initialize() {
    updateBearStats();
    populateTentDropdown();
    document.getElementById("TentsDropdown").addEventListener("change", lookInsideSelectedTent);
}

initialize();
