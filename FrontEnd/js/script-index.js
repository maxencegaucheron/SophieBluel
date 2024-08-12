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
    const loggedInButton = document.getElementById("mode_edition_modifier");
    if (loggedInButton) {
        loggedInButton.style.display = "inline";
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
    const openModalButton = document.getElementById("mode_edition_modifier");
    const modal = document.querySelector(".modale_container");
    const overlay = document.querySelector(".modale_overlay");

    fetch("http://localhost:5678/api/works")
        .then(response => {
            if (response.ok) {
                console.log("Works fetched properly 3");
                return response.json();
            } else {
                console.log("Request failed:", response.status);
                throw new Error("Network response was not ok");
            }
        })

        .then(data => {
            console.log("Data received", data);
            const modalGallery = document.querySelector(".modal_gallery");

            if (!modalGallery) {
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
                modalGallery.appendChild(worksContainer);
                worksContainer.appendChild(worksImage);
                const deleteIcon = document.createElement("i");
                deleteIcon.classList = "fa-solid fa-trash-can delete_icon";
                worksImage.id = `${data[i].title}`;
                worksContainer.appendChild(deleteIcon);

                deleteIcon.addEventListener("click", function () {

                    const worksId = data[i].id;
                    console.log("Vous avez supprimé", worksImage.id)
                    deleteIcon.parentElement.remove();

                    const token = localStorage.getItem("user_token");
                    if (token) {
                        console.log("Token:", token);
                    }
                    else {
                        console.log("Token not found in LocalStorage");
                    }

                    fetch("http://localhost:5678/api/works/" + worksId, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                console.log(`Work ${worksImage.id} deleted`);
                            } else {
                                console.log("Delete request failed:", response.status, worksId);
                            }
                        })
                        .catch(error => {
                            console.error("Error while trying to delete the work:", error);
                        })
                })
            }
        })

        .catch(error => {
            console.log("Erreur:", error);
        });

    openModalButton.addEventListener("click", openModal);

    function openModal() {
        modal.style.display = "flex";
        overlay.style.display = "block";

        const addButton = document.getElementById("add_button");
        addButton.addEventListener("click", addWorks);
        const modaleGallery = document.querySelector(".modal_gallery");
        const modaleTitle = document.querySelector(".modale p");
        const ajoutPhotoTitle = document.getElementById("ajout_photo");
        const sendWorkButton = document.getElementById("send_work_button");
        const sendWorkContainer = document.querySelector(".send_work");
        const breakLineModal = document.querySelector(".modale hr")
        const returnButton = document.getElementById("modale_bouton_return")

        function addWorks() {
            console.log("Vous avez cliqué sur le bouton Ajouter une photo");
            modaleGallery.style.display = "none";
            addButton.style.display = "none";
            modaleTitle.style.display = "none";
            breakLineModal.style.display = "none";
            ajoutPhotoTitle.style.display = "flex";
            sendWorkButton.style.display = "flex";
            sendWorkContainer.style.display = "flex";
            returnButton.style.display = "flex";

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
                    const selectCategory = document.getElementById('category');

                    const option = document.createElement("option");
                    option.value = "";
                    option.disabled = true;
                    option.selected = true;
                    selectCategory.appendChild(option);

                    for (let i = 0; i < categoriesTotal; i++) {

                        const option = document.createElement("option");
                        option.textContent = data[i].name;
                        option.value = data[i].id;
                        selectCategory.appendChild(option);
                    }
                })
        }



        const sendFile = document.getElementById("file");
        const sendTitle = document.getElementById("title");
        const sendCategory = document.getElementById("category");
        const sendWorkImage = document.querySelector(".send_work_image");
        const sendWorkForm = document.getElementById("send_work_form");

        function checkInputs() {
            if (sendFile.files.length > 0 && sendTitle.value.trim() !== "" && sendCategory.value.trim() !== "") {
                sendWorkButton.style.backgroundColor = "#1D6154";
                const failedMessage = document.getElementById("error_message");
                if (failedMessage) {
                    failedMessage.remove();
                }
            }
            else {
                sendWorkButton.style.backgroundColor = "#a7a7a7";
            }
        }

        sendFile.addEventListener("input", function () {
            console.log("Vous avez ajouté un fichier");

            const reader = new FileReader();
            reader.onload = function (e) {
                newImage.src = e.target.result;
            };
            reader.readAsDataURL(sendFile.files[0]);

            const newImage = document.createElement("img");
            newImage.classList.add("new_image_preview");
            sendWorkImage.appendChild(newImage);

            const sendWorkForm = document.getElementById("send_work_form");
            const sendWorkIcon = document.getElementById("send_work_icon");
            sendWorkForm.style.display = "none";
            sendWorkIcon.style.display = "none";

            checkInputs();
        })

        sendTitle.addEventListener("input", checkInputs);
        sendCategory.addEventListener("change", checkInputs);

        sendWorkForm.addEventListener("submit", function (event) {
            event.preventDefault();

            ///

            const token = localStorage.getItem("user_token");
            if (token) {
                console.log("Token:", token);
            }
            else {
                console.log("Token not found in LocalStorage");
            }

            const newFile = document.getElementById("file");
            const newTitle = document.getElementById("title");
            const newCategory = document.getElementById("category");

            const newWorkData = new FormData();
            newWorkData.append("image", newFile.files[0]);
            newWorkData.append("title", newTitle.value);
            newWorkData.append("category", newCategory.value);

            fetch("http://localhost:5678/api/works/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
                body: newWorkData,
            })

                .then(response => {
                    if (response.ok) {
                        console.log("Work added");

                    } else {
                        console.log("Add request failed:", response.status);
                    }
                })
                .catch(error => {
                    console.error("Error while trying to add the work:", error);
                })
            ////

            const failedMessage = document.getElementById("error_message");
            if (failedMessage) {
                failedMessage.remove();
            }

            if (sendFile.files.length === 0 || sendTitle.value.trim() === "" || sendCategory.value.trim() === "") {
                const errorMessage = document.createElement("p");
                errorMessage.innerHTML = "Merci de remplir tous les champs.";
                errorMessage.id = "error_message";
                const sendWork = document.querySelector(".send_work");
                sendWork.appendChild(errorMessage);
            }

            else {
                console.log("Vous avez ajouté un travail");
            }

        })

        const closeModalButton = document.getElementById("modale_bouton_close");
        closeModalButton.addEventListener("click", closeModal);
        function closeModal() {
            modal.style.display = "none";
            overlay.style.display = "none";
        }

        returnButton.addEventListener("click", returnModal);
        function returnModal() {
            console.log("Vous avez cliqué sur le bouton Retour");
            modaleGallery.style.display = "grid";
            addButton.style.display = "flex";
            modaleTitle.style.display = "flex";
            breakLineModal.style.display = "flex";
            ajoutPhotoTitle.style.display = "none";
            sendWorkButton.style.display = "none";
            sendWorkContainer.style.display = "none";
            returnButton.style.display = "none";
        }
    }
}