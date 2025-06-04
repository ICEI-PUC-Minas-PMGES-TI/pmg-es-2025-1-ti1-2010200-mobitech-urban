
const map = L.map('mapa').setView([-19.924475, -43.991426], 18);
const layer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
}).addTo(map);
const mapa = document.querySelector("#mapa");
const btnCriar = document.querySelector("#criarRota");
const btnSair = document.querySelector("#sairPopup");
const enderocoIncial = document.querySelector("#endInicial");
const enderecoFinal = document.querySelector("#endFinal");
let markers = {
    ponto1: L.marker([-19.924475, -43.991426],{
        opacity: 0
    }).addTo(map),
    ponto2: L.marker([-19.924475, -43.991420], {
        opacity: 0
    }).addTo(map)
};
let trajeto = null;
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

/*Precisa de ser melhorado*/
async function definirTrajeto(ev){
  
    let latlng = ev.latlng;
    let confirmacao = false;
    markers.ponto2.setOpacity(0);
      if (trajeto){
          map.removeControl(trajeto);
    }
    if (pontoCount === 1) {
         marcarMapa('ponto1', latlng);
        pontoCount = 2;
        confirmacao = await mostrarPopup(latlng);
        console.log(markers['ponto1'].getLatLng())
        if (confirmacao==true){
           
           const segundoPonto = await proximoPonto();
           pontoCount=1;
           marcarMapa('ponto2',segundoPonto);
           criarRota('ponto1','ponto2');
        } 
    }

    
}

function marcarMapa(id, latlng) {  
    markers[id].setLatLng(latlng);  
    markers[id].setOpacity(1);
}

function criarRota(marker1,marker2){

    trajeto = L.Routing.control({
        waypoints: [
            L.latLng(markers[marker1].getLatLng()),
            L.latLng(markers[marker2].getLatLng())
        ],
        routeWhileDragging: true,
        show:true
        }).addTo(map);
        infoRota()

}
async function getInfoRota(){
     let rota = null;
     let info = null;
     let nomeRota = null;
     let tempoTrajeto = null;
     await new Promise((resolve) => {
        trajeto.addEventListener('routesfound', function(event){
                 rota = event.routes;
                 info = rota[0].summary;
                 nomeRota = rota[0].name;   
                tempoTrajeto = info.totalTime;
                 resolve();
        });
    })
    return [tempoTrajeto,nomeRota];
}

async function infoRota(){
    let infos = await getInfoRota();
    console.log(infos)
    let tempo = 0;
    let enderoco = null
    for (let index = 0; index < infos.length; index++) {
            if (index == 0){
                tempo = infos[0];
            }
            if (index==1){
                enderoco = infos[1].split(", ");
            }
        
    }
    console.log(tempo);
    console.log(enderoco[0]);
    console.log(enderoco[1]);

}


map.on('click', function(ev){
    definirTrajeto(ev);
});

document.querySelector('.popup').addEventListener('click', function(e) {
    e.stopPropagation();
});


