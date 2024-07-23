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
        worksCategories.appendChild(categoriesElement);
        categoriesElement.classList.add("p_selected");

        for (let i = 0; i < categoriesTotal; i++) {

            const categoriesElement = document.createElement("p");
            categoriesElement.textContent = data[i].name;
            worksCategories.appendChild(categoriesElement);
        }

        // addEventListener pour chaque bouton
        let categoriesBouton = document.querySelectorAll(".categories p");

        for (let i = 0; i < categoriesBouton.length; i++) {
            categoriesBouton[i].addEventListener("click", function (event) {
                console.log("Vous avez cliqué sur le bouton", event.target.textContent)

                categoriesBouton.forEach(function (removeSelected) {
                    removeSelected.classList.remove("p_selected");
                })
                event.target.classList.add("p_selected");
            })
        }
    })

    .catch(error => {
        console.log("Erreur:", error);
    });
