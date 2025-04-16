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
let classBoutonActiver = "w-60 h-13 text-lg text-center mb-2 mt-2 px-2 py-2 border-4 border-yellow-400 text-gray-700 bg-yellow-400 rounded-xl hover:bg-yellow-400 transition";
let classBoutonDesactiver = "w-60 h-13 text-lg text-center mb-2 mt-2 px-2 py-2 border-4 border-yellow-400 text-gray-700 bg-[#fffade] rounded-xl hover:bg-yellow-400 transition";
let classLignePSimple = "block text-black-500 text-lg break-words line-clamp-1"
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
      // console.log(donnees);
      // globalData.push(donnees);
      // sauvegarderDonnees(donnees)
      // console.log(`dpe stockées :  ${donnees.total}`)
      // console.log(Object.keys(donnees.results[0]))
      for (let index = 0; index < donnees.total; index++) {
        // Récupération de la carte pour ajout : 
        let carteActuelle = document.getElementById(`carte_numero_${numero_id}`);
        // Lancement des DPE
        carteDPE = creationCarteDPE2(donnees, index);
        carteActuelle.appendChild(carteDPE);
      }
  }
};

// Fonction pour ajouter une carte DPE
function creationCarteDPE1(donnees, index) { 
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
  return cardDivDPE
  // console.log(globalData.length)
  // console.log(globalData)
};

// Fonction pour ajouter une carte DPE
function creationCarteDPE2(donnees, index) { 

  // Création des informations des DPE :
  const cardDivDPEEnglobe = document.createElement('div');
  const cardDivDPECarte = document.createElement('div');  
  const cardH1Titre = document.createElement('h1');  
  const cardDivDPEObjet = document.createElement('div');
  const cardImgDPE = document.createElement('img'); 
  const cardDivDPEDoneesSaisie = document.createElement('div');
  const cardDivDPEDoneesVerif = document.createElement('div');
  const cardPTitreDoneesSaisie = document.createElement('p');
  const cardPEtiquetteDPE = document.createElement('p');
  const cardPEtiquetteGES = document.createElement('p');
  const cardPDateEtablissement = document.createElement('p');
  const cardPMethodeDPE = document.createElement('p');
  const cardPSecteurActivite = document.createElement('p');
  const cardPAnneeConstruction = document.createElement('p');
  const cardPSurfaceShon = document.createElement('p');
  const cardPSurfaceUtile = document.createElement('p');

  // Changement des classes pour Front : 
  cardDivDPEEnglobe.className = "mt-8 flex justify-center"
  cardDivDPECarte.className = "bg-[#a5b68d] rounded-2xl overflow-hidden shadow-md flex flex-col p-2 w-auto h-auto border-4 border-[#fffade]"
  cardDivDPECarte.id=`carte_numero_dpe_${index}`
  cardH1Titre.className = "text-center font-bold text-2xl mb-2"
  cardDivDPEObjet.className = "flex items-center"
  cardImgDPE.className = "w-16 h-16 mr-2 object-cover hidden sm:block"
  cardDivDPEDoneesSaisie.className ="bg-[#fffade] rounded-2xl overflow-hidden flex-1 items-center p-2 border-2 border-yellow-400"
  cardDivDPEDoneesVerif.className = "m-2 flex-1"
  cardPTitreDoneesSaisie.className = "text-center font-bold text-2xl mb-2"
  cardPEtiquetteDPE.className = classLignePSimple
  cardPEtiquetteGES.className = classLignePSimple
  cardPDateEtablissement.className = classLignePSimple
  cardPMethodeDPE.className = classLignePSimple
  cardPSecteurActivite.className = classLignePSimple
  cardPAnneeConstruction.className = classLignePSimple
  cardPSurfaceShon.className = classLignePSimple
  cardPSurfaceUtile.className = classLignePSimple
  // Changement du style : 
  const CouleurCarte = getColor(Number(donnees.results[index]["Score_BAN"]));
  cardDivDPECarte.style.backgroundColor = CouleurCarte;

  // Source de l'image :
  cardImgDPE.src = "../static/DPE.png"

  // Changement du texte :
  cardH1Titre.textContent = `DPE n°${index+1} : ${donnees.results[index]["Score_BAN"]} - ${donnees.results[index]["Adresse_brute"]}, ${donnees.results[index]["Nom__commune_(Brut)"]} ${donnees.results[index]["Code_postal_(brut)"]}`;
  cardPTitreDoneesSaisie.textContent = `N° ADEME : ${donnees.results[index]["N°DPE"]}`;
  cardPEtiquetteDPE.textContent = `Etiquette DPE : ${donnees.results[index]["Etiquette_DPE"]} - ${donnees.results[index]["Conso_kWhep/m²/an"]} kWhep/m²/an`;
  cardPEtiquetteGES.textContent = `Etiquette GES : ${donnees.results[index]["Etiquette_GES"]} - ${donnees.results[index]["Emission_GES_kgCO2/m²/an"]} kgCO2/m²/an`;
  cardPDateEtablissement.textContent = `Date DPE : ${donnees.results[index]["Date_établissement_DPE"]}`;
  cardPMethodeDPE.textContent = `Méthode du DPE : ${donnees.results[index]["Méthode_du_DPE"]}`;
  let anneeConstruction;
  if (!donnees.results[index]["Année_construction"]) {
    anneeConstruction = donnees.results[index]["Période_construction"];
  } else {
    anneeConstruction = donnees.results[index]["Année_construction"];
  };

  cardPSecteurActivite.textContent = `Secteur d'activité : ${donnees.results[index]["Secteur_activité"]}`;
  cardPAnneeConstruction.textContent = `Année de construction : ${anneeConstruction}`;
  cardPSurfaceShon.textContent = `Surface SHON : ${donnees.results[index]["Surface_(SHON)"]}`;
  cardPSurfaceUtile.textContent = `Surface Utile : ${donnees.results[index]["Surface_utile"]}`;
cardDivDPEDoneesVerif.appendChild(cardPMethodeDPE);
  // Ajout à la carte (div de vérif) : 
  cardDivDPEDoneesVerif.appendChild(cardPSecteurActivite);
  cardDivDPEDoneesVerif.appendChild(cardPAnneeConstruction);
  cardDivDPEDoneesVerif.appendChild(cardPSurfaceShon);
  cardDivDPEDoneesVerif.appendChild(cardPSurfaceUtile);

  // Ajout à la carte (div de saisie) : 
  cardDivDPEDoneesSaisie.appendChild(cardPTitreDoneesSaisie);
  cardDivDPEDoneesSaisie.appendChild(cardPEtiquetteDPE);
  cardDivDPEDoneesSaisie.appendChild(cardPEtiquetteGES);
  cardDivDPEDoneesSaisie.appendChild(cardPDateEtablissement);

  // Ajout à la carte d'objet : 
  cardDivDPEObjet.appendChild(cardImgDPE);
  cardDivDPEObjet.appendChild(cardDivDPEDoneesSaisie);
  cardDivDPEObjet.appendChild(cardDivDPEDoneesVerif);

  // Ajout à la carte plus globale :
  cardDivDPECarte.appendChild(cardH1Titre);
  cardDivDPECarte.appendChild(cardDivDPEObjet);

  // Ajout au conteneur :
  cardDivDPEEnglobe.appendChild(cardDivDPECarte)
  return cardDivDPEEnglobe
  // console.log(globalData.length)
  // console.log(globalData)
};


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