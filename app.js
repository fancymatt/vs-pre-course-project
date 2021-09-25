let bear = {
    weight: 400,
    minWeight: 300,
    maxWeight: 1500
}

let tents = [
    {
        name: "Green Tent",
        campers: [
            { name: "Joe", weight: 50 },
            { name: "Barry", weight: 200 }
        ]
    },
    {
        name: "Red Tent",
        campers: [
            { name: "Karen", weight: 120 },
            { name: "Becky", weight: 125 }
        ]
    },
    {
        name: "Ratty Wizard Tent",
        campers: [
            { name: "Ron", weight: 130 },
            { name: "Harry", weight: 125 },
            { name: "Hermione", weight: 110 },
            { name: "Dobby", weight: 25 }
        ]
    },
    {
        name: "Camo Tent",
        campers: [
            { name: "Bob", weight: 260 },
            { name: "Brent", weight: 320 },
            { name: "Bucko", weight: 370 }
        ]
    },
]

let bearStatsElement = document.getElementById("BearStats");
let campgroundElement = document.getElementById("Campground");
let deathElement = document.getElementById("Death");

let bearWeightElement = document.getElementById("BearStatWeight");
let bearHungerElement = document.getElementById("BearStatHunger");
let tentDropdownElement = document.getElementById("TentsDropdown");
let selectedTentElement = document.getElementById("SelectedTent");
let selectedTentTitleElement = document.getElementById("TentName");
let selectedTentCamperListElement = document.getElementById("CamperList");
let eatCampersButton = document.getElementById("EatCampersButton");

var bearHasExploded = false;

function updateBearStats() {
    var bearHungerPercent = 1 - (bear.weight - bear.minWeight) / bear.maxWeight;

    if (bearHungerPercent < 0) {
        bearHasExploded = true;
    }

    if (bearHasExploded) {
        bearStatsElement.classList.add("hidden");
        campgroundElement.classList.add("hidden");
        deathElement.classList.remove("hidden");
    } else {
        bearWeightElement.innerHTML = bear.weight.toString() + " lbs";
        bearHungerElement.innerHTML = (bearHungerPercent * 100).toFixed(2) + "%";
    }
}

function populateTentDropdown() {
    for (var i = 0; i < tents.length; i++) {
        var newTentOption = document.createElement("option");
        newTentOption.value = i;
        newTentOption.innerText = tents[i].name;
        tentDropdownElement.appendChild(newTentOption);
    }
}

function lookInsideSelectedTent() {
    let selectedTent = tents[tentDropdownElement.value];

    if (tentDropdownElement.value === "none") {
        selectedTentElement.classList.add("hidden");
        return;
    }

    selectedTentCamperListElement.innerHTML = '';
    
    selectedTentElement.classList.remove("hidden");
    selectedTentTitleElement.innerText = selectedTent.name;
    
    if (selectedTent.campers == null) {
        var emptyCamperElement = document.createElement("li");
        emptyCamperElement.classList.add("stat");
        emptyCamperElement.innerText = "No one";
        selectedTentCamperListElement.appendChild(emptyCamperElement);
        eatCampersButton.disabled = true;
    } else {
        for(var i = 0; i < selectedTent.campers.length; i++) {
            var newCamperElement = document.createElement("li");
            newCamperElement.classList.add("stat");
            let camperString = selectedTent.campers[i].name + " (" + selectedTent.campers[i].weight + "lb)";

            newCamperElement.innerText = camperString;
            selectedTentCamperListElement.appendChild(newCamperElement);
        }
        eatCampersButton.disabled = false;
    }
}

function eatCampers() {
    let campersToBeEaten = tents[tentDropdownElement.value].campers;

    for (var i = 0; i < campersToBeEaten.length; i++) {
        bear.weight += campersToBeEaten[i].weight;
    }

    tents[tentDropdownElement.value].campers = null;

    updateBearStats();
    lookInsideSelectedTent();
}

function initialize() {
    updateBearStats();
    populateTentDropdown();
    tentDropdownElement.addEventListener("change", lookInsideSelectedTent);
    eatCampersButton.addEventListener("click", eatCampers);
}

initialize();
