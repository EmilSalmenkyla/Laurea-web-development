document.getElementById("btnClick").onclick = () => {
    alert("You clicked me!");
};

document.getElementById("btnTable").onclick = showTable;

function showTable() {
    const animals = [
        { animal: "Tiikeri", habitat: "Metsä", diet: "Liha" },
        { animal: "Norsu", habitat: "Savanni", diet: "Kasvit" },
        { animal: "Susi", habitat: "Metsä", diet: "Liha" }
    ];

    let html = `
        <table>
            <tr>
                <th>Eläin</th>
                <th>Elinympäristö</th>
                <th>Ruokavalio</th>
            </tr>
    `;

    animals.forEach(a => {
        html += `
            <tr>
                <td>${a.animal}</td>
                <td>${a.habitat}</td>
                <td>${a.diet}</td>
            </tr>
        `;
    });

    html += `</table>`;

    document.querySelector("#tableContainer").innerHTML = html;
}




document.querySelector("#h2-title").addEventListener("mouseover", () => {
    console.log("Stepped over me with a mouse!");
});

document.querySelector("#h1-title").addEventListener("click", () => {
    const h1 = document.querySelector("#h1-title");
    h1.style.color = "red";
    h1.innerHTML = "Bye bye mouse!";
});




const textarea = document.getElementById("feedback");
const charcount = document.getElementById("charcount");
const status = document.getElementById("status");
const preview = document.getElementById("preview");

textarea.addEventListener("focus", () => {
    status.textContent = "Kirjoita palautteesi...";
    textarea.style.background = "#eef";
});

textarea.addEventListener("blur", () => {
    status.textContent = "";
    textarea.style.background = "white";
});

textarea.addEventListener("input", () => {
    const length = textarea.value.length;
    charcount.textContent = `${length}/200`;
    preview.textContent = textarea.value;
});



document.getElementById("feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const text = textarea.value.trim();

    if (text.length < 10 || text.length > 200) {
        status.textContent = "Palaute pitää olla 10–200 merkkiä!";
        status.style.color = "red";
        return;
    }

    status.textContent = "Thank you for your feedback!";
    status.style.color = "green";

    textarea.value = "";
    charcount.textContent = "0/200";
    preview.textContent = "(Esikatselu tulee tähän)";
});




document.addEventListener("keydown", (event) => {
    console.log(event);

    document.getElementById("keybox").textContent = event.key;
    document.getElementById("keyinfo").textContent =
        `Key: ${event.key} | Code: ${event.code}`;
});
