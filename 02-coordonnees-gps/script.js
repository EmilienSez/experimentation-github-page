// https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors

let boutonLancerTraitement = document.getElementById('lancer-traitement');
let boutonTelecharger = document.getElementById('download-csv');
var allData = []
var csvData = []
const url = "https://nominatim.openstreetmap.org/search.php?";
const listeTypeVille =  ["town", "city","village"]
const delayTime = 1000;

// Menue de paramètrage : 
let classBoutonActiver = "w-70 p-3 shadow-md text-lg text-center border-3 border-yellow-400 text-gray-700 bg-[#fffade] rounded-xl hover:bg-yellow-400 transition";
let classBoutonDesactiver ="w-70 p-3 shadow-md bg-[#DBDBDB] hover:text-white text-lg text-center border-3 border-gray-500 focus:ring-4 hover:bg-gray-500 text-lg rounded-xl inline-flex transition items-center cursor-not-allowed focus:ring-gray-300"
//let classBoutonDesactiver ="w-1/2 p-3 mr-4 text-white bg-grey-600 hover:text-white border-3 border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg text-center inline-flex items-center cursor-not-allowed";
let classBoutonActiverTelechargerCSV = "w-70 p-3 bg-[#fffade] text-lg text-[#a5b68d] shadow-md hover:text-white border-3 border-[#a5b68d] hover:bg-[#a5b68d] focus:ring-4 focus:outline-none focus:ring-[#a5b68d] rounded-xl text-center inline-flex items-center"
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// async function getInfoVille(array) {
//   const results = []; // Tableau pour stocker les résultats

//   for (const params of array) {
//       let urlGet = `${url}city=${params[1]}&county=${params[2]}&state=${params[3]}&country=France&postalcode=${params[4]}&format=jsonv2`;
//       console.log(urlGet)
//       try {
//           const requete = await fetch(urlGet, {
//               method: 'GET',
//               headers: { 'User-Agent': "experimentationGitHub/1.0 (emilien.sezestre@gmail.com)" },
//           });
          
//           if (!requete.ok) {
//               alert('Un problème est survenu, veuillez réessayer plus tard');
//           } else {
//               let donnees = await requete.json();
              
//               for (let index = 0; index < donnees.length; index++) {
//                   let adressetype = donnees[index]["addresstype"];

//                   if (listeTypeVille.includes(adressetype)) {
//                       let ligneConserver = index;
//                       let typeAdresse = donnees[ligneConserver]["addresstype"];
//                       let nomRetour = donnees[ligneConserver]["display_name"];
//                       let latitude = donnees[ligneConserver]["lat"];
//                       let longitude = donnees[ligneConserver]["lon"];

//                       let arrayLine = [params[0], typeAdresse, nomRetour, latitude, longitude];
//                       results.push(arrayLine); // Ajouter le résultat au tableau
//                       break; // Sortir de la boucle dès qu'une ville valide est trouvée
//                   } else {
//                       console.log("Pas une ville");
//                   }
//               }
//           }
//       } catch (error) {
//           console.error(`Erreur lors de la requête pour ${params[1]} : ${error.message}`);
//       }

//       // Ajouter un délai entre chaque requête
//       console.log("Ok")
//       await delay(100); // Délai de 1000 ms (1 seconde)
//   }

//   return results; // Cela renvoie un tableau avec tous les résultats
// }


async function getInfoVille(array) {
  let promises = array.map(async (params) => {
    let urlGet = `${url}city=${params[1]}&county=${params[2]}&state=${params[3]}&country=France&postalcode=${params[4]}&format=jsonv2`
    // console.log(urlGet)
    const requete = await fetch(urlGet, {
        method: 'GET',
        headers: {
          'User-Agent' : "experimentationGitHub/1.0 (emilien.sezestre@gmail.com)",
          'Content-Type': 'application/json'

        },
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
      console.log(allData); // Affichez toutes les données une fois qu'elles sont toutes récupérées
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

