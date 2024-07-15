// Récupération des travaux
console.log("Starting fetch operation to http://localhost:5678/api/works");

fetch("http://localhost:5678/api/works")
    .then(response => {
        if (response.ok) {
            console.log("Works fetched properly")
        } else {
            console.log("Request failed:", response.status)
        }
    })
    .catch(error => {
        console.log("Erreur:", error)
    });