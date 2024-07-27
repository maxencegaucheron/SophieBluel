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
            boutonTous.classList.add("p_selected");
            //afficher tout les works
        })

        // EventListener pour la catégorie Objets
        let boutonObjets = document.getElementById("1");
        boutonObjets.addEventListener("click", function () {
            console.log("Vous avez cliqué sur le bouton Objets");
            // boutonObjets.classList.add("p_selected");

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
                    // const worksTotal = data.length;

                    const works = worksGallery.querySelectorAll("figure");
                    works.forEach(work => work.style.display = "none");

                    const worksObjects = allWorks.filter((works) => works.categoryId === 1);
                    console.log(worksObjects, "ID pour data[0]", data[0].id);


                    worksObjects.forEach(work => {
                        const worksElement = document.getElementById(`work${work.id}`);
                        if (worksElement) {
                            worksElement.style.display = "inline";
                        } else {
                            console.error(`Element with work.id ${work.id} not found.`);
                        }
                    });

                    // get list from allWorks > transformer l'array en liste jsp
                    // set = non.



                    // get list from worksObjects > //
                    // pour chaque élément de allWorks tant que i < worksTotal = display hidden
                    // pour chaque élément de worksObjects tant que i < objectLenght (à déclarer) = display inline


                    // Même chose mais Id des works et pas des catégories?
                    const test = document.getElementById(`work${data[0].id}`);
                    console.log("Work 1:", test);
                })
        })
    })
    .catch(error => {
        console.log("Erreur:", error);
    })