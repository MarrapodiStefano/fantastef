document.addEventListener("DOMContentLoaded", function(){

const menuHTML = `

<div id="menuOverlay" class="menu-overlay"></div>

<div id="sideMenu" class="side-menu">

<div class="menu-header">
FantaStef
<span onclick="closeMenu()">✕</span>
</div>

<div class="menu-item" onclick="alert('Assistente FantaStef in arrivo')">
Chiedilo a FantaStef
</div>

<div class="menu-item" onclick="window.open('https://youtube.com/@fantastef976')">
Seguimi su YouTube
</div>

<div class="menu-item" onclick="location.href='mailto:info@fantastef.it'">
Contattami
</div>

<div class="menu-item" onclick="location.href='mailto:info@fantastef.it?subject=Segnalazione Bug FantaStef'">
Segnala Bug
</div>

<div class="menu-item" onclick="window.location.href='privacy.html'">
Privacy
</div>

</div>

`;

document.body.insertAdjacentHTML("beforeend", menuHTML);

document.getElementById("menuOverlay").addEventListener("click", function(e){
e.stopPropagation();
closeMenu();
});

});

function openMenu(){

document.getElementById("sideMenu").classList.add("active");
document.getElementById("menuOverlay").classList.add("active");

}

function closeMenu(){

document.getElementById("sideMenu").classList.remove("active");
document.getElementById("menuOverlay").classList.remove("active");

}
