
const map = L.map('mapa').setView([-19.924475, -43.991426], 18);
const layer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
}).addTo(map);
let markers = {
    ponto1: L.marker([-19.924475, -43.991426]).addTo(map),
    ponto2: L.marker([-19.924475, -43.991420], {
        opacity: 0
    }).addTo(map)
};
const mapa = document.querySelector("#mapa");
const btnCriar = document.querySelector("#criarRota");
const btnSair = document.querySelector("#sairPopup");
let pontoCount = 1;


function mostrarPopup(coordenadas) {
    const overlay = document.getElementById('popupOverlay');
    overlay.style.display = 'flex';
    
    if(coordenadas) {
        document.getElementById('popupCoords').textContent = 
            `Localização: ${coordenadas.lat.toFixed(6)}, ${coordenadas.lng.toFixed(6)}`;
    }
     return new Promise((resolve) => {
        btnCriar.onclick = () => {
            ocultarPopup();
            resolve(true);
        };

        btnSair.onclick = () => {
            ocultarPopup();
            resolve(false);
        };
    });
}
function ocultarPopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.style.display = 'none';
}

async function definirTrajeto(ev){
    let latlng = ev.latlng;
    let confirmacao = false;
    if (pontoCount === 1) {
        alert('a')
         marcarMapa('ponto1', latlng);
        confirmacao = await mostrarPopup(latlng);
    }
    if (confirmacao==true){
        await map.on('click', function(ev){
            marcarMapa('ponto2',ev.latlng);
        });
    } 

    
}

function marcarMapa(id, latlng) {  
    markers[id].setLatLng(latlng);  
    markers[id].setOpacity(1);
}

// function regiaoAlerta(){

// }




map.on('click', function(ev){
    definirTrajeto(ev);
});

document.querySelector('.popup').addEventListener('click', function(e) {
    e.stopPropagation();
});
