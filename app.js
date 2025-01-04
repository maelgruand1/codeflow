// Import Firebase Auth dans index.html
const routes = {
    home: `
        <h2>Bienvenue sur CodeFlow</h2>
        <p>Connectez-vous pour gérer vos tâches.</p>
        <button onclick="handleLogout()">Déconnexion</button>
    `,
    login: `
        <div class="form-container">
            <h2>Connexion</h2>
            <form onsubmit="event.preventDefault(); handleLogin(email.value, password.value)">
                <label for="email">Email :</label>
                <input type="email" id="email" placeholder="Entrez votre email" required />
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="Entrez votre mot de passe" required />
                <button type="submit">Se connecter</button>
            </form>
            <button onclick="handleGoogleSignIn()">Connexion avec Google</button>
            <p class="info">Pas encore inscrit ? <a href="#" id="goToSignup">Créer un compte</a></p>
        </div>
    `,
    signup: `
        <div class="form-container">
            <h2>Inscription</h2>
            <form onsubmit="event.preventDefault(); handleSignUp(email.value, password.value)">
                <label for="email">Email :</label>
                <input type="email" id="email" placeholder="Entrez votre email" required />
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="Choisissez un mot de passe" required />
                <button type="submit">S'inscrire</button>
            </form>
            <p class="info">Déjà un compte ? <a href="#" id="goToLogin">Se connecter</a></p>
        </div>
    `,
    tasks: `
        <h2>Mes Tâches</h2>
        <ul id="task-list">
            <!-- Liste des tâches dynamiquement générée -->
        </ul>
        <form id="task-form" onsubmit="event.preventDefault(); addTask(taskInput.value)">
            <input type="text" id="taskInput" placeholder="Ajouter une nouvelle tâche" required />
            <button type="submit">Ajouter</button>
        </form>
    `,
};

// Redirige si l'utilisateur n'est pas connecté
async function checkUserAndRender(page) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        alert("Vous devez être connecté pour accéder à cette page.");
        navigateTo("login");
        return;
    }

    renderPage(page);
}

// Navigation et rendu des pages
function navigateTo(page) {
    const appDiv = document.getElementById("app");

    if (page === "tasks") {
        checkUserAndRender("tasks");
    } else {
        renderPage(page);
    }
}

function renderPage(page) {
    document.getElementById("app").innerHTML = routes[page];
}

document.getElementById("home-link").addEventListener("click", () => navigateTo("home"));
document.getElementById("login-link").addEventListener("click", () => navigateTo("login"));
document.getElementById("signup-link").addEventListener("click", () => navigateTo("signup"));
document.getElementById("tasks-link").addEventListener("click", () => navigateTo("tasks"));


// Gestion des tâches (local pour le moment)
let tasks = [];

function addTask(task) {
    tasks.push(task);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = tasks
        .map((task, index) => `<li>${task} <button onclick="removeTask(${index})">Supprimer</button></li>`)
        .join("");
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
