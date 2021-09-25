let bear = {};
let tents = [];
var bearHasExploded = false;

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
let restartButton = document.getElementById("RestartButton");


function eatCampersForTent(tent) {
    for (var i = 0; i < tent.campers.length; i++) {
        bear.weight += tent.campers[i].weight;
    }
    tent.campers = null;
}

function updateBearStatsUI() {
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
        bearHungerElement.innerHTML = (bearHungerPercent * 100).toFixed(1) + "%";
    }
}

function updateTentUIForTent(tent) {
    selectedTentCamperListElement.innerHTML = '';
    selectedTentElement.classList.remove("hidden");
    selectedTentTitleElement.innerText = tent.name;
    
    if (tent.campers == null) {
        updateEmptyCampersUI();
    } else {
        updateCampersUIForTent(tent);
    }
}

function updateEmptyCampersUI() {
    var emptyCamperElement = document.createElement("li");
    emptyCamperElement.classList.add("stat");
    emptyCamperElement.innerText = "No one";
    selectedTentCamperListElement.appendChild(emptyCamperElement);
    eatCampersButton.disabled = true;
}

function updateCampersUIForTent(tent) {
    for(var i = 0; i < tent.campers.length; i++) {
        var newCamperElement = document.createElement("li");
        newCamperElement.classList.add("stat");
        let camperString = tent.campers[i].name + " (" + tent.campers[i].weight + "lb)";

        newCamperElement.innerText = camperString;
        selectedTentCamperListElement.appendChild(newCamperElement);
    }
    eatCampersButton.disabled = false;
}

function updateUnselectedTentUI() {
    selectedTentElement.classList.add("hidden");
}

function initializeTentDropdownUI() {
    for (var i = 0; i < tents.length; i++) {
        var newTentOption = document.createElement("option");
        newTentOption.value = i;
        newTentOption.innerText = tents[i].name;
        tentDropdownElement.appendChild(newTentOption);
    }
}

function initializeData() {
    bear = {
        weight: 400,
        minWeight: 300,
        maxWeight: 1500
    };

    bearHasExploded = false;

    let tent1 = {
        name: "Grey Tent",
        campers: [
            { name: "Joe", weight: 175 },
            { name: "Barry", weight: 190 }
        ]
    };

    let tent2 = {
        name: "Purple Tent",
        campers: [
            { name: "Karen", weight: 120 },
            { name: "Becky", weight: 125 }
        ]
    };

    let tent3 = {
        name: "Ratty Tent",
        campers: [
            { name: "Ron", weight: 130 },
            { name: "Harry", weight: 125 },
            { name: "Hermione", weight: 110 },
            { name: "Dobby", weight: 25 }
        ]
    };

    let tent4 = {
        name: "Camo Tent",
        campers: [
            { name: "Bob", weight: 260 },
            { name: "Brent", weight: 320 },
            { name: "Bucko", weight: 370 }
        ]
    };

    let tent5 = {
        name: "Stylish Tent",
        campers: [
            { name: "Bjorn", weight: 160 },
            { name: "Lola", weight: 140 }
        ]
    }

    tents = [];
    tents.push(tent1);
    tents.push(tent2);
    tents.push(tent3);
    tents.push(tent4);
    tents.push(tent5);
}

function initializeUI() {
    deathElement.classList.add("hidden");
    bearStatsElement.classList.remove("hidden");
    campgroundElement.classList.remove("hidden");
    tentDropdownElement.innerHTML = "";

    let emptyDropdownOption = document.createElement("option");
    emptyDropdownOption.value = "none";
    emptyDropdownOption.innerText = "Select a Tent...";
    tentDropdownElement.appendChild(emptyDropdownOption);
    tentDropdownElement.selected = tentDropdownElement;

    initializeTentDropdownUI();
    updateUnselectedTentUI();
    updateBearStatsUI();
}

function onTentDropdownChanged() {
    if (tentDropdownElement.value === "none") {
        updateUnselectedTentUI()
        return;
    }
    updateTentUIForTent(tents[tentDropdownElement.value]);
}

function onEatCampersButtonClicked() {
    let tentToEat = tents[tentDropdownElement.value];
    eatCampersForTent(tentToEat);
    updateBearStatsUI();
    updateTentUIForTent(tentToEat);
}

function onRestartButtonClicked() {
    initialize();
}

function initialize() {
    initializeData();
    initializeUI();
}

initialize();
tentDropdownElement.addEventListener("change", onTentDropdownChanged);
eatCampersButton.addEventListener("click", onEatCampersButtonClicked);
restartButton.addEventListener("click", onRestartButtonClicked);
