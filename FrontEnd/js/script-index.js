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
        };
    })

    .then(data => {
        console.log("Data received", data);
        const worksGallery = document.querySelector(".gallery");

        if (!worksGallery) {
            console.error("Element with class \"gallery\" not found.");
            return;
        }

        const worksTotal = data.length;

        // Affichage des travaux
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
        };
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
        };
    })
    .then(data => {
        console.log("Data received", data);
        const worksCategories = document.querySelector(".categories");
        if (!worksCategories) {
            console.error("Element with class \"categories\" not found.");
            return;
        };

        const categoriesTotal = data.length;

        // Affichage des boutons catégories
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
        };

        // Tri des travaux par catégorie
        for (i = 0; i < categoriesTotal + 1; i++) {
            let bouton = document.getElementById(i.toString());
            bouton.addEventListener("click", function () {
                console.log("Vous avez cliqué sur le bouton", bouton.id);

                let boutonId = bouton.id;

                // Changement des classes
                let boutonsAll = document.querySelectorAll("p");
                boutonsAll.forEach(bouton => bouton.classList.remove("p_selected"));
                bouton.classList.add("p_selected");

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
                        };
                    })

                    .then(data => {
                        console.log("Data received", data);
                        const worksGallery = document.querySelector(".gallery");
                        if (!worksGallery) {
                            console.error("Element with class \"gallery\" not found.");
                            return;
                        };

                        // Affichage de tous les travaux
                        if (boutonId === "0") {
                            const works = worksGallery.querySelectorAll("figure");
                            works.forEach(work => work.style.display = "inline");
                        }
                        else {
                            // Filtrage des travaux par catégorie
                            let allWorks = data;
                            const works = worksGallery.querySelectorAll("figure");
                            works.forEach(work => work.style.display = "none");

                            const worksFiltered = allWorks.filter((works) => works.categoryId.toString() === boutonId);

                            worksFiltered.forEach(work => {
                                const worksElement = document.getElementById(`work${work.id}`);
                                if (worksElement) {
                                    worksElement.style.display = "inline";
                                }
                                else {
                                    console.error(`Element with work.id ${work.id} not found.`);
                                };
                            });
                        };
                    });
            });
        };
    })

    .catch(error => {
        console.log("Erreur:", error);
    })

// Vérification de l'authentification
function checkAuthentication() {
    const token = localStorage.getItem("user_token");
    if (token) {
        console.log("User is connected");
        addUserContent();
    }
    else {
        console.log("User is not connected");
    };
};
checkAuthentication();

// Ajout du contenu utilisateur
function addUserContent() {
    const loggedInHeader = document.getElementById("mode_edition_header");
    if (loggedInHeader) {
        loggedInHeader.style.display = "flex";
    };
    const loggedInButton = document.getElementById("mode_edition_modifier");
    if (loggedInButton) {
        loggedInButton.style.display = "inline";
    };

    const loggedInCategories = document.querySelector(".categories");
    if (loggedInCategories) {
        loggedInCategories.style.display = "none";
    };

    // Déconnexion de l'utilisateur
    const loginToLogout = document.getElementById("login");
    if (loginToLogout) {
        loginToLogout.textContent = "logout";
        loginToLogout.href = "./index.html";
        loginToLogout.addEventListener("click", function () {
            const removeToken = localStorage.removeItem("user_token");
        });
    };
    const openModalButton = document.getElementById("mode_edition_modifier");
    const modal = document.querySelector(".modale_container");
    const overlay = document.querySelector(".modale_overlay");

    // Suppression de travaux
    function deleteWork(worksId, worksImageId) {

        const modalWork = document.querySelector(`#work${worksId}`);
        if (modalWork) {
            modalWork.remove();
        }
        const galleryWork = document.querySelector(`#work${worksId}`);
        if (galleryWork) {
            galleryWork.remove();
        }
        console.log("Vous avez supprimé", worksImageId);

        // Vérification du token
        const token = localStorage.getItem("user_token");
        if (token) {
            console.log("Token:", token);
        }
        else {
            console.log("Token not found in LocalStorage");
        };

        // Suppression dans l'API
        fetch("http://localhost:5678/api/works/" + worksId, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                const failedMessage = document.getElementById("error_message");
                if (failedMessage) {
                    failedMessage.remove();
                };

                if (response.ok) {
                    console.log(`Work ${worksImageId} deleted`);
                } else {
                    console.log("Delete request failed:", response.status, worksId);
                    const errorMessage = document.createElement("p");
                    errorMessage.innerHTML = "Un problème est survenu lors de la supression du travail.";
                    errorMessage.id = "error_message_delete";
                    errorMessage.display = "inline";
                    modaleGallery.parentNode.insertBefore(errorMessage, modaleGallery.nextSibling);
                }
            })
            .catch(error => {
                console.error("Error while trying to delete the work:", error);
            })
    };

    // Récupération des travaux 3
    fetch("http://localhost:5678/api/works")
        .then(response => {
            if (response.ok) {
                console.log("Works fetched properly 3");
                return response.json();
            } else {
                console.log("Request failed:", response.status);
                throw new Error("Network response was not ok");
            };
        })

        .then(data => {
            console.log("Data received", data);
            const modalGallery = document.querySelector(".modal_gallery");

            if (!modalGallery) {
                console.error("Element with class \"gallery\" not found.");
                return;
            };

            const worksTotal = data.length;

            // Affichage des travaux dans la modale
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

                deleteIcon.addEventListener("click", function (event) {
                    event.preventDefault();
                    deleteWork(data[i].id, worksImage.id, deleteIcon);
                });
            };
        })

        .catch(error => {
            console.log("Erreur:", error);
        });

    // Ouverture de la modale
    openModalButton.addEventListener("click", openModal);

    function openModal(event) {
        event.preventDefault();
        modal.style.display = "flex";
        overlay.style.display = "block";

        const addButton = document.getElementById("add_button");
        addButton.addEventListener("click", addWorks);
        const modaleGallery = document.querySelector(".modal_gallery");
        const modaleTitle = document.querySelector(".modale h2");
        const ajoutPhotoTitle = document.getElementById("ajout_photo");
        const sendWorkButton = document.getElementById("send_work_button");
        const sendWorkContainer = document.querySelector(".send_work");
        const breakLineModal = document.querySelector(".modale hr");
        const returnButton = document.getElementById("modale_bouton_return");

        // Deuxième page de la modale
        function addWorks(event) {
            event.preventDefault();
            console.log("Vous avez cliqué sur le bouton Ajouter une photo");
            modaleGallery.style.display = "none";
            addButton.style.display = "none";
            modaleTitle.style.display = "none";
            breakLineModal.style.display = "none";
            ajoutPhotoTitle.style.display = "flex";
            sendWorkButton.style.display = "flex";
            sendWorkContainer.style.display = "flex";
            returnButton.style.display = "flex";

            // Récupération des catégories 2
            console.log("Starting fetch operation to http://localhost:5678/api/categories");

            fetch("http://localhost:5678/api/categories")
                .then(response => {
                    if (response.ok) {
                        console.log("Categories fetched properly 2");
                        return response.json();
                    } else {
                        console.log("Request failed:", response.status);
                        throw new Error("Network response was not ok");
                    };
                })
                .then(data => {
                    console.log("Data received", data);
                    const worksCategories = document.querySelector(".categories");
                    if (!worksCategories) {
                        console.error("Element with class \"categories\" not found.");
                        return;
                    };

                    // Ajout des catégories dans le formulaire
                    const categoriesTotal = data.length;
                    const selectCategory = document.getElementById('category');

                    selectCategory.innerHTML = "";
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
                    };
                });
        };

        // Fermeture de la modale
        const closeModalButton = document.getElementById("modale_bouton_close");

        function closeModal() {
            modal.style.display = "none";
            overlay.style.display = "none";
        };

        closeModalButton.addEventListener("click", function (event) {
            event.preventDefault();
            closeModal();
        });

        // Retour à la première page de la modale
        returnButton.addEventListener("click", returnModal);
        function returnModal(event) {
            event.preventDefault();
            console.log("Vous avez cliqué sur le bouton Retour");
            modaleGallery.style.display = "grid";
            addButton.style.display = "flex";
            modaleTitle.style.display = "flex";
            breakLineModal.style.display = "flex";
            ajoutPhotoTitle.style.display = "none";
            sendWorkButton.style.display = "none";
            sendWorkContainer.style.display = "none";
            returnButton.style.display = "none";
        };

        const sendFile = document.getElementById("file");
        const sendTitle = document.getElementById("title");
        const sendCategory = document.getElementById("category");
        const sendWorkImage = document.querySelector(".send_work_image");
        const sendWorkForm = document.getElementById("send_work_form");

        // Changement du bouton valider si tous les champs sont remplis
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
        };

        // Ajout d'un fichier dans le formulaire
        sendFile.addEventListener("input", function (event) {
            event.preventDefault();
            console.log("Vous avez ajouté un fichier");

            const newImage = document.createElement("img");
            newImage.classList.add("new_image_preview");
            const reader = new FileReader();
            reader.onload = function (e) {
                newImage.src = e.target.result;
            };
            reader.readAsDataURL(sendFile.files[0]);
            sendWorkImage.appendChild(newImage);

            const sendWorkButton = document.getElementById("add_file");
            const sendWorkIcon = document.getElementById("send_work_icon");
            const sendWorkP = document.getElementById("send_work_p");
            const sendWorkInput = document.querySelector(".send_work input");
            sendWorkButton.style.display = "none";
            sendWorkIcon.style.display = "none";
            sendWorkP.style.display = "none";
            sendWorkInput.style.display = "none";

            checkInputs();
        });

        sendTitle.addEventListener("input", checkInputs);
        sendCategory.addEventListener("change", checkInputs);

        // Envoi du formulaire pour ajouter un travail
        sendWorkForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Vérification du token
            const token = localStorage.getItem("user_token");
            if (token) {
                console.log("Token:", token);
            }
            else {
                console.log("Token not found in LocalStorage");
            };

            const failedMessage = document.getElementById("error_message");
            if (failedMessage) {
                failedMessage.remove();
            };

            // Message d'erreur si tous les champs ne sont pas remplis
            if (sendFile.files.length === 0 || sendTitle.value.trim() === "" || sendCategory.value.trim() === "") {
                const errorMessage = document.createElement("p");
                errorMessage.innerHTML = "Merci de remplir tous les champs.";
                errorMessage.id = "error_message";
                const sendWork = document.querySelector(".send_work");
                sendWork.appendChild(errorMessage);
            }

            else {
                // Ajout nouveau travail dans l'API
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
                            console.log("Work added:", newTitle.value);
                            return response.json();

                        } else {
                            console.log("Add request failed:", response.status);
                            const errorMessage = document.createElement("p");
                            errorMessage.innerHTML = "Un problème est survenu lors de l'envoi du travail.";
                            errorMessage.id = "error_message";
                            const sendWork = document.querySelector(".send_work");
                            sendWork.appendChild(errorMessage);
                        };
                    })

                    .then(data => {
                        // Affichage du nouveau travail dans la gallerie
                        const worksGallery = document.querySelector(".gallery");
                        if (!worksGallery) {
                            console.error("Element with class \"gallery\" not found.");
                            return;
                        };

                        const worksContainer = document.createElement("figure");
                        worksContainer.id = `work${data.id}`;
                        const worksImage = document.createElement("img");
                        worksImage.src = data.imageUrl;
                        worksImage.alt = data.title;
                        const worksCaption = document.createElement("figcaption");
                        worksCaption.textContent = data.title;
                        worksGallery.appendChild(worksContainer);
                        worksContainer.appendChild(worksImage);
                        worksContainer.appendChild(worksCaption);

                        closeModal();
                    })
                    .catch(error => {
                        console.error("Error while trying to add the work:", error);
                    });
            };
        });
    };
};