
let boutonLancerTraitement = document.getElementById('lancer-traitement');
let boutonTelecharger = document.getElementById('download-csv');
var allData = []
var csvData = []
const url = "https://nominatim.openstreetmap.org/search.php?";
const listeTypeVille =  ["town", "city"]

// Menue de paramètrage : 
let classBoutonActiver = "text-white bg-blue-600 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-10 dark:border-blue-500 dark:text-blue-500 dark:hover:text-black dark:hover:bg-gray-600 blue:focus:ring-blue-800 w-full";
let classBoutonDesactiver ="text-white bg-grey-600 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-10 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 w-full cursor-not-allowed";
let classBoutonActiverTelechargerCSV = "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-10 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 w-full"
boutonTelecharger.className = classBoutonDesactiver;
boutonLancerTraitement.className = classBoutonDesactiver;

document.addEventListener('DOMContentLoaded', function () {
  const dropArea = document.getElementById('drop-area');
  const fileInfo = document.getElementById('file-info');
  const csvContent = document.getElementById('csv-content');
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
      fileInfo.innerHTML = `Fichier déposé : ${file.name}`;
      readFile(file);
    } else {
      fileInfo.innerHTML = "Veuillez déposer un fichier CSV.";
    }
  }

  function readFile(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const content = event.target.result;
      // Utilisation de TextDecoder pour décoder le contenu en UTF-8
      const decoder = new TextDecoder();
      const decodedContent = decoder.decode(new Uint8Array(content));
      csvData = displayCSVContent(decodedContent);
    };

    // Lire le fichier en tant que ArrayBuffer
    reader.readAsArrayBuffer(file);
  }

  function displayCSVContent(content) {
    // Afficher le contenu brut du CSV
    csvContent.textContent = content;

    // Optionnel : traiter le contenu CSV
    const rows = content.split('\n');
    const csvData = rows.map(row => row.split(';'));
    boutonLancerTraitement.className = classBoutonActiver;
    return csvData
  }
});


async function getInfoVille(array) {
  let promises = array.map(async (params) => {
    let urlGet = `${url}city=${params[1]}&county=${params[2]}&state=${params[3]}&country=France&postalcode=${params[4]}&format=jsonv2`
    // console.log(urlGet)
    const requete = await fetch(urlGet, {
        method: 'GET',
        headers: {'User-Agent' : "experimentationGitHub/1.0 (emilien.sezestre@gmail.com)" },
      });
    
    if(!requete.ok) {
        alert('Un problème est survenu, veuillez réessayer plus tard');
    } else {
        let donnees = await requete.json();
        for (let index = 0; index < donnees.length; index++) {
          let adressetype = donnees[index]["addresstype"];

          if (listeTypeVille.includes(adressetype)) {

            let ligneConserver = index;
            let typeAdresse = donnees[ligneConserver]["addresstype"];
            let nomRetour = donnees[ligneConserver]["display_name"];
            let latitude = donnees[ligneConserver]["lat"];
            let longitude = donnees[ligneConserver]["lon"];


            let arrayLine = [params[0], typeAdresse, nomRetour, latitude, longitude]
            return arrayLine
            break
          } else {
            console.log("Pas une ville");
          }
    }
  }
});
const results = await Promise.all(promises);
return results; // Cela renvoie un tableau avec tous les résultats
}

async function lancementAnalyseArray(arrayCSV) {
  // const arrayTest = [["44000 - Nantes","Nantes", "Loire-Atlantique", "Pays de la Loire", "44000"],
  // ["13000 - Marseille","Marseille", "Bouches-du-Rhône", "Provence-Alpes-Côte d'Azur", "13000"],
  // ["69000 - Lyon", "Lyon", "Rhône", "Auvergne-Rhône-Alpes", "69000"],
  // ["01100 - Bourg-en-Bresse", "Bourg-en-Bresse", "Ain", "Auvergne-Rhône-Alpes", "01100"]]  
  try {
      allData = await getInfoVille(arrayCSV);
      // A partir de la les requêtes Fetch sont terminées : 
      // console.log(allData); // Affichez toutes les données une fois qu'elles sont toutes récupérées
      boutonTelecharger.className = classBoutonActiverTelechargerCSV;
      return allData
  } catch (error) {
      console.error('Une erreur est survenue lors du fetch :', error);
  }
}

// Avant de passer à la gestion de l'asynchrone : 
boutonLancerTraitement.addEventListener('click', (e) => {
  // console.log("Lancement Traitement....")
  allData = lancementAnalyseArray(csvData); // Appel de la fonction principal
}); 

boutonTelecharger.addEventListener('click', (e) => {
  telechargerCSV(allData); // Appel de la fonction principal
}); 

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

