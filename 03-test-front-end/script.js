barre = document.getElementById("barre");
barDeProgression = document.getElementById("progress-bar");
boutonLancerTraitement = document.getElementById("lancer-traitement");
boutonLancerTraitement2 = document.getElementById("lancer-traitement2");
boutonArreterTraitement = document.getElementById("arreter-traitement");

pourcentageProgression = 0;
// barDeProgression.className = `bg-[#a5b68d] text-xs font-medium text-gray-600 text-center p-0.5 leading-none rounded-full w-[${pourcentageProgression}%]`;
//barDeProgression.textContent = `${pourcentageProgression} %`;
//barre.style.display = 'none';

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
// boutonLancerTraitement.addEventListener('click', (e) => {
//     // console.log(csvData);
//     lancementTraitement();
//   });

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

// // Lancer le traitement
// boutonLancerTraitement2.addEventListener('click', (e) => {
//     // console.log(csvData);
//     lancerTraitement();
//   });
// // Arrêter le traitement
// boutonArreterTraitement.addEventListener('click', (e) => {
//     // console.log(csvData);
//     arreterTraitement();
//   });
// // arreterTraitement();


// Arrêter le traitement
// const content = document.getElementById('content');
// let btnAfficherElement = document.getElementById('afficherDPE');
// btnAfficherElement.addEventListener('click', (e) => {
//     e.preventDefault()

//     if (content.classList.contains('contenthidden')) {
//         content.classList.remove('contenthidden'); // Retire la classe cachée
//         setTimeout(() => {
//             content.classList.add('show'); // Ajoute la classe pour afficher le contenu après un court délai
//         }, 10); // Un court délai pour permettre la transition
//     } else {
//         content.classList.remove('show'); // Retire la classe pour cacher le contenu
//         setTimeout(() => content.classList.add('contenthidden'), 500); // Ajoute la classe cachée après la transition
//     }
// });


document.querySelectorAll('.toggleButton').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du bouton

        //const content = this.nextElementSibling; // Sélectionne le contenu suivant (le div qui contient la liste)
        let content;

        if (!this.closest('.dropdown').querySelector('.content.hiddenessaie')) {
            content = this.closest('.dropdown').querySelector('.content.show')
        } else {
            content = this.closest('.dropdown').querySelector('.content.hiddenessaie')
        }

        if (content.classList.contains('hiddenessaie')) {
            content.classList.remove('hiddenessaie'); // Retire la classe cachée
            setTimeout(() => {
                content.classList.add('show'); // Ajoute la classe pour afficher le contenu après un court délai
            }, 10); // Un court délai pour permettre la transition
        } else {
            content.classList.remove('show'); // Retire la classe pour cacher le contenu
            // Attendre la fin de la transition avant d'ajouter 'hidden'
            content.addEventListener('transitionend', function handleTransitionEnd() {
                content.classList.add('hiddenessaie'); // Ajoute la classe cachée après la transition
                content.removeEventListener('transitionend', handleTransitionEnd); // Nettoie l'écouteur
            });
        }
    });
});