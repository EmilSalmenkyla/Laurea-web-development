const taskOneHeading = document.querySelector("#taskOneHeading");
const animalText = document.querySelector("#animalText");

const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");

changeHeadingButton.addEventListener("click", () => {
    taskOneHeading.textContent = "Muokattu otsikko!";
});

changeStyleButton.addEventListener("click", () => {
    taskOneHeading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", () => {
    animalText.textContent =
        "Pingviinit ovat lentokyvyttömiä lintuja, jotka ovat sopeutuneet elämään vedessä.";
});

const animalContent = document.querySelector("#animalContent");

const hideAnimalButton = document.querySelector("#hideAnimalButton");
const showAnimalButton = document.querySelector("#showAnimalButton");

const dailyAnimalHeading = document.createElement("h3");
dailyAnimalHeading.textContent = "Päivän eläin";
dailyAnimalHeading.classList.add("animal-heading");

const dailyAnimalText = document.createElement("p");
dailyAnimalText.textContent =
    "Panda on mustavalkoinen karhulaji, joka syö pääasiassa bambua.";

const dailyAnimalImage = document.createElement("img");
dailyAnimalImage.src = "images/Panda.jpg";
dailyAnimalImage.alt = "Panda";
dailyAnimalImage.classList.add("daily-animal-image");

animalContent.append(
    dailyAnimalHeading,
    dailyAnimalText,
    dailyAnimalImage
);

hideAnimalButton.addEventListener("click", () => {
    animalContent.style.display = "none";
});

showAnimalButton.addEventListener("click", () => {
    animalContent.style.display = "block";
});

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

const animals = {
    elephant: {
        name: "Elefantti",
        image: "images/elefantti.jpg",
        alt: "Elefantti",
        description:
            "Elefantit ovat maailman suurimpia maaeläimiä."
    },

    tiger: {
        name: "Tiikeri",
        image: "images/Tiikeri.jpg",
        alt: "Tiikeri",
        description:
            "Tiikeri on suuri kissapeto, joka tunnetaan oranssista turkistaan ja mustista raidoistaan."
    },

    penguin: {
        name: "Pingviini",
        image: "images/pingviini.jpg",
        alt: "Pingviini",
        description:
            "Pingviini on lentokyvytön lintu, joka elää pääasiassa eteläisellä pallonpuoliskolla."
    },

    panda: {
        name: "Panda",
        image: "images/Panda.jpg",
        alt: "Panda",
        description:
            "Panda on mustavalkoinen karhulaji, joka tunnetaan bamburuokavaliostaan."
    }
};

animalSelect.addEventListener("change", () => {
    const selectedAnimal = animalSelect.value;
    const animal = animals[selectedAnimal];

    animalName.textContent = animal.name;
    animalImage.src = animal.image;
    animalImage.alt = animal.alt;
    animalDescription.textContent = animal.description;
});

animalImage.addEventListener("mouseenter", () => {
    animalImage.classList.add("image-highlight");
});

animalImage.addEventListener("mouseleave", () => {
    animalImage.classList.remove("image-highlight");
});

const animalForm = document.querySelector("#animalForm");
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");
const observationTableBody = document.querySelector("#observationTableBody");

animalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const animal = observationAnimal.value.trim();
    const location = observationLocation.value.trim();
    const date = observationDate.value;

    if (animal === "" || location === "" || date === "") {
        alert("Täytä kaikki kentät ennen havainnon lisäämistä.");
        return;
    }

    const tableRow = document.createElement("tr");

    const animalCell = document.createElement("td");
    animalCell.textContent = animal;

    const locationCell = document.createElement("td");
    locationCell.textContent = location;

    const dateCell = document.createElement("td");
    dateCell.textContent = new Date(date).toLocaleDateString("fi-FI");

    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Poista";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
        tableRow.remove();
    });

    actionCell.append(deleteButton);

    tableRow.append(
        animalCell,
        locationCell,
        dateCell,
        actionCell
    );

    observationTableBody.append(tableRow);

    animalForm.reset();
});

const existingDeleteButtons =
    document.querySelectorAll(".delete-button");

existingDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("tr").remove();
    });
});