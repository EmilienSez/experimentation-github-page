// Récupération des éléments du DOM : 
const url = "https://recherche-entreprises.api.gouv.fr/search?q=";
const urlBANO = "https://api-adresse.data.gouv.fr/search/?q=";
let input = document.getElementById('myInput');
let boutonLancerRechercheUnique = document.getElementById('lancer-recherche');
let boutonLancerTraitement = document.getElementById('lancer-traitement');
let boutonTelecharger = document.getElementById('download-csv');
let conteneurOutput = document.getElementById('conteneur-output');


// Définition des variables : 
let classBoutonActiver = "w-70 p-3 shadow-md text-lg text-center border-3 border-yellow-400 text-gray-700 bg-[#fffade] rounded-xl hover:bg-yellow-400 transition";
let classBoutonDesactiver ="w-70 p-3 shadow-md bg-[#DBDBDB] hover:text-white text-lg text-center border-3 border-gray-500 focus:ring-4 hover:bg-gray-500 text-lg rounded-xl inline-flex transition items-center cursor-not-allowed focus:ring-gray-300";
let classBoutonActiverTelechargerCSV = "w-70 p-3 bg-[#fffade] text-lg text-[#a5b68d] shadow-md hover:text-white border-3 border-[#a5b68d] hover:bg-[#a5b68d] focus:ring-4 focus:outline-none focus:ring-[#a5b68d] rounded-xl text-center inline-flex items-center";
let classParent1 = "mt-8 flex center";
let classConteneurCarte = "bg-[#a5b68d] rounded-2xl overflow-hidden shadow-md flex items-center p-2 w-[464px]h-35 border-[#fff3e1] border-4";
let srcIcone = "../static/ico-usine.png";
let classIcone = "w-16 h-16 mr-2 object-cover hidden sm:block";
let classParent2 = "m-2 flex-1";
let classText1 = "font-bold text-[#fffade] text-xl line-clamp-1";
let classText2 = "text-black-500 text-md break-words line-clamp-1";
let arrayCSV = []
let resultGetInfoSiret = []
const mappingDepartement  = {
    '12' : "Aveyron",
    '38' : "Isère",
    '978' : "Saint-Martin",
    '23' : "Creuse",
    '33' : "Gironde",
    '37' : "Indre-et-Loire",
    '65' : "Hautes-Pyrénées",
    '76' : "Seine-Maritime",
    '93' : "Seine-Saint-Denis",
    '11' : "Aude",
    '50' : "Manche",
    '57' : "Moselle",
    '70' : "Haute-Saône",
    '84' : "Vaucluse",
    '17' : "Charente-Maritime",
    '35' : "Ille-et-Vilaine",
    '53' : "Mayenne",
    '73' : "Savoie",
    '52' : "Haute-Marne",
    '78' : "Yvelines",
    '28' : "Eure-et-Loir",
    '41' : "Loir-et-Cher",
    '75' : "Paris",
    '971' : "Guadeloupe",
    '987' : "Polynésie française",
    '2A' : "Corse-du-Sud",
    '973' : "Guyane",
    '988' : "Nouvelle-Calédonie",
    '63' : "Puy-de-Dôme",
    '77' : "Seine-et-Marne",
    '81' : "Tarn",
    '25' : "Doubs",
    '42' : "Loire",
    '71' : "Saône-et-Loire",
    '48' : "Lozère",
    '64' : "Pyrénées-Atlantiques",
    '80' : "Somme",
    '86' : "Vienne",
    '2B' : "Haute-Corse",
    '44' : "Loire-Atlantique",
    '46' : "Lot",
    '61' : "Orne",
    '68' : "Haut-Rhin",
    '94' : "Val-de-Marne",
    '34' : "Hérault",
    '975' : "Saint-Pierre-et-Miquelon",
    '06' : "Alpes-Maritimes",
    '24' : "Dordogne",
    '58' : "Nièvre",
    '60' : "Oise",
    '66' : "Pyrénées-Orientales",
    '29' : "Finistère",
    '32' : "Gers",
    '54' : "Meurthe-et-Moselle",
    '04' : "Alpes-de-Haute-Provence",
    '87' : "Haute-Vienne",
    '88' : "Vosges",
    '95' : "Val-d'Oise",
    '62' : "Pas-de-Calais",
    '90' : "Territoire de Belfort",
    '976' : "Mayotte",
    '16' : "Charente",
    '43' : "Haute-Loire",
    '972' : "Martinique",
    '15' : "Cantal",
    '19' : "Corrèze",
    '40' : "Landes",
    '72' : "Sarthe",
    '82' : "Tarn-et-Garonne",
    '92' : "Hauts-de-Seine",
    '02' : "Aisne",
    '07' : "Ardèche",
    '22' : "Côtes-d'Armor",
    '49' : "Maine-et-Loire",
    '69' : "Rhône",
    '986' : "Wallis et Futuna",
    '05' : "Hautes-Alpes",
    '30' : "Gard",
    '31' : "Haute-Garonne",
    '09' : "Ariège",
    '14' : "Calvados",
    '36' : "Indre",
    '91' : "Essonne",
    '56' : "Morbihan",
    '67' : "Bas-Rhin",
    '974' : "La Réunion",
    '13' : "Bouches-du-Rhône",
    '18' : "Cher",
    '47' : "Lot-et-Garonne",
    '55' : "Meuse",
    '59' : "Nord",
    '01' : "Ain",
    '21' : "Côte-d'Or",
    '27' : "Eure",
    '74' : "Haute-Savoie",
    '83' : "Var",
    '984' : "Terres australes et antarctiques françaises",
    '39' : "Jura",
    '79' : "Deux-Sèvres",
    '85' : "Vendée",
    '89' : "Yonne",
    '08' : "Ardennes",
    '10' : "Aube",
    '26' : "Drôme",
    '51' : "Marne",
    '977' : "Saint-Barthélemy",
    '03' : "Allier",
    '45' : "Loiret",
    '989' : "Île de Clipperton"
}

const mappingRegion  = {
    1 : "Guadeloupe",
    2 : "Martinique",
    3 : "Guyane",
    4 : "La Réunion",
    6 : "Mayotte",
    11 : "Ile-de-France",
    24 : "Centre-Val de Loire",
    27 : "Bourgogne-Franche-Comté",
    28 : "Normandie",
    32 : "Hauts-de-France",
    44 : "Grand Est",
    52 : "Pays de la Loire",
    53 : "Bretagne",
    75 : "Nouvelle-Aquitaine",
    76 : "Occitanie",
    84 : "Auvergne-Rhône-Alpes",
    93 : "Provence-Alpes-Côte d'Azur",
    94 : "Corse",
}

// Attribution des classes :
boutonLancerTraitement.className = classBoutonDesactiver;
boutonTelecharger.className = classBoutonDesactiver;

// -----------------------------------------------------------------------
// --------------------------LES FONCTIONS -------------------------------
// -----------------------------------------------------------------------
async function getInfoSiret(siret) {
    let urlGet = `${url}${siret}`
    const requete = await fetch(urlGet, {
        method: 'GET'
      });
      
    if(!requete.ok) {
        alert('Un problème est survenu, veuillez réessayer plus tard');
    } else {
        let donnees = await requete.json();
        // console.log(donnees);

        // Création des éléments HTML
        const divClassParent1 = document.createElement('div');
        const divClassConteneurCarte = document.createElement('div');
        const divClassParent2 = document.createElement('div');
        const imageIcone = document.createElement('img');
        const paragrapheRaisonSocial = document.createElement('p');
        const paragrapheNomComplet = document.createElement('p');
        const paragrapheSiret = document.createElement('p');
        const paragrapheAdresse = document.createElement('p');
        const paragrapheCommune = document.createElement('p');
        const paragrapheDateFermeture = document.createElement('p');

        // Changement des classes : 
        divClassParent1.className = classParent1;
        divClassConteneurCarte.className  = classConteneurCarte;
        divClassParent2.className  = classParent2;
        imageIcone.className  = classIcone;
        paragrapheRaisonSocial.className  = classText1;
        paragrapheNomComplet.className  = classText2;
        paragrapheSiret.className  = classText2;
        paragrapheAdresse.className  = classText2;
        paragrapheCommune.className  = classText2;
        paragrapheDateFermeture.className  = classText2;

        // Changement de l'icone : 
        imageIcone.src = "../static/ico-usine.png";

        // Changement du texte : 
        paragrapheRaisonSocial.textContent = `Raison Sociale : ${donnees.results[0].nom_raison_sociale}`;
        paragrapheNomComplet.textContent = `Nom Complet : ${donnees.results[0].nom_complet}`;
        paragrapheSiret.textContent = `Siret : ${donnees.results[0].matching_etablissements[0].siret}`;
        paragrapheAdresse.textContent = `Adresse : ${donnees.results[0].matching_etablissements[0].adresse}`;
        paragrapheCommune.textContent = `Commune : ${donnees.results[0].matching_etablissements[0].libelle_commune}`;
        paragrapheDateFermeture.textContent = `Date de fermeture : ${donnees.results[0].matching_etablissements[0].date_fermeture}`;

        // Création de la carte : 
        divClassParent2.appendChild(paragrapheRaisonSocial);
        divClassParent2.appendChild(paragrapheNomComplet);
        divClassParent2.appendChild(paragrapheSiret);
        divClassParent2.appendChild(paragrapheAdresse);
        divClassParent2.appendChild(paragrapheCommune);
        divClassParent2.appendChild(paragrapheDateFermeture);

        divClassConteneurCarte.appendChild(imageIcone);
        divClassConteneurCarte.appendChild(divClassParent2);

        // Ajouter les éléménts à la carte :
        divClassParent1.appendChild(divClassConteneurCarte);

        // Ajouter la Carte au conteneur :
        conteneurOutput.appendChild(divClassParent1);

        if (donnees.results[0].matching_etablissements[0].est_siege == true) { 
            return [siret,
                donnees.results[0].matching_etablissements[0].siret,
                siret == donnees.results[0].matching_etablissements[0].siret,
                donnees.results[0].nom_raison_sociale,
                donnees.results[0].nom_complet,
                donnees.results[0].matching_etablissements[0].adresse,
                donnees.results[0].matching_etablissements[0].geo_id,
                null, null,
                donnees.results[0].siege.adresse,
                1,
                donnees.results[0].siege.numero_voie,
                donnees.results[0].siege.type_voie,
                donnees.results[0].siege.libelle_voie,
                donnees.results[0].siege.complement_adresse,
                donnees.results[0].siege.libelle_commune,
                donnees.results[0].siege.departement,
                mappingDepartement[donnees.results[0].siege.departement],
                mappingRegion[donnees.results[0].siege.region],
                donnees.results[0].matching_etablissements[0].date_fermeture,
                donnees.total_results,
                donnees.results[0].matching_etablissements[0].est_siege
            ]
        } else {
            const arrayOutputSecondCall = await getInfoGeo(donnees.results[0].matching_etablissements[0].adresse);
            return [siret,
                donnees.results[0].matching_etablissements[0].siret,
                siret == donnees.results[0].matching_etablissements[0].siret,
                donnees.results[0].nom_raison_sociale,
                donnees.results[0].nom_complet,
                donnees.results[0].matching_etablissements[0].adresse,
                donnees.results[0].matching_etablissements[0].geo_id,
                arrayOutputSecondCall[0],
                arrayOutputSecondCall[0] == donnees.results[0].matching_etablissements[0].geo_id,
                arrayOutputSecondCall[1],
                arrayOutputSecondCall[2],
                arrayOutputSecondCall[3],
                arrayOutputSecondCall[4],
                arrayOutputSecondCall[5],
                null,
                arrayOutputSecondCall[6],
                arrayOutputSecondCall[7],
                arrayOutputSecondCall[8],
                mappingRegion[donnees.results[0].matching_etablissements[0].region],
                donnees.results[0].matching_etablissements[0].date_fermeture,
                donnees.total_results,
                donnees.results[0].matching_etablissements[0].est_siege
            ]
        }
    }
};


async function getInfoGeo(adresse) {
    let urlGet = `${urlBANO}${adresse}`
    // console.log(urlGet)
    const requete = await fetch(urlGet, {
        method: 'GET'
      });
      
    if(!requete.ok) {
        alert('Un problème est survenu, veuillez réessayer plus tard');
    } else {
        let donnees = await requete.json();
        // console.log(donnees)
        let geo_id = donnees.features[0].properties.id;
        let geo_adresse = donnees.features[0].properties.label;
        let geo_score_corres = donnees.features[0].properties.score;
        let geo_num_voie = donnees.features[0].properties.housenumber;
        let varStreet = donnees.features[0].properties.street.split(" ");
        let geo_type_voie = varStreet.shift();
        let geo_libelle_voie = varStreet.join(" ");
        let geo_lib_commune = donnees.features[0].properties.city;
        let varDepartement = donnees.features[0].properties.context.split(",");
        let varNumDepartement = varDepartement.shift();
        let geo_num_departement = mappingDepartement[varNumDepartement];
        arrayOutputGetInfoGeo = [
            geo_id, geo_adresse, geo_score_corres, geo_num_voie, geo_type_voie, geo_libelle_voie, geo_lib_commune, varNumDepartement, 
            geo_num_departement
        ]
        return arrayOutputGetInfoGeo
    }
}

async function callBatchAPI(data) {
  if (resultGetInfoSiret.length == 0) {
    resultGetInfoSiret.push(["SIRET_ENVOYE", "SIRET_RECU", "EGALITE_SIRET", "RASION SOCIAL", "NOM_COMPLET", "ADRESSE_SIRET", "GEO_ID_ENV", "GEO_ID_RECU"
      , "EGALITE_GEO_ID", "ADRESSE_CONSERVE", "SCORE_CORRESPONDANCE", "NUMERO_VOIE", "TYPE_VOIE", "NOM_VOIE", "COMPLEMENT_VOIE", "VILLE", "DEPARTEMENT_NUM", "DEPARTEMENT"
      , "REGION", "DATE_FERMETURE", "NB_RESULTAT", "EST_SIEGE"]);
  };
  for (let index = 0; index < data[0].length; index++) {
      const siret = data[0][index];
      arrayoutputCall = await getInfoSiret(siret);
      resultGetInfoSiret.push(arrayoutputCall);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  boutonTelecharger.className = classBoutonActiverTelechargerCSV;
}

async function callBatchAPIInput(data) {
  if (resultGetInfoSiret.length == 0) {
  resultGetInfoSiret.push(["SIRET_ENVOYE", "SIRET_RECU", "EGALITE_SIRET", "RASION SOCIAL", "NOM_COMPLET", "ADRESSE_SIRET", "GEO_ID_ENV", "GEO_ID_RECU"
    , "EGALITE_GEO_ID", "ADRESSE_CONSERVE", "SCORE_CORRESPONDANCE", "NUMERO_VOIE", "TYPE_VOIE", "NOM_VOIE", "COMPLEMENT_VOIE", "VILLE", "DEPARTEMENT_NUM", "DEPARTEMENT"
    , "REGION", "DATE_FERMETURE", "NB_RESULTAT", "EST_SIEGE"]);
  };
    for (let index = 0; index < data.length; index++) {
        const siret = data[index];
        arrayoutputCall = await getInfoSiret(siret);
        resultGetInfoSiret.push(arrayoutputCall);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
}
function telechargerCSV(data) {
     // Convertir les données en format CSV
     const csvContent = data.map(e => e.join(",")).join("\n");

     // Créer un Blob à partir du contenu CSV
     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
   
     // Créer un lien pour le téléchargement
     const link = document.createElement("a");
     const url = URL.createObjectURL(blob);
     link.setAttribute("href", url);
     link.setAttribute("download", "data.csv");
     document.body.appendChild(link);
   
     // Simuler un clic sur le lien pour démarrer le téléchargement
     link.click();
   
     // Nettoyer
     document.body.removeChild(link);
     URL.revokeObjectURL(url);
}

// -------------------------------------------------------------------------------
// --------------------------LES ECOUTEURS D'EVENEMENTS --------------------------
// -------------------------------------------------------------------------------
boutonLancerRechercheUnique.addEventListener('click', (e) => {
  let valueSend = [input.value]
  if(isNaN(valueSend[0]) == false && valueSend[0].length == 14) {
    callBatchAPIInput(valueSend);
    // console.log(resultGetInfoSiret);
    boutonTelecharger.className = classBoutonActiverTelechargerCSV;
  } else {
    alert("Veuillez saisir un Siret, soit numéro de 14 caractère");
  }
})
;


// A partir du dépôt de document.
document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('csvFile');
  
    // Prévenir le comportement par défaut de l'événement de glisser-déposer
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });
  
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  
    // Gérer la sélection de fichier via l'input
    fileInput.addEventListener('change', function (event) {
      const files = event.target.files;
      handleFiles(files);
    });
  
    // Gérer le dépôt du fichier
    dropArea.addEventListener('drop', handleDrop, false);
  
    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
  
      handleFiles(files);
    }
  
    function handleFiles(files) {
      const file = files[0]; // On prend le premier fichier déposé
      if (file && file.type === "text/csv") {
        // fileInfo.innerHTML = `Fichier déposé : ${file.name}`;
        readFile(file);
      } else {
        // fileInfo.innerHTML = "Veuillez déposer un fichier CSV.";
      }
    }
  
    function readFile(file) {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const content = event.target.result;
        // Utilisation de TextDecoder pour décoder le contenu en UTF-8
        const decoder = new TextDecoder();
        const decodedContent = decoder.decode(new Uint8Array(content));
        const rows = decodedContent.split('\r\n');
        arrayCSV.push(rows)
        boutonLancerTraitement.className = classBoutonActiver;
      };
  
      // Lire le fichier en tant que ArrayBuffer
      reader.readAsArrayBuffer(file);
    }
  });


boutonLancerTraitement.addEventListener('click', (e) => {
    boutonTelecharger.className = classBoutonDesactiver;
    arrayCSV[0].pop();
    callBatchAPI(arrayCSV);
})
;

boutonTelecharger.addEventListener('click', (e) => {
    telechargerCSV(resultGetInfoSiret); // Appel de la fonction principal
  })
; 