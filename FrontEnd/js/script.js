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

        // EventListener du bouton Tous
        let boutonTous = document.getElementById("0");
        boutonTous.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Tous");

            // Modification des classes
            let boutonsAll = document.querySelectorAll("p");
            boutonsAll.forEach(bouton => bouton.classList.remove("p_selected"));
            boutonTous.classList.add("p_selected");
            //afficher tout les works

            // Récupération des travaux 2
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

                    // Filtrage des travaux 
                    const works = worksGallery.querySelectorAll("figure");
                    works.forEach(work => work.style.display = "inline");
                })
        })

        // EventListener pour la catégorie Objets
        let boutonObjets = document.getElementById("1");
        boutonObjets.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Objets");

            // Modification des classes
            let boutonsAll = document.querySelectorAll("p");
            boutonsAll.forEach(bouton => bouton.classList.remove("p_selected"));
            boutonObjets.classList.add("p_selected");

            // Récupération des travaux 2
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

                    // Filtrage des travaux 
                    let allWorks = data;
                    const works = worksGallery.querySelectorAll("figure");
                    works.forEach(work => work.style.display = "none");

                    const worksFiltered = allWorks.filter((works) => works.categoryId === 1);
                    console.log(worksFiltered, "ID pour data[0]", data[0].id);

                    worksFiltered.forEach(work => {
                        const worksElement = document.getElementById(`work${work.id}`);
                        if (worksElement) {
                            worksElement.style.display = "inline";
                        } else {
                            console.error(`Element with work.id ${work.id} not found.`);
                        }
                    });

                    const test = document.getElementById(`work${data[0].id}`);
                    console.log("Work 1:", test);
                })
        })

        // EventListener pour la catégorie Appartements
        let boutonAppartements = document.getElementById("2");
        boutonAppartements.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Appartements");

            // Modification des classes
            let boutonsAll = document.querySelectorAll("p");
            boutonsAll.forEach(bouton => bouton.classList.remove("p_selected"));
            boutonAppartements.classList.add("p_selected");

            // Récupération des travaux 2
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

                    // Filtrage des travaux 
                    let allWorks = data;
                    const works = worksGallery.querySelectorAll("figure");
                    works.forEach(work => work.style.display = "none");

                    const worksFiltered = allWorks.filter((works) => works.categoryId === 2);
                    console.log(worksFiltered);

                    worksFiltered.forEach(work => {
                        const worksElement = document.getElementById(`work${work.id}`);
                        if (worksElement) {
                            worksElement.style.display = "inline";
                        } else {
                            console.error(`Element with work.id ${work.id} not found.`);
                        }
                    });

                    const test = document.getElementById(`work${data[0].id}`);
                    console.log("Work 1:", test);
                })
        })

        // EventListener pour la catégorie Hotels et Restaurants
        let boutonHotels = document.getElementById("3");
        boutonHotels.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Appartements");

            // Modification des classes
            let boutonsAll = document.querySelectorAll("p");
            boutonsAll.forEach(bouton => bouton.classList.remove("p_selected"));
            boutonHotels.classList.add("p_selected");

            // Récupération des travaux 2
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

                    // Filtrage des travaux 
                    let allWorks = data;
                    const works = worksGallery.querySelectorAll("figure");
                    works.forEach(work => work.style.display = "none");

                    const worksFiltered = allWorks.filter((works) => works.categoryId === 3);
                    console.log(worksFiltered);

                    worksFiltered.forEach(work => {
                        const worksElement = document.getElementById(`work${work.id}`);
                        if (worksElement) {
                            worksElement.style.display = "inline";
                        } else {
                            console.error(`Element with work.id ${work.id} not found.`);
                        }
                    });

                    const test = document.getElementById(`work${data[0].id}`);
                    console.log("Work 1:", test);
                })
        })

    })
    .catch(error => {
        console.log("Erreur:", error);
    })


// Intégration du design de la page de formulaire

function addListenerAuthentification() {
    const loginForm = document.querySelector(".login_user");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };

        const failedMessage = document.getElementById("failed_login");
        if (failedMessage) {
            failedMessage.remove();
        }

        if (login.email === "sophie.bluel@test.tld" && login.password === "S0phie") {
            console.log("Successfully authenticated");
            failedMessage.remove();
        }
        else {
            console.log("Authentication failed");
            const failedLogin = document.createElement("p");
            failedLogin.innerHTML = "Votre identifiant ou votre mot de passe est erronné.<br>Veuillez réessayer.";
            failedLogin.id = "failed_login";
            const loginForm = document.querySelector(".login_user");
            loginForm.appendChild(failedLogin);
        }
    });
}

addListenerAuthentification();


