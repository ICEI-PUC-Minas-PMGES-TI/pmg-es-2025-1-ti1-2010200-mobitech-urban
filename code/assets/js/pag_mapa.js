import { cepService } from "./cep-service.js";
import { openStreet } from "./openStreet-service.js";

const map = L.map('mapa').setView([-19.924475, -43.991426], 16);
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
const btnOk = document.querySelector("#btnOk");
const servieCep = new cepService();
const coordsCep = new openStreet();
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

function handlePopupClick(e) {
    e.stopPropagation();
}
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
function mostrarInfo(){
      const show = document.querySelector('#infoOverlay');
      show.style.display = 'flex'

    
      
}
function ocultarPopup() {
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.style.display = 'none';
    });
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
        if (confirmacao==false){
            document.querySelector('.popup').removeEventListener('click', handlePopupClick);
            pontoCount = 1; 
            markers.ponto1.setOpacity(0); 
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
        lineOptions: {
            styles: [
                {
                    className: 'rota'            
                        
                }
            ]
        }
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

    
    coordenadasCep(bairro,cidade,uf);
}
async function coordenadasCep(bairro,cidade,uf) {
    let coordInfos = await coordsCep.getCord(bairro,cidade,uf);
   
    let bairroCord = coordInfos[0];
    

    marcarArea([parseFloat(bairroCord.lat),parseFloat(bairroCord.lon)])
}

function marcarArea(latlng){
    let latlon = latlng;
    

    L.circle([latlon[0], latlon[1]], {
        radius: 1000,
        color:'blue'
    
    }).addTo(map);
}

function localizacaoUsuario(){
L.control.locate({
    drawCircle: false,     
    drawMarker: false,    
    showPopup: false,     
    setView: 'once',       
    keepCurrentZoomLevel: true 
}).addTo(map);
    map.locate({
        setView: true,
        watch: false, 
        maxZoom: 16
    });
}

map.on('click', function(ev){
    removerMapaInfos();
    definirTrajeto(ev);
});

async function marcarEnchentesAtivas() {
    try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) return;
        const posts = await response.json();
        // Filtrar posts de enchente ativos
        const enchentesAtivas = posts.filter(post =>
            post.problemTypes && post.problemTypes.includes('Enchente') && post.floodNow === 'Sim' && post.address
        );
        for (const post of enchentesAtivas) {
            // Verifica se o post tem menos de 2 horas
            const postDate = new Date(post.date);
            const now = new Date();
            const diffMs = now - postDate;
            const twoHoursMs = 2 * 60 * 60 * 1000;
            if (diffMs > twoHoursMs) continue; // Não mostrar se já passou de 2h
            try {
                const coords = await coordsCep.getCord(post.address, 'Belo Horizonte', 'MG');
                if (coords && coords[0]) {
                    const circle = L.circle([parseFloat(coords[0].lat), parseFloat(coords[0].lon)], {
                        radius: 1000,
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.4
                    }).addTo(map).bindPopup('Enchente ativa nesta região!');
                    // Remover o círculo após o tempo restante até completar 2h
                    setTimeout(() => {
                        map.removeLayer(circle);
                    }, twoHoursMs - diffMs);
                }
            } catch (e) {
                // Falha ao geocodificar, ignora
            }
        }
    } catch (e) {
        // Falha ao buscar posts
    }
}
function criarLegenda() {
    const legenda = L.control({position: 'topleft'});
    
    legenda.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legenda-alerta');
        div.innerHTML = `
            <div class="legenda-item">
                <div class="circulo-azul"></div>
                <span>Área de alerta</span>
            </div>
        `;
        return div;
    };
    
    legenda.addTo(map);
}
window.addEventListener('load', function(){
    mostrarInfo();
    localizacaoUsuario();
    marcarEnchentesAtivas();
    criarLegenda();
});
document.querySelector('.popup').addEventListener('click', function(e) {
    e.stopPropagation();
});
document.querySelector('.infoPopupOverlay').addEventListener('click', function(e) {
    e.stopPropagation();
});
btnOk.addEventListener('click', function(){
     document.querySelector('.infoPopupOverlay').removeEventListener('click', handlePopupClick);
    ocultarPopup();
})

