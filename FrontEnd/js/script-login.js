// Stockage du token
localStorage.setItem("user_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMzU0ODA0OCwiZXhwIjoxNzIzNjM0NDQ4fQ.BJ9iQ3ZZL72IdIfUWt1o56O91SB56iS027aY0YlvjVU")

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

        if (login.email === "sophie.bluel@test.tld" && login.password === "S0phie") {
            console.log("Successfully authenticated");
            window.location.href = "./index.html";
            const token = localStorage.getItem("user_token");
        }

        // Message d'erreur si l'un des identifiants est erroné
        else {
            console.log("Authentication failed");
            const failedLogin = document.createElement("p");
            failedLogin.innerHTML = "Votre identifiant ou votre mot de passe est erroné.<br>Veuillez réessayer.";
            failedLogin.id = "failed_login";
            const loginForm = document.querySelector(".login_user");
            loginForm.appendChild(failedLogin);
        }
    });
}

addListenerAuthentification();