/* ADD TO YOUR EXISTING SCRIPT.JS */

// Show Notification Toast
function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
}

// Filter movies by genre
function filterGenre(genre, btn) {
    // UI Update
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Data Update
    if (genre === 'All') {
        renderMovies(movies);
    } else {
        const filtered = movies.filter(m => m.cat === genre);
        renderMovies(filtered);
    }
}

// Modify your existing toggleWatchlist to include a toast
function toggleWatchlist(t) {
    const index = myWatchlist.indexOf(t);
    if (index > -1) {
        myWatchlist.splice(index, 1);
        showToast("Removed from Watchlist");
    } else {
        myWatchlist.push(t);
        showToast("Added to Watchlist!");
    }
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
    
    // Check if we are currently viewing the watchlist to refresh view
    if (catTitle.innerText === "MY WATCHLIST") {
        showWatchlist();
    } else {
        renderMovies(movies);
    }
}
