
boutonTest = document.getElementById('boutonTest');
const url = "https://nominatim.openstreetmap.org/search.php?";
const listeTypeVille =  ["town", "city"]
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

    // Lorsque le fichier est chargé
    reader.onload = function (event) {
      const content = event.target.result;
      displayCSVContent(content);
    };

    // Lire le fichier en tant que texte
    reader.readAsText(file);
  }

  function displayCSVContent(content) {
    // Afficher le contenu brut du CSV
    csvContent.textContent = content;

    // Optionnel : traiter le contenu CSV
    const rows = content.split('\n');
    const csvData = rows.map(row => row.split(','));
    console.log(csvData); // Vous pouvez voir les données sous forme de tableau dans la console
  }
});


arrayTest = [["44000 - Nantes","Nantes", "Loire-Atlantique", "Pays de la Loire", "44000"],
["13000 - Marseille","Marseille", "Bouches-du-Rhône", "Provence-Alpes-Côte d'Azur", "13000"],
["69000 - Lyon", "Lyon", "Rhône", "Auvergne-Rhône-Alpes", "69000"],
["01100 - Bourg-en-Bresse", "Bourg-en-Bresse", "Ain", "Auvergne-Rhône-Alpes", "01100"]]

boutonTest.addEventListener('click', (e) => {
  arrayAllLine = []
  for (let index = 0; index < arrayTest.length; index++) {
    let identifiant   = arrayTest[index][0];
    let city          = arrayTest[index][1];
    let departement   = arrayTest[index][2];
    let region        = arrayTest[index][3];
    let codepostal    = arrayTest[index][4];

    arrayLine = getInfoVille(city, departement, region, codepostal, identifiant)
    arrayAllLine.push(arrayLine)
  }
    async function getInfoVille(city, departement, region, codepostal, identifiant) {
    let promises = array.map(async (city, departement, region, codepostal, identifiant) => {
      let urlGet = `${url}city=${city}&county=${departement}&state=${region}&country=France&postalcode=${codepostal}&format=jsonv2`
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


              let arrayLine = [identifiant, typeAdresse, nomRetour, latitude, longitude]
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
});


async function getInfoVille2(array) {
  let promises = array.map(async (params) => {
    let urlGet = `${url}city=${params[1]}&county=${params[2]}&state=${params[3]}&country=France&postalcode=${params[4]}&format=jsonv2`
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


            let arrayLine = [identifiant, typeAdresse, nomRetour, latitude, longitude]
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

async function main() {
  const arrayTest = [["44000 - Nantes","Nantes", "Loire-Atlantique", "Pays de la Loire", "44000"],
  ["13000 - Marseille","Marseille", "Bouches-du-Rhône", "Provence-Alpes-Côte d'Azur", "13000"],
  ["69000 - Lyon", "Lyon", "Rhône", "Auvergne-Rhône-Alpes", "69000"],
  ["01100 - Bourg-en-Bresse", "Bourg-en-Bresse", "Ain", "Auvergne-Rhône-Alpes", "01100"]]  

  try {
      const allData = await getInfoVille2(arrayTest);
      console.log(allData); // Affichez toutes les données une fois qu'elles sont toutes récupérées
  } catch (error) {
      console.error('Une erreur est survenue lors du fetch :', error);
  }
}

// Appel de la fonction principale
main();






// Avant de passer à la gestion de l'asynchrone : 
// boutonTest.addEventListener('click', (e) => {
//   arrayAllLine = []
//   for (let index = 0; index < arrayTest.length; index++) {
//     let identifiant   = arrayTest[index][0];
//     let city          = arrayTest[index][1];
//     let departement   = arrayTest[index][2];
//     let region        = arrayTest[index][3];
//     let codepostal    = arrayTest[index][4];

//     arrayLine = getInfoVille(city, departement, region, codepostal, identifiant)
//     arrayAllLine.push(arrayLine)
//   }
//   console.log(arrayAllLine)
//     async function getInfoVille(city, departement, region, codepostal, identifiant) {
//     let urlGet = `${url}city=${city}&county=${departement}&state=${region}&country=France&postalcode=${codepostal}&format=jsonv2`
//     const requete = await fetch(urlGet, {
//         method: 'GET',
//         headers: {'User-Agent' : "experimentationGitHub/1.0 (emilien.sezestre@gmail.com)" },
//       });
    
//     if(!requete.ok) {
//         alert('Un problème est survenu, veuillez réessayer plus tard');
//     } else {
//         let donnees = await requete.json();
//         for (let index = 0; index < donnees.length; index++) {
//           let adressetype = donnees[index]["addresstype"];

//           if (listeTypeVille.includes(adressetype)) {

//             let ligneConserver = index;
//             let typeAdresse = donnees[ligneConserver]["addresstype"];
//             let nomRetour = donnees[ligneConserver]["display_name"];
//             let latitude = donnees[ligneConserver]["lat"];
//             let longitude = donnees[ligneConserver]["lon"];


//             let arrayLine = [identifiant, typeAdresse, nomRetour, latitude, longitude]
//             return arrayLine
//             break
//           } else {
//             console.log("Pas une ville");
//           }
//       }
//     }}
// });
