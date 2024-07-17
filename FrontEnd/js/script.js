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
            console.error("Element with class 'gallery' not found.");
            return;
        }
        const worksTotal = 11;

        for (let id = 0; id < worksTotal; id++) {
            const worksContainer = document.createElement("figure");
            const worksImage = document.createElement("img");
            worksImage.src = data[id].imageUrl;
            worksImage.alt = data[id].title;
            const worksCaption = document.createElement("figcaption");
            worksCaption.textContent = data[id].title;
            worksGallery.appendChild(worksContainer);
            worksContainer.appendChild(worksImage);
            worksContainer.appendChild(worksCaption);
        }
    })

    .catch(error => {
        console.log("Erreur:", error);
    });