const movies = [
    { title: "Inception", rating: "8.8", cat: "Sci-Fi", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1" },
    { title: "Interstellar", rating: "8.7", cat: "Sci-Fi", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0" },
    { title: "Joker", rating: "8.4", cat: "Drama", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c" }
];

let myWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let recentPlays = JSON.parse(localStorage.getItem("recent")) || [];

// UI Scroll Effect
window.onscroll = () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
};

// Search Debounce (Performance UX)
let timeout = null;
function searchMovies() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const q = document.getElementById("searchInput").value.toLowerCase();
        renderMovies(movies.filter(m => m.title.toLowerCase().includes(q)));
    }, 300);
}

function renderMovies(data, target = "movieGrid") {
    const grid = document.getElementById(target);
    grid.innerHTML = data.map(m => `
        <div class="movie-card">
            <img src="${m.img}">
            <div class="movie-overlay">
                <button class="btn btn-gold" onclick="openTheater('${m.title}')">▶ PLAY</button>
                <button class="btn btn-glass" onclick="toggleWatchlist('${m.title}')">
                    ${myWatchlist.includes(m.title) ? "✓ SAVED" : "+ WATCHLIST"}
                </button>
            </div>
            <div class="movie-info">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <b>${m.title}</b>
                    <span style="color:var(--gold);font-size:12px;">★ ${m.rating}</span>
                </div>
                <p style="font-size:11px;color:#666;margin-top:5px;">${m.cat} • 4K ULTRA HD</p>
            </div>
        </div>`).join("");
}

function openTheater(t) {
    document.getElementById("mTitle").innerText = t;
    document.getElementById("theater").style.display = "flex";
    
    // Add to continue watching
    if (!recentPlays.includes(t)) {
        recentPlays.unshift(t);
        if (recentPlays.length > 4) recentPlays.pop();
        localStorage.setItem("recent", JSON.stringify(recentPlays));
    }
}

function closeTheater() {
    document.getElementById("theater").style.display = "none";
    document.getElementById("vid").pause();
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
    document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMovies(genre === 'All' ? movies : movies.filter(m => m.cat === genre));
}

function toggleMenu(o) { document.getElementById("sidebar").classList.toggle("open", o); }

function showPanel(p) {
    document.querySelectorAll(".panel").forEach(x => x.classList.remove("active-panel"));
    document.getElementById(p + "Panel").classList.add("active-panel");
    document.getElementById("heroBanner").style.display = (p === "home") ? "flex" : "none";
    toggleMenu(false);
}

function onGoogleLogin(res) {
    const payload = JSON.parse(atob(res.credential.split(".")[1]));
    localStorage.setItem("user", JSON.stringify(payload));
    location.reload();
}

function showAllMovies() { showPanel('home'); renderMovies(movies); }

function showWatchlist() {
    renderMovies(movies.filter(m => myWatchlist.includes(m.title)));
    document.getElementById("catTitle").innerText = "MY WATCHLIST";
    showPanel("home");
}

function logout() { localStorage.clear(); location.reload(); }

// Init
const u = localStorage.getItem("user");
if(u) {
    document.getElementById("authOverlay").style.display = "none";
    renderMovies(movies);
}
