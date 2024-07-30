// Récupération des travaux
console.log("Starting fetch operation to http://localhost:5678/api/works");

fetch("http://localhost:5678/api/works")
    .then(response => {
        if (response.ok) {
            console.log("Works fetched properly");
            return response.json();
        } else {
            console.log("Request failed:", response.status);
            throw new Error("Network response was not ok");
        }
    })

    .then(data => {
        console.log("Data received", data);
        const worksGallery = document.querySelector(".gallery");

        if (!worksGallery) {
            console.error("Element with class \"gallery\" not found.");
            return;
        }

        const worksTotal = data.length;

        for (let i = 0; i < worksTotal; i++) {
            const worksContainer = document.createElement("figure");
            worksContainer.id = `work${data[i].id}`;
            const worksImage = document.createElement("img");
            worksImage.src = data[i].imageUrl;
            worksImage.alt = data[i].title;
            const worksCaption = document.createElement("figcaption");
            worksCaption.textContent = data[i].title;
            worksGallery.appendChild(worksContainer);
            worksContainer.appendChild(worksImage);
            worksContainer.appendChild(worksCaption);
        }
    })

    .catch(error => {
        console.log("Erreur:", error);
    });

// Récupération des catégories
console.log("Starting fetch operation to http://localhost:5678/api/categories");

fetch("http://localhost:5678/api/categories")
    .then(response => {
        if (response.ok) {
            console.log("Categories fetched properly");
            return response.json();
        } else {
            console.log("Request failed:", response.status);
            throw new Error("Network response was not ok");
        }
    })
    .then(data => {
        console.log("Data received", data);
        const worksCategories = document.querySelector(".categories");
        if (!worksCategories) {
            console.error("Element with class \"categories\" not found.");
            return;
        }

        const categoriesTotal = data.length;

        const categoriesElement = document.createElement("p");
        categoriesElement.textContent = "Tous";
        categoriesElement.id = "0";
        worksCategories.appendChild(categoriesElement);
        categoriesElement.classList.add("p_selected");

        for (let i = 0; i < categoriesTotal; i++) {

            const categoriesElement = document.createElement("p");
            categoriesElement.textContent = data[i].name;
            categoriesElement.id = data[i].id;
            worksCategories.appendChild(categoriesElement);
        }

        // Boucle pour trier les travaux au clic
        for (i = 0; i < categoriesTotal + 1; i++) {
            let bouton = document.getElementById(i.toString());
            bouton.addEventListener("click", function () {
                console.log("Vous avez cliqué sur le bouton", bouton.id);

                let boutonId = bouton.id;

                // Modification des classes
                let boutonsAll = document.querySelectorAll("p");
                boutonsAll.forEach(bouton => bouton.classList.remove("p_selected"));
                bouton.classList.add("p_selected");

                console.log("Starting fetch operation to http://localhost:5678/api/works");
                fetch("http://localhost:5678/api/works")
                    .then(response => {
                        if (response.ok) {
                            console.log("Works fetched properly 2");
                            return response.json();
                        } else {
                            console.log("Request failed:", response.status);
                            throw new Error("Network response was not ok");
                        }
                    })

                    .then(data => {
                        console.log("Data received", data);
                        const worksGallery = document.querySelector(".gallery");
                        if (!worksGallery) {
                            console.error("Element with class \"gallery\" not found.");
                            return;
                        }

                        if (boutonId === "0") {
                            const works = worksGallery.querySelectorAll("figure");
                            works.forEach(work => work.style.display = "inline");
                        }
                        else {
                            // Filtrage des travaux 
                            let allWorks = data;
                            const works = worksGallery.querySelectorAll("figure");
                            works.forEach(work => work.style.display = "none");

                            const worksFiltered = allWorks.filter((works) => works.categoryId.toString() === boutonId);

                            worksFiltered.forEach(work => {
                                const worksElement = document.getElementById(`work${work.id}`);
                                if (worksElement) {
                                    worksElement.style.display = "inline";
                                } else {
                                    console.error(`Element with work.id ${work.id} not found.`);
                                }
                            })
                        }
                    })
            })
        }

    })

    .catch(error => {
        console.log("Erreur:", error);
    })

// Quand utilisateur connecté
function checkAuthentication() {
    const token = localStorage.getItem("user_token");
    if (token) {
        console.log("User is connected");
        addUserContent();
    }
    else {
        console.log("User is not connected");
    }
}
checkAuthentication();

function addUserContent() {
    const loggedInHeader = document.getElementById("mode_edition_header");
    if (loggedInHeader) {
        loggedInHeader.style.display = "flex";
    }
    const loggedInProjects = document.getElementById("mode_edition_projets");
    if (loggedInProjects) {
        loggedInProjects.style.display = "inline";
    }

    const loggedInCategories = document.querySelector(".categories");
    if (loggedInCategories) {
        loggedInCategories.style.display = "none";
    }

    const loginToLogout = document.getElementById("login");
    if (loginToLogout) {
        loginToLogout.textContent = "logout";
        loginToLogout.href = "./index.html";
        loginToLogout.addEventListener("click", function () {
            const removeToken = localStorage.removeItem("user_token");
        })

    }
}