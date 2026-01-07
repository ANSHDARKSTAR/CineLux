const movies = [
 {title:"Interstellar",cat:"scifi",img:"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"},
 {title:"Inception",cat:"action",img:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1"},
 {title:"Joker",cat:"drama",img:"https://images.unsplash.com/photo-1509248961158-e54f6934749c"},
 {title:"Batman",cat:"action",img:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb"}
];

const container = document.getElementById("movies");

function render(list){
 container.innerHTML = "";
 list.forEach(m=>{
  container.innerHTML += `
   <div class="movie">
     <img src="${m.img}">
     <h4>${m.title}</h4>
   </div>`;
 });
}

function showCategory(cat){
 if(cat==="all") render(movies);
 else render(movies.filter(m=>m.cat===cat));
}

function openAccount(){
 document.getElementById("accountModal").style.display="flex";
}

function closeAccount(){
 document.getElementById("accountModal").style.display="none";
}

function changePassword(){
 alert("Password change requires backend (Firebase / PHP)");
}

render(movies);