/* DATA */
const movies = [
    { title: "Inception", rating: "8.8", cat: "Sci-Fi", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1" },
    { title: "Interstellar", rating: "8.7", cat: "Sci-Fi", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0" },
    { title: "Joker", rating: "8.4", cat: "Drama", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c" }
];

/* STATE */
let myWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let recentPlays = JSON.parse(localStorage.getItem("recent")) || [];

const movieGrid = document.getElementById("movieGrid");
const continueGrid = document.getElementById("continueGrid");
const continueSection = document.getElementById("continueSection");
const theater = document.getElementById("theater");
const vid = document.getElementById("vid");
const mTitle = document.getElementById("mTitle");
const sidebar = document.getElementById("sidebar");
const heroBanner = document.getElementById("heroBanner");
const catTitle = document.getElementById("catTitle");

/* INIT */
function init() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    document.getElementById("authOverlay").style.display = "none";
    renderMovies(movies);
    renderRecent();
}

function onGoogleLogin(res) {
    const payload = JSON.parse(atob(res.credential.split(".")[1]));
    localStorage.setItem("user", JSON.stringify(payload));
    location.reload();
}

/* RENDERING */
function renderMovies(data, target = movieGrid) {
    target.innerHTML = data.map(m => `
        <div class="movie-card">
            <img src="${m.img}">
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

function renderRecent() {
    if (recentPlays.length > 0) {
        continueSection.style.display = "block";
        const recentData = movies.filter(m => recentPlays.includes(m.title));
        renderMovies(recentData, continueGrid);
    } else {
        continueSection.style.display = "none";
    }
}

/* CORE LOGIC */
function openTheater(t) {
    mTitle.innerText = t;
    theater.style.display = "flex";
    
    // Track Recent
    if (!recentPlays.includes(t)) {
        recentPlays.unshift(t);
        if (recentPlays.length > 4) recentPlays.pop();
        localStorage.setItem("recent", JSON.stringify(recentPlays));
        renderRecent();
    }
}

function closeTheater() {
    theater.style.display = "none";
    vid.pause();
}

function toggleWatchlist(t) {
    const idx = myWatchlist.indexOf(t);
    if (idx > -1) {
        myWatchlist.splice(idx, 1);
        showToast("Removed from Watchlist");
    } else {
        myWatchlist.push(t);
        showToast("Added to Watchlist!");
    }
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
    renderMovies(movies);
}

function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
}

function filterGenre(genre, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtered = (genre === 'All') ? movies : movies.filter(m => m.cat === genre);
    renderMovies(filtered);
}

/* NAVIGATION */
function toggleMenu(o) { sidebar.classList.toggle("open", o); }

function showPanel(p) {
    document.querySelectorAll(".panel").forEach(x => x.classList.remove("active-panel"));
    document.getElementById(p + "Panel").classList.add("active-panel");
    heroBanner.style.display = (p === "home") ? "flex" : "none";
    toggleMenu(false);
}

function searchMovies() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    renderMovies(movies.filter(m => m.title.toLowerCase().includes(q)));
}

function showAllMovies() {
    catTitle.innerText = "DISCOVERY";
    renderMovies(movies);
    showPanel("home");
}

function showWatchlist() {
    renderMovies(movies.filter(m => myWatchlist.includes(m.title)));
    catTitle.innerText = "MY WATCHLIST";
    showPanel("home");
}

function logout() { localStorage.clear(); location.reload(); }

function checkUpdates(btn) {
    btn.innerText = "Checking...";
    setTimeout(() => btn.innerText = "v2.5.0 ✓", 1000);
}

init();
