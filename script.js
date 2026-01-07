/* DATABASE */
const movies = [
    { title: "Inception", rating: "8.8", cat: "Sci-Fi", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1" },
    { title: "Interstellar", rating: "8.7", cat: "Sci-Fi", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0" },
    { title: "Joker", rating: "8.4", cat: "Drama", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c" }
];

/* STATE MANAGEMENT */
let myWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
const movieGrid = document.getElementById("movieGrid");
const theater = document.getElementById("theater");
const vid = document.getElementById("vid");
const mTitle = document.getElementById("mTitle");
const sidebar = document.getElementById("sidebar");
const heroBanner = document.getElementById("heroBanner");
const catTitle = document.getElementById("catTitle");

/* INITIALIZATION */
function init() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    
    document.getElementById("authOverlay").style.display = "none";
    renderMovies(movies);
}

/* AUTHENTICATION */
function onGoogleLogin(res) {
    // Decoding JWT payload from Google
    const payload = JSON.parse(atob(res.credential.split(".")[1]));
    localStorage.setItem("user", JSON.stringify(payload));
    location.reload();
}

function logout() {
    localStorage.clear();
    location.reload();
}

/* RENDERING LOGIC */
function renderMovies(data) {
    if (!movieGrid) return;

    movieGrid.innerHTML = data.map(m => `
        <div class="movie-card">
            <img src="${m.img}" alt="${m.title}">
            <div class="movie-overlay">
                <button class="btn btn-gold" onclick="openTheater('${m.title}')">▶ PLAY</button>
                <button class="btn btn-glass" onclick="toggleWatchlist('${m.title}')">
                    ${myWatchlist.includes(m.title) ? "✓ SAVED" : "+ WATCHLIST"}
                </button>
            </div>
            <div class="movie-info">
                <b>${m.title}</b>
                <div style="display:flex;justify-content:space-between;font-size:12px">
                    <span style="color:var(--gold)">★ ${m.rating}</span>
                    <span>${m.cat}</span>
                </div>
            </div>
        </div>`).join("");
}

/* NAVIGATION & UI CONTROLS */
function toggleMenu(open) {
    sidebar.classList.toggle("open", open);
}

function showPanel(panelName) {
    document.querySelectorAll(".panel").forEach(x => x.classList.remove("active-panel"));
    document.getElementById(panelName + "Panel").classList.add("active-panel");
    
    // Hide hero unless on discovery/home
    heroBanner.style.display = (panelName === "home") ? "flex" : "none";
    toggleMenu(false);
}

/* FEATURE LOGIC */
function openTheater(title) {
    mTitle.innerText = title;
    theater.style.display = "flex";
}

function closeTheater() {
    theater.style.display = "none";
    vid.pause();
}

function toggleWatchlist(title) {
    if (myWatchlist.includes(title)) {
        myWatchlist = myWatchlist.filter(x => x !== title);
    } else {
        myWatchlist.push(title);
    }
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
    
    // Re-render to update button text
    const currentQuery = document.querySelector(".search-box input").value;
    if(currentQuery) {
        searchMovies();
    } else {
        renderMovies(movies);
    }
}

function searchMovies() {
    const query = document.querySelector(".search-box input").value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    renderMovies(filtered);
}

function showAllMovies() {
    catTitle.innerText = "DISCOVERY";
    renderMovies(movies);
    showPanel("home");
}

function showWatchlist() {
    const filtered = movies.filter(m => myWatchlist.includes(m.title));
    renderMovies(filtered);
    catTitle.innerText = "MY WATCHLIST";
    showPanel("home");
}

function checkUpdates(btn) {
    btn.innerText = "Checking...";
    setTimeout(() => btn.innerText = "v2.5.0 ✓", 1000);
}

// Start app
init();
