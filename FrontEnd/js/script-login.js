// Connexion de l'utilisateur
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

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        })

            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const failedLogin = document.createElement("p");
                    failedLogin.innerHTML = "Votre identifiant ou votre mot de passe est erroné.<br>Veuillez réessayer.";
                    failedLogin.id = "failed_login";
                    const loginForm = document.querySelector(".login_user");
                    loginForm.appendChild(failedLogin);
                    throw new Error("Authentication failed");
                }
            })
            .then(data => {
                console.log("Successfully authenticated");
                window.location.href = "./index.html";
                const token = data.token;
                localStorage.setItem("user_token", token);
            })
            .catch(error => {
                console.error("Authentication failed:", error);
            });
    });
}

addListenerAuthentification();