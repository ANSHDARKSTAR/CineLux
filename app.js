const movies=[
 {t:"Interstellar",c:"scifi",i:"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"},
 {t:"Inception",c:"action",i:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1"},
 {t:"Joker",c:"drama",i:"https://images.unsplash.com/photo-1509248961158-e54f6934749c"},
 {t:"Batman",c:"action",i:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb"}
];

const auth=document.getElementById("auth");
const app=document.getElementById("app");

function login(){
 localStorage.setItem("user","demo");
 auth.style.display="none";
 app.style.display="block";
 loadMovies();
}

function googleLogin(){
 login(); // demo
}

function toggleAuth(){
 alert("Signup UI coming next step");
}

function loadMovies(){
 render("trending",movies);
 render("action",movies.filter(m=>m.c==="action"));
 render("scifi",movies.filter(m=>m.c==="scifi"));
}

function render(id,list){
 document.getElementById(id).innerHTML=
 list.map(m=>`
  <div class="movie">
   <img src="${m.i}">
  </div>
 `).join("");
}

function openAccount(){
 document.getElementById("account").style.display="flex";
}
function closeAccount(){
 document.getElementById("account").style.display="none";
}
function logout(){
 localStorage.clear();
 location.reload();
}

if(localStorage.getItem("user")){
 auth.style.display="none";
 app.style.display="block";
 loadMovies();
}