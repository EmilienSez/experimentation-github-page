// Définition des variables : 
const url = "https://api-adresse.data.gouv.fr/search/?q=";
const urlDPETertiairev2 = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-tertiaire-2/lines?select=*&q=";
const urlDPETertiairev1 ="https://data.ademe.fr/data-fair/api/v1/datasets/dpe-tertiaire/lines?select=*&q=";
const urlDPENeufv2 = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe02neuf/lines?select=*&q=";
const urlDPEExistantv2 = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines?select=*&q=";
// const urlDPEExistantv1 = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-france/lines?select=*&q="


let button = document.getElementById('boutonMyForm');
// let buttonDlCsv = document.getElementById('BoutonTelechargerCsv');
// let realBoutonTelechargerCsv = document.getElementById('realBoutonTelechargerCsv');
let input = document.getElementById('myInput');

// Menue de paramètrage : 
let classBoutonActiver = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center h-10 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
let classBoutonDesactiver = "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
let boutonDPETertiaire = document.getElementById('boutonDPETertiaire');
let boutonLogementNeuf = document.getElementById('boutonLogementNeuf');
let boutonLogementExistant = document.getElementById('boutonLogementExistant');
let boutonAvant2021 = document.getElementById('boutonAvant2021');
let boutonApres2021 = document.getElementById('boutonApres2021');

// Par défault : 
boutonDPETertiaire.className = classBoutonActiver
boutonLogementNeuf.className = classBoutonDesactiver
boutonLogementExistant.className = classBoutonDesactiver
boutonAvant2021.className = classBoutonDesactiver
boutonApres2021.className = classBoutonActiver
let typeAPI = 1
let periodeAPI = 2

// Les informations : 
let cardContainer = document.getElementById('cardContainer');
let enfantcardContainer = document.getElementById('centrerLesCartes');
let cardAdresse = document.getElementById('carteAdresse');
let label = document.getElementById('label_adr');
let score = document.getElementById('score_adr');
let city = document.getElementById('city_adr');
let housenumber = document.getElementById('housenumber_adr');
let street = document.getElementById('street_adr');
let context = document.getElementById('context_adr');

// Gestion de la recherche Unique : 
let globalData = [];
cardContainer.innerHTML = '';
// buttonDlCsv.style.display = 'none';
// realBoutonTelechargerCsv.disabled = 'true'
// realBoutonTelechargerCsv.className = "text-white bg-grey-600 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-10 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-full cursor-not-allowed";

// Gestion de la recherche avec Dépôt de document :
// let formUploadCsv = document.getElementById('myFormCsv');
// formUploadCsv.action = "/dpe/upload_csv/";

// Fonction pour calculer une le changement de la couleur :
function interpolateColor(color1, color2, factor) {
  const result = color1.slice(); // Clone la couleur de départ
  for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

// Récupérer la couleur en fonction du score de correspondance BANO
function getColor(randomValue) {
  const colors = [
      [202, 65, 19],      // rgba(202, 65, 19, 1)
      [202, 118, 34],     // rgba(202, 118, 34, 1)
      [217, 175, 52],     // rgba(217, 175, 52, 1)
      [230, 213, 93],     // rgba(230, 213, 93, 1)
      [147, 176, 32],     // rgba(147, 176, 32, 1)
      [75, 114, 33]       // rgba(75, 114, 33, 1)
  ];
  // Déterminer entre quelles couleurs nous interpolons
  const index1 = Math.floor(randomValue * (colors.length - 1));
  const index2 = index1 + 1 < colors.length ? index1 + 1 : index1;

  // Calculer le facteur d'interpolation
  const factor = (randomValue * (colors.length - 1)) - index1;

  // Interpoler entre les deux couleurs
  const interpolatedColor = interpolateColor(colors[index1], colors[index2], factor);

  // Retourner la couleur au format rgba
  return `rgba(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]}, 1)`;
}

function downloadCSV() {

  // Envoyer les données à une vue Django
  fetch('/dpe/download_file/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') // getCSRFToken(), // getCookie('csrftoken')  // Assurez-vous d'envoyer le token CSRF si nécessaire
      },
      body: JSON.stringify(globalData)
  })
  .then(response => response.blob())
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';  // Nom du fichier
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Nettoyer
      // window.URL.revokeObjectURL(url); // Libérer l'URL
  })
  .catch(error => {
      console.error('Erreur:', error);
  });
}

// Fonction pour obtenir le token CSRF
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Vérifiez si ce cookie commence par le nom que nous voulons
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// Fonction pour obtenir le token CSRF
function getCSRFToken() {
  return document.querySelector("meta[name='csrf-token']").getAttribute("content");
}

// Fonction pour sélectionner l'API :
function getChoixAPI(typeAPIf, periodeAPIf, geo_idf) {
  if (typeAPIf === 1 && periodeAPIf === 1) {
    urlGetf = `${urlDPETertiairev1}${geo_idf}&q_modr=simple&q_fields=geo_id`
  } else if (typeAPIf === 1 && periodeAPIf === 2) {
    urlGetf = `${urlDPETertiairev2}${geo_idf}&q_modr=simple&q_fields=Identifiant__BAN`
  } else if (typeAPIf === 2 && periodeAPIf === 2) {
    urlGetf = `${urlDPENeufv2}${geo_idf}&q_modr=simple&q_fields=Identifiant__BAN`
  } else if (typeAPIf === 3 && periodeAPIf === 2) {
    urlGetf = `${urlDPEExistantv2}${geo_idf}&q_modr=simple&q_fields=Identifiant__BAN`
  }
  return urlGetf
} 

// Fonction pour aller récupérer les adresses en fonction de la saisie de l'utilisateur : 
async function getInfoAdresse(adresse) {
    let urlGet = `${url}${adresse}`
    const requete = await fetch(urlGet, {
        method: 'GET'
      });
    
    if(!requete.ok) {
        alert('Un problème est survenu, veuillez réessayer plus tard');
    } else {
        cardContainer.innerHTML = '';
        let donnees = await requete.json();
        globalData.push(donnees)
        for (let index = 0; index < donnees.features.length; index++) {

          // Créer des éléments de la nouvelle Carte : 
          const cardDiv1 = document.createElement('div');
          const cardDiv2 = document.createElement('div');
          const cardA = document.createElement('a');
          const cardH5 = document.createElement('h5');
          const cardPScore = document.createElement('p');
          const cardPCity = document.createElement('p');
          const cardPContext = document.createElement('p');
          const br = document.createElement('br');

          // Changement des classes :
          cardDiv1.className = "flex justify-center"
          cardDiv2.className = "w-full max-w-7xl px-7"
          cardA.className = "block p-6 border border-black-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
          cardDiv2.id = `carte_numero_${index}`;
          cardH5.className = "mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white texteQuiDépassePas";
          cardPScore.className = "font-normal text-gray-700 dark:text-gray-400 texteQuiDépassePas";
          cardPCity.className = "font-normal text-gray-700 dark:text-gray-400 texteQuiDépassePas";
          cardPContext.className = "font-normal text-gray-700 dark:text-gray-400 texteQuiDépassePas";
          
          // Changement du style : 
          const CouleurCarte = getColor(Number(donnees.features[index].properties.score));
          cardA.style.backgroundColor = CouleurCarte;
          
          // Changement des informations : 
          cardH5.textContent = `Adresse : ${donnees.features[index].properties.label}`;
          cardPScore.textContent = `Score Correspondance : ${Math.round(donnees.features[index].properties.score*100)/100} |    Type d'adresse : ${donnees.features[index].properties.type}`;
          cardPCity.textContent = `Numéro de Voie : ${donnees.features[index].properties.housenumber} | Voie : ${donnees.features[index].properties.street} | Ville : ${donnees.features[index].properties.city}`;
          cardPContext.textContent = `Département & Région : ${donnees.features[index].properties.context}`;
          
          // Création de la carte : 
          cardA.appendChild(cardH5);
          cardA.appendChild(cardPScore);
          cardA.appendChild(cardPCity);
          cardA.appendChild(cardPContext);

          cardDiv2.appendChild(cardA);
          cardDiv2.appendChild(br);
          cardDiv1.appendChild(cardDiv2);

          // Ajouter la Carte au conteneur :
          cardContainer.appendChild(cardDiv1);

          // Lancement du second traitement : 
          getInfoDPE(index, donnees.features[index].properties.id);
        };
      // buttonDlCsv.style.display = 'block';
      // ActiverBouton();
    }
};


// Fonction pour aller récupérer les DPE associé au geo_id
async function getInfoDPE(numero_id, geo_id) {
  let urlGet = getChoixAPI(typeAPI, periodeAPI, geo_id)
  // console.log(typeAPI)
  // console.log(periodeAPI)
  // console.log(geo_id)
  // console.log(urlGet)
  const requete = await fetch(urlGet, {
      method: 'GET'
    });
    
  if(!requete.ok) {
      alert('Un problème est survenu, veuillez réessayer plus tard');
  } else {
      let donnees = await requete.json();
      // globalData.push(donnees);
      sauvegarderDonnees(donnees)
      // console.log(`dpe stockées :  ${donnees.total}`)
      // console.log(Object.keys(donnees.results[0]))
      for (let index = 0; index < donnees.total; index++) {
        // Récupération de la carte pour ajout : 
        let carteActuelle = document.getElementById(`carte_numero_${numero_id}`);
        // Création des informations des DPE :
        const cardDivDPE = document.createElement('div'); 
        const cardADPE = document.createElement('a'); 
        const cardH7 = document.createElement('h7');
        const cardPEtiquetteDPE = document.createElement('p');
        const cardPEtiquetteGES = document.createElement('p');
        const cardPAdresseBrut = document.createElement('p');

        // Changement des classes pour Front : 
        cardDivDPE.className = "w-full max-w-6xl px-7"
        cardADPE.className = "block p-2 border border-black-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        cardADPE.id=`carte_numero_dpe_${index}`
        cardH7.className = "mb-2 text-1xl font-bold tracking-tight text-gray-800 dark:text-white texteQuiDépassePas";
        cardPEtiquetteDPE.className = "font-normal text-gray-700 dark:text-gray-400 texteQuiDépassePas";
        cardPEtiquetteGES.className = "font-normal text-gray-700 dark:text-gray-400 texteQuiDépassePas";
        cardPAdresseBrut.className = "font-normal text-gray-700 dark:text-gray-400 texteQuiDépassePas";

        // Changement du style : 
        const CouleurCarte = getColor(Number(donnees.results[index]["Score_BAN"]));
        cardADPE.style.backgroundColor = CouleurCarte;

        // Changement du texte : 
        cardH7.textContent = `DPE n°${index+1} : ${donnees.results[index]["N°DPE"]} | Score BANO DPE : ${donnees.results[index]["Score_BAN"]}`;
        cardPEtiquetteDPE.textContent = `Etiquette DPE : ${donnees.results[index]["Etiquette_DPE"]} | Consommation énergétique : ${donnees.results[index]["Conso_kWhep/m²/an"]}`;
        cardPEtiquetteGES.textContent = `Etiquette GES : ${donnees.results[index]["Etiquette_GES"]} | Emission GES : ${donnees.results[index]["Emission_GES_kgCO2/m²/an"]}`;
        cardPAdresseBrut.textContent = `Adresse Brut : ${donnees.results[index]["Adresse_brute"]}, ${donnees.results[index]["Nom__commune_(Brut)"]} ${donnees.results[index]["Code_postal_(brut)"]}`;

        // Ajout à la carte : 
        cardADPE.appendChild(cardH7);
        cardADPE.appendChild(cardPEtiquetteDPE);
        cardADPE.appendChild(cardPEtiquetteGES);
        cardADPE.appendChild(cardPAdresseBrut);

        cardDivDPE.appendChild(cardADPE);
        carteActuelle.appendChild(cardADPE);
        // console.log(globalData.length)
        // console.log(globalData)
      }
  }
};

// Fonction pour bien enregistrer les données dans le bon ordre
function sauvegarderDonnees(data) {

  const promesse = new Promise((resolve, reject) =>{
    setTimeout(() => resolve(globalData.push(data)), 3000);

  })
  // console.log("Données Poussée")
}

// Fonction pour bien enregistrer les données dans le bon ordre
// function ActiverBouton() {

//   const promesse = new Promise((resolve, reject) =>{
//     setTimeout(() => resolve(realBoutonTelechargerCsv.disabled = false), 3000);
//     setTimeout(() => realBoutonTelechargerCsv.className = "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-10 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 w-full", 4000);
//   })
//   // console.log("Données Poussée")
// }

// Ecouteur d'événement : 
button.addEventListener('click', (e) => {
  globalData = []
  let valueSend = input.value
  valueSend = valueSend.replaceAll(","," ").toLowerCase();
  valueSend = valueSend.replaceAll(" ","+");
  valueSend = valueSend.replaceAll("-","+");
  valueSend = valueSend.replaceAll("++","+");
  // console.log(valueSend);
  if(isNaN(valueSend) == true && valueSend.length < 150) {
    getInfoAdresse(valueSend)
  } else {
    alert("Veuillez saisir une adresse correcte");
  }
})
;

// buttonDlCsv.addEventListener('click', (e) => {
//   // console.log(globalData)
//   downloadCSV()
// });

// Partie bouton de paramètrage : 
boutonDPETertiaire.addEventListener('click', (e) => {
  if (boutonDPETertiaire.className != classBoutonActiver) {
    boutonLogementNeuf.className = classBoutonDesactiver;
    boutonLogementExistant.className = classBoutonDesactiver;
    boutonDPETertiaire.className = classBoutonActiver;
    typeAPI = 1;
    boutonAvant2021.style.display = 'block';
  } 
})

boutonLogementNeuf.addEventListener('click', (e) => {
  if (boutonLogementNeuf.className != classBoutonActiver) {
    boutonDPETertiaire.className = classBoutonDesactiver;
    boutonLogementExistant.className  = classBoutonDesactiver;
    boutonLogementNeuf.className  = classBoutonActiver;
    boutonAvant2021.style.display = 'none';
    boutonAvant2021.className = classBoutonDesactiver;
    boutonApres2021.className  = classBoutonActiver;
    periodeAPI = 2;
    typeAPI = 2;
  } 
})

boutonLogementExistant.addEventListener('click', (e) => {
  if (boutonLogementExistant.className != classBoutonActiver) {
    boutonDPETertiaire.className = classBoutonDesactiver;
    boutonLogementNeuf.className  = classBoutonDesactiver;
    boutonLogementExistant.className  = classBoutonActiver;
    boutonLogementExistant.className  = classBoutonActiver;
    boutonAvant2021.style.display = 'none';
    boutonAvant2021.className = classBoutonDesactiver;
    boutonApres2021.className  = classBoutonActiver;
    periodeAPI = 2;
    typeAPI = 3;
  } 
})

boutonAvant2021.addEventListener('click', (e) => {
  if (boutonAvant2021.className != classBoutonActiver) {
    boutonApres2021.className = classBoutonDesactiver;
    boutonAvant2021.className  = classBoutonActiver;
    periodeAPI = 1;
  } 
})

boutonApres2021.addEventListener('click', (e) => {
  if (boutonApres2021.className != classBoutonActiver) {
    boutonAvant2021.className = classBoutonDesactiver;
    boutonApres2021.className  = classBoutonActiver;
    periodeAPI = 2;
  } 
})


// Pour les tests : 5 Rue Louis-Jacques Daguerre 35136 Saint-Jacques-de-la-Lande