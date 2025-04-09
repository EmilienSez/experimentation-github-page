barre = document.getElementById("barre");
barDeProgression = document.getElementById("progress-bar");
boutonLancerTraitement = document.getElementById("lancer-traitement");
boutonLancerTraitement2 = document.getElementById("lancer-traitement2");
boutonArreterTraitement = document.getElementById("arreter-traitement");

pourcentageProgression = 0;
barDeProgression.className = `bg-[#a5b68d] text-xs font-medium text-gray-600 text-center p-0.5 leading-none rounded-full w-[${pourcentageProgression}%]`;
barDeProgression.textContent = `${pourcentageProgression} %`;
barre.style.display = 'none';

function changementProgresseBar(progressionPourcentage) {
    barDeProgression.className = `bg-[#a5b68d] text-xs font-medium text-gray-600 text-center p-0.5 leading-none rounded-full w-[${progressionPourcentage}%]`;
    barDeProgression.textContent = `${progressionPourcentage} %`;
}

function lancementTraitement() {
    barre.style.display = 'block';
    for (let index = 0; index < 100; index++) {
        console.log(index);
        setTimeout(changementProgresseBar(index), 1000);
    }
};

// Avant de passer à la gestion de l'asynchrone : 
boutonLancerTraitement.addEventListener('click', (e) => {
    // console.log(csvData);
    lancementTraitement();
  });

let intervalId;
let traitementEnCours = false;

function lancerTraitement() {
    val = 0;
    barre.style.display = 'block';
if (!traitementEnCours) {
    intervalId = setInterval(() => {
    // Code du traitement à exécuter toutes les 1 secondes
    val += 1;
    changementProgresseBar(val);
    if (val == 100) {
        arreterTraitement();
    }
    }, 1000);
    traitementEnCours = true;
}
}

function arreterTraitement() {
if (traitementEnCours) {
    clearInterval(intervalId);
    traitementEnCours = false;
}
}

// Lancer le traitement
boutonLancerTraitement2.addEventListener('click', (e) => {
    // console.log(csvData);
    lancerTraitement();
  });
// Arrêter le traitement
boutonArreterTraitement.addEventListener('click', (e) => {
    // console.log(csvData);
    arreterTraitement();
  });
// arreterTraitement();