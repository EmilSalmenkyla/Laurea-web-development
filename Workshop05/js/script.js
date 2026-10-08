const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    speciesError.textContent = "";
    noteError.textContent = "";
    formResult.textContent = "";

    animalName.classList.remove("invalid");
    animalSpecies.classList.remove("invalid");
    careNote.classList.remove("invalid");

    const nameValue = animalName.value.trim();
    const speciesValue = animalSpecies.value.trim();
    const noteValue = careNote.value.trim();

    let isValid = true;

    if (nameValue === "") {
        nameError.textContent = "Eläimen nimi ei voi olla tyhjä.";
        animalName.classList.add("invalid");
        isValid = false;
    }

    if (speciesValue === "") {
        speciesError.textContent = "Laji ei voi olla tyhjä.";
        animalSpecies.classList.add("invalid");
        isValid = false;
    }

    if (noteValue === "") {
        noteError.textContent = "Hoitomuistio ei voi olla tyhjä.";
        careNote.classList.add("invalid");
        isValid = false;
    } else if (careNote.value.length > 150) {
        noteError.textContent = "Hoitomuistion pituus saa olla enintään 150 merkkiä.";
        careNote.classList.add("invalid");
        isValid = false;
    }

    if (isValid) {
        formResult.textContent = `Lisätty: ${nameValue} / ${speciesValue} / ${noteValue}`;

        const animalData = {
            name: nameValue,
            species: speciesValue,
            note: noteValue
        };

        localStorage.setItem("ws05Animal", JSON.stringify(animalData));

        sessionStorage.setItem("ws05SessionAnimal", JSON.stringify(animalData));

        saveToBonusList(animalData);

        loadAnimal();
        animalForm.reset();
    }
});

const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const annualFee = Number(animalType.value);
    const years = Number(yearsInput.value);

    if (isNaN(years) || years < 1 || !Number.isInteger(years)) {
        cost.textContent = "Syötä kelvollinen kokonaisvuosimäärä (vähintään 1).";
        discountMessage.textContent = "";
        return;
    }

    let totalCost = annualFee * years;
    let appliedDiscountText = "Ei alennusta.";

    if (years >= 5) {
        totalCost = (totalCost * 0.8) - 5;
        appliedDiscountText = "Sovellettu 20 % alennus ja 5 € lisäalennus!";
    } else if (years > 2) {
        totalCost = totalCost * 0.8;
        appliedDiscountText = "Sovellettu 20 % alennus!";
    }

    cost.textContent = `Yhteensä: ${totalCost.toFixed(2)} €`;
    discountMessage.textContent = appliedDiscountText;
});

const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {
   
    const rawData = localStorage.getItem("ws05Animal");

    if (rawData === null) {
        savedAnimal.textContent = "Ei vielä tallennettua eläintä.";
    } else {
        try {
            const animal = JSON.parse(rawData);
            savedAnimal.textContent = `Tallennettu eläin (localStorage): ${animal.name} (${animal.species}) - ${animal.note}`;
        } catch (e) {
            savedAnimal.textContent = "Virhe ladattaessa tallennettua tietoa.";
        }
    }
    renderBonusList();
}

loadButton.addEventListener("click", loadAnimal);

clearButton.addEventListener("click", function () {
    localStorage.removeItem("ws05Animal");
    savedAnimal.textContent = "Tallennettu eläin poistettu.";
});
function saveToBonusList(newAnimal) {
    const rawList = localStorage.getItem("ws05AnimalList");
    const list = rawList ? JSON.parse(rawList) : [];
    list.push(newAnimal);
    localStorage.setItem("ws05AnimalList", JSON.stringify(list));
}

function renderBonusList() {
    const rawList = localStorage.getItem("ws05AnimalList");
    const list = rawList ? JSON.parse(rawList) : [];

    // Luodaan tai etsitään bonusnäkymän säiliö
    let bonusContainer = document.getElementById("bonusAnimalList");
    if (!bonusContainer) {
        bonusContainer = document.createElement("div");
        bonusContainer.id = "bonusAnimalList";
        bonusContainer.style.marginTop = "15px";
        savedAnimal.after(bonusContainer);
    }

    bonusContainer.innerHTML = "<h3>Bonus: Kaikki tallennetut eläimet (Lista)</h3>";

    if (list.length === 0) {
        bonusContainer.innerHTML += "<p>Ei eläimiä listalla.</p>";
        return;
    }

    const ul = document.createElement("ul");
    list.forEach((animal, index) => {
        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.textContent = `${animal.name} (${animal.species}) - ${animal.note} `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Poista tämä";
        deleteBtn.type = "button";
        deleteBtn.style.marginLeft = "10px";
        
        deleteBtn.addEventListener("click", function () {
            list.splice(index, 1);
            localStorage.setItem("ws05AnimalList", JSON.stringify(list));
            renderBonusList();
        });

        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });

    bonusContainer.appendChild(ul);
}

loadAnimal();