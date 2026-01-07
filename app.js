const panels=document.querySelectorAll(".panel");
const sidebar=document.getElementById("sidebar");

const movies=[
{title:"Interstellar",cat:"Sci-Fi",img:"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"},
{title:"Inception",cat:"Action",img:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1"},
{title:"Joker",cat:"Drama",img:"https://images.unsplash.com/photo-1509248961158-e54f6934749c"}
];

function openPanel(id){
panels.forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
sidebar.classList.remove("show");
}

function toggleMenu(){
sidebar.classList.toggle("show");
}

function renderMovies(list){
const grid=document.getElementById("movieGrid");
grid.innerHTML=list.map(m=>`
<div class="movie">
<img src="${m.img}">
<h4 style="padding:10px">${m.title}</h4>
</div>`).join("");
}

function filterCategory(cat){
renderMovies(movies.filter(m=>m.cat===cat));
openPanel("home");
}

function searchMovies(){
const q=document.getElementById("search").value.toLowerCase();
renderMovies(movies.filter(m=>m.title.toLowerCase().includes(q)));
}

function toggleBtn(btn){
btn.classList.toggle("on");
btn.textContent=btn.textContent==="ON"?"OFF":"ON";
}

function toggleTheme(btn){
document.body.style.background=
document.body.style.background==="white"?"#050505":"white";
toggleBtn(btn);
}

function toggleAnimations(btn){
document.body.style.transition=
btn.textContent==="OFF"?"none":".3s";
toggleBtn(btn);
}

function changePassword(){
const p=document.getElementById("newPass").value;
if(p.length<6){alert("Password too short");return;}
localStorage.setItem("password",p);
alert("Password changed (demo)");
}

function demoLogin(){
localStorage.setItem("user","demo");
document.getElementById("authOverlay").style.display="none";
renderMovies(movies);
}

function logout(){
localStorage.clear();
location.reload();
}

if(localStorage.getItem("user")){
document.getElementById("authOverlay").style.display="none";
renderMovies(movies);
}