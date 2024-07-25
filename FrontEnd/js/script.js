// Récupération des travaux\
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

        async function getAllWorks() {
            const allWorks = data;
            return allWorks;
        }

        asyncCall();

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
        categoriesElement.id = "0";
        worksCategories.appendChild(categoriesElement);
        categoriesElement.classList.add("p_selected");

        for (let i = 0; i < categoriesTotal; i++) {

            const categoriesElement = document.createElement("p");
            categoriesElement.textContent = data[i].name;
            categoriesElement.id = data[i].id;
            worksCategories.appendChild(categoriesElement);
        }

        // addEventListener pour chaque bouton

        let boutonTous = document.getElementById("0");
        boutonTous.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Tous");
            boutonTous.classList.add("p_selected");
            //afficher tout les works
        })

        let boutonObjets = document.getElementById("1");
        boutonObjets.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Objets");
            // boutonObjets.classList.add("p_selected");

            // Filtrage de la catégorie Objets / does not work

            // soit tu fais une requetes -> recuperer les works
            // soit tu recupere la section gallery

            const allWorks = getAllWorks();
            console.log("test", allWorks);

            const worksObjets = allWorks.filter((works) => works.categoryId === 1);
            console.log(allWorks, worksObjets);
            const worksObjetsTotal = worksObjets.length;

            const worksGallery = document.querySelector(".gallery");

            if (!worksGallery) {
                console.error("Element with class \"gallery\" not found.");
                return;
            }


            for (let i = 0; i < worksObjetsTotal; i++) {
                // css tu affiche soit tu cache

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
    })

    //

    .catch(error => {
        console.log("Erreur:", error);
    });