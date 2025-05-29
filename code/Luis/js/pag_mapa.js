
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
    const overlay = document.querySelector('#popupOverlay');
    overlay.style.display = 'flex';
    
    if(coordenadas) {
        document.querySelector('#popupCoords').textContent = 
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
    const overlay = document.querySelector('#popupOverlay');
    overlay.style.display = 'none';
}

function proximoPonto(){
    return new Promise((resolve) => {
        map.once('click', function(ev){
            resolve(ev.latlng);
        });
    })
}
async function definirTrajeto(ev){
    let latlng = ev.latlng;
    let confirmacao = false;
    markers.ponto2.setOpacity(0);
    if (pontoCount === 1) {
         marcarMapa('ponto1', latlng);
        pontoCount = 2;
        confirmacao = await mostrarPopup(latlng);

        if (confirmacao==true){
          
           const segundoPonto = await proximoPonto();
           pontoCount=1;
           marcarMapa('ponto2',segundoPonto);
           
        } 
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
