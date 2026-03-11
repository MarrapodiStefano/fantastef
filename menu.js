document.addEventListener("DOMContentLoaded", function(){

const menuHTML = `

<div id="sideMenu" class="side-menu">

<div class="menu-header">
FantaStef
<span onclick="closeMenu()">✕</span>
</div>

<div class="menu-item" onclick="alert('Funzione in arrivo')">
Chiedilo a FantaStef
</div>

<div class="menu-item" onclick="location.href='mailto:info@fantastef.it'">
Contattami
</div>

<div class="menu-item" onclick="location.href='mailto:info@fantastef.it?subject=Segnalazione Bug FantaStef'">
Segnala Bug
</div>

<div class="menu-item" onclick="window.open('https://youtube.com/@fantastef976')">
Seguimi su YouTube
</div>

</div>

`;

document.body.insertAdjacentHTML("beforeend", menuHTML);

});

function openMenu(){
document.getElementById("sideMenu").classList.add("active");
}

function closeMenu(){
document.getElementById("sideMenu").classList.remove("active");
}