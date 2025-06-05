import { cepService } from "../services/cep-service.js";
import { findCoords } from "../services/openStreet-service.js";

const map = L.map('mapa').setView([-19.924475, -43.991426], 18);
const layer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
}).addTo(map);
const mapa = document.querySelector("#mapa");
const btnCriar = document.querySelector("#criarRota");
const btnSair = document.querySelector("#sairPopup");
const enderocoIncial = document.querySelector("#endInicial");
const enderecoFinal = document.querySelector("#endFinal");
const motoInfo = document.querySelector("#infoMoto");
const carroInfo = document.querySelector("#infoCarro");
const onibusInfo = document.querySelector("#infoOnibus");
const andarInfo = document.querySelector("#infoAndar");
const infoMap = document.querySelector(".mapa-infos");
const servieCep = new cepService();
const coordsCep = new findCoords();
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
        show:false,
        }).addTo(map);
        infoRota()

}
function adicionarMapaInfos() {
    const mapInfos = infoMap;
    mapInfos.classList.toggle('visible');
}
function removerMapaInfos(){
    const mapInfos = infoMap;
    mapInfos.classList.remove('visible');
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
    
    let tempoMin = Math.round(tempo/60)
    
    const endInicial = enderocoIncial
    endInicial.textContent = `${enderoco[0]}`
    const endFinal = enderecoFinal
    endFinal.textContent = `${enderoco[1]}`
    const infoMoto = motoInfo
    infoMoto.textContent = `${Math.round(tempoMin*0.8)} min`
    const infoCarro = carroInfo
    infoCarro.textContent = `${Math.round(tempoMin)} min`
    const infoOnibus = onibusInfo
    infoOnibus.textContent = `${Math.round(tempoMin*1.4)} min`
    const infoAndar = andarInfo
    infoAndar.textContent = `${Math.round(tempoMin*5.5)} min`
    adicionarMapaInfos();
}
function carregarAreas(){
    /*implementar*/
    
}
async function rastrearCep(cep){

    let cepInfo = await servieCep.getALL(cep);
    let bairro = cepInfo.bairro;
    let cidade = cepInfo.cidade;
    let uf = cepInfo.uf;

    console.log(cepInfo);
    coordenadasCep(bairro,cidade,uf);
}
async function coordenadasCep(bairro,cidade,uf) {
    let coordInfos = await coordsCep.getCord(bairro,cidade,uf);
    console.log(coordInfos);
    let bairroCord = coordInfos[0];
    console.log("lat: " + parseFloat(bairroCord.lat));
    console.log("lon: " +parseFloat(bairroCord.lon));

    marcarArea([parseFloat(bairroCord.lat),parseFloat(bairroCord.lon)])
}

function marcarArea(latlng){
    let latlon = latlng;
    console.log(latlon);

    L.circle([latlon[0], latlon[1]], {
        radius: 500,
        color:'blue'
    
    }).addTo(map);
}

map.on('click', function(ev){
    removerMapaInfos();
    definirTrajeto(ev);
   
});

document.querySelector('.popup').addEventListener('click', function(e) {
    e.stopPropagation();
});


