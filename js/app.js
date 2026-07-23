const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTjy05dcmn89NXUAgTPfPbAhNYdAdMvqHfjVwtckK-g2j-zcrxf4pO6LVpcsNyqW0nt83hzXO2mMQ-d/pub?output=csv";

let schools = [];
let activeCircuit = "Todos";
let searchText = "";
/* =========================
   LOAD DATA
========================= */
function loadSchools() {

    return new Promise((resolve, reject) => {

        Papa.parse(CSV_URL, {

            download: true,
            header: true,
            skipEmptyLines: true,

            complete: function (results) {

                schools = results.data;

schools = results.data;

console.log(schools[0]);
console.log(schools[0].Codigo);
console.log(Object.keys(schools[0]));

resolve();

            },

            error: function (error) {
                reject(error);
            }

        });

    });

}

/* =========================
   CARD TEMPLATE
========================= */
function createSchoolCard(school) {

return `
    <div class="school-card">

        <h2>${school.Nombre}</h2>

        <p>🆔 <strong>Código:</strong> ${school.Codigo}</p>

        <p>📍 <strong>Circuito:</strong> ${school.Circuito}</p>

        <p>🏫 <strong>Categoría:</strong> ${school.Categoria}</p>

        <p>
            📞
            <a href="tel:${school.Telefono}">
                ${school.Telefono}
            </a>
        </p>

        <p>✉️ ${school.Correo}</p>

        <p>👤 ${school.Director}</p>

    </div>
`;
}

/* =========================
   DISPLAY LIST
========================= */
function displaySchools(list) {

    const results = document.getElementById("results");
    const counter = document.getElementById("resultsCounter");

    if (!list || list.length === 0) {

        results.innerHTML = `
            <div style="text-align:center; margin-top:30px;">
                <h3>No se encontraron resultados</h3>
            </div>
        `;

        counter.textContent = "0 resultados encontrados";
        return;
    }

    let html = "";

    list.forEach(school => {
        html += createSchoolCard(school);
    });

    results.innerHTML = html;

    if (list.length === 1) {
        counter.textContent = "1 resultado encontrado";
    } else {
        counter.textContent = `${list.length} resultados encontrados`;
    }
}
function updateActiveButton(selectedCircuit) {

    const buttons = document.querySelectorAll(".circuit-btn");

    buttons.forEach(button => {

        if (button.dataset.circuit === selectedCircuit) {
            button.classList.add("active");
        }
        else {
            button.classList.remove("active");
        }

    });

}
/* =========================
   SEARCH
========================= */
function searchSchools(query) {

    searchText = query.toLowerCase().trim();

    applyFilters();

}

/* =========================
   APPLY FILTERS
========================= */
function applyFilters() {

    let filtered = schools;

    // Filter by circuit
    if (activeCircuit !== "Todos") {

        filtered = filtered.filter(school =>
            school.Circuito === activeCircuit
        );

    }

    // Filter by search text
    if (searchText !== "") {

        filtered = filtered.filter(school => {

            return Object.values(school).some(value =>
                String(value)
                    .toLowerCase()
                    .includes(searchText)
            );

        });

    }

    displaySchools(filtered);

}
/* =========================
   CIRCUIT FILTERS
========================= */
function createCircuitButtons() {

    const container = document.getElementById("circuitFilters");

    const circuits = [...new Set(schools.map(s => s.Circuito))];

let html = `
    <button
        class="circuit-btn active"
        data-circuit="Todos"
        onclick="showAll()">
        Todos
    </button>
`;

circuits.sort().forEach(circuit => {

    html += `
        <button
            class="circuit-btn"
            data-circuit="${circuit}"
            onclick="filterByCircuit('${circuit}')">
            ${circuit}
        </button>
    `;

});

    container.innerHTML = html;
}

function filterByCircuit(circuit) {

    activeCircuit = circuit;

    updateActiveButton(circuit);

    applyFilters();

}
function showAll() {

    activeCircuit = "Todos";

    updateActiveButton("Todos");

    displaySchools(schools);
applyFilters();
}
/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", async () => {

    try {

        await loadSchools();

        console.log("TOTAL SCHOOLS:", schools.length);

        document.getElementById("loading").style.display = "none";
        document.getElementById("app").style.display = "block";

        displaySchools(schools);

        createCircuitButtons();

        const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("input", function () {
            searchSchools(this.value);
        });
function finishSearch() {

    searchInput.blur();

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });

}


searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        finishSearch();

    }

});


document.getElementById("searchButton").addEventListener("click", function () {

    finishSearch();

});
    }

    catch (error) {

        console.error(error);

        document.getElementById("loading").textContent =
            "Unable to load the directory.";
    }

});
Se agregó el código de los centros educativos
