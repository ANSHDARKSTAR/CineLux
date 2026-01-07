const panels=document.querySelectorAll(".panel");
const sidebar=document.getElementById("sidebar");

const movies=[
{title:"Interstellar",cat:"Sci-Fi",img:"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"},
{title:"Joker",cat:"Drama",img:"https://images.unsplash.com/photo-1509248961158-e54f6934749c"},
{title:"Inception",cat:"Action",img:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1"}
];

let watchlist=JSON.parse(localStorage.getItem("watchlist"))||[];

function openPanel(id){
panels.forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
sidebar.style.left="-260px";
}

function toggleMenu(){
sidebar.style.left=sidebar.style.left==="0px"?"-260px":"0px";
}

function renderMovies(list){
const grid=document.getElementById("movieGrid");
grid.innerHTML="";
list.forEach(m=>{
const d=document.createElement("div");
d.className="movie";
d.innerHTML=`<img src="${m.img}"><h4>${m.title}</h4>`;
d.onclick=()=>toggleWatchlist(m.title);
grid.appendChild(d);
});
}

function filterCategory(cat){
document.getElementById("sectionTitle").innerText=cat;
renderMovies(movies.filter(m=>m.cat===cat));
openPanel("home");
}

function searchMovies(){
const q=document.getElementById("search").value.toLowerCase();
renderMovies(movies.filter(m=>m.title.toLowerCase().includes(q)));
}

function toggleWatchlist(t){
watchlist.includes(t)?watchlist=watchlist.filter(x=>x!==t):watchlist.push(t);
localStorage.setItem("watchlist",JSON.stringify(watchlist));
alert("Watchlist updated");
}

function toggleBtn(btn){
btn.classList.toggle("on");
btn.innerText=btn.innerText==="ON"?"OFF":"ON";
}

function toggle2FA(btn){
btn.innerText=btn.innerText==="ON"?"OFF":"ON";
btn.classList.toggle("on");
}

function logout(){
localStorage.clear();
location.reload();
}

function onGoogleLogin(res){
const u=JSON.parse(atob(res.credential.split(".")[1]));
localStorage.setItem("user",JSON.stringify(u));
location.reload();
}

function init(){
const u=JSON.parse(localStorage.getItem("user"));
if(!u)return;
document.getElementById("authOverlay").style.display="none";
document.getElementById("username").innerText=u.name;
document.getElementById("email").innerText=u.email;
document.getElementById("avatar").src=u.picture;
document.getElementById("userIcon").innerHTML=`<img src="${u.picture}" style="width:100%;height:100%;border-radius:50%">`;
renderMovies(movies);
}
init();
