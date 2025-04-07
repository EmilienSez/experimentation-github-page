boutonDocDPE = document.getElementById('doc-dpe');
boutonDocSIRET = document.getElementById('doc-siret');
boutonDocGPS = document.getElementById('doc-gps');

let titre = document.getElementById('titre');
let textePage = document.getElementById('paragraphe-txt');
let zoneTexte = document.getElementById('div-texte-docu');

let classP = "mt-4 text-gray-900";
let classPCentrer = "mt-4 text-gray-900 text-center";
let classImg = "w-150 h-150 mx-auto object-cover border-[#fffade] rounded-lg border-4";
let classImgDiv = "mt-4 mb-4 text-center";
let classUl = "list-disc ml-12 mt-4 text-gray-900"

// Ecouteur d'événement : 
boutonDocDPE.addEventListener('click', (e) => {
    titre.textContent = "Documentation - Utilisation de l'API DPE";
    textePage.remove();
    zoneTexte.appendChild(divClassParentDPE);
    divClassParentDPE.appendChild(DPEp1);
    divClassParentDPE.appendChild(DPEp2);
    divClassParentDPE.appendChild(DPEImg1Div);
    divClassParentDPE.appendChild(DPEp3);
    divClassParentDPE.appendChild(DPEp4);
    divClassParentDPE.appendChild(DPEp5);
    divClassParentDPE.appendChild(DPEImg2Div);
    divClassParentDPE.appendChild(DPEp6);
    textePage = divClassParentDPE;
  })
;

boutonDocSIRET.addEventListener('click', (e) => {
  titre.textContent = "Documentation - Récupération d'information d'entreprise";
  textePage.remove();
  zoneTexte.appendChild(divClassParentSIRET);
  divClassParentSIRET.appendChild(SIRETp1);
  divClassParentSIRET.appendChild(SIRETp2);
  divClassParentSIRET.appendChild(SIRETImg1Div);
  divClassParentSIRET.appendChild(SIRETp3);
  divClassParentSIRET.appendChild(SIRETUl1);
  divClassParentSIRET.appendChild(SIRETp4);
  divClassParentSIRET.appendChild(SIRETImg2Div);
  divClassParentSIRET.appendChild(SIRETp5);
  textePage = divClassParentSIRET;
})
;

boutonDocGPS.addEventListener('click', (e) => {
  titre.textContent = "Documentation - Récupération des coordonnées GPS"
  textePage.remove()
  zoneTexte.appendChild(divClassParentGPS);
  divClassParentGPS.appendChild(GPSp1);
  divClassParentGPS.appendChild(GPSImg1Div);
  divClassParentGPS.appendChild(GPSp2);
  divClassParentGPS.appendChild(GPSUl1);
  divClassParentGPS.appendChild(GPSp3);
  divClassParentGPS.appendChild(GPSImg2Div);
  divClassParentGPS.appendChild(GPSp4);
  divClassParentGPS.appendChild(GPSp5);
  divClassParentGPS.appendChild(GPSp6);
  textePage = divClassParentGPS;
})
;


// Les textes : 
const divClassParentDPE = document.createElement('div');
divClassParentDPE.id = "paragraphe-txt"
const divClassParentSIRET = document.createElement('div');
divClassParentSIRET.id = "paragraphe-txt"
const divClassParentGPS = document.createElement('div');
divClassParentGPS.id = "paragraphe-txt"
// Pour les DPE : 

const DPEp1 = document.createElement('p');
DPEp1.className = classP;
DPEp1.textContent = "Fonctionnement : Utilisation de l’API BANO (Base des adresses National Ouverte) pour récupérer l’identifiant unique d’adresse au niveau nationale, aussi appelée Identifiant BANO.";

const DPEp2 = document.createElement('p');
DPEp2.className = classP;
DPEp2.textContent = "Dans un second temps, nous envoyons l’Identifiant BANO à l’API de l’ADEME, pour voir si un DPE est associé à l’adresse fourni. Si un DPE est associé à l’adresse, alors ce dernier sera renvoyé par sur la page (voir ci-dessous) : ";

const DPEp3 = document.createElement('p');
DPEp3.className = classP;
DPEp3.textContent = "Afin de s’assurer de la correspondance entre le DPE et l’adresse recherchée, veuillez regarder Contrôler avec l’adresse brut, qui correspond à l’adresse saisie par le diagnostiqueur sur le DPE.";

const DPEp4 = document.createElement('p');
DPEp4.className = classP;
DPEp4.textContent = "Vous pouvez également contrôler via le type d’usage du bâtiment, la surface SHON ou la surface utile.";

const DPEp5 = document.createElement('p');
DPEp5.className = classP;
DPEp5.textContent = "De plus, afin d'avoir une trace vous pouvez télécharger l’ensemble des résultats à l’aide du bouton de téléchargement. Vous trouverez ci-dessous la page de présentation : ";

const DPEp6 = document.createElement('p');
DPEp6.className = classP;
DPEp6.textContent = "Vous pouvez également choisir le type d’API en fonction de votre besoin. Dans le cadre de BATIROC, nous utiliserons principalement l’API des DPE Tertiaire après juillet 2021.";

DPEImg1 = document.createElement('img');
DPEImg1.className = classImg;
DPEImg1.src = "static/doc/DPE1.png"
DPEImg1Div = document.createElement('div');
DPEImg1Div.className = classImgDiv;
DPEImg1Div.appendChild(DPEImg1);

DPEImg2 = document.createElement('img');
DPEImg2.className = classImg;
DPEImg2.src = "static/doc/DPE2.png"
DPEImg2Div = document.createElement('div');
DPEImg2Div.className = classImgDiv;
DPEImg2Div.appendChild(DPEImg2);

// Pour les SIRET : 

const SIRETp1 = document.createElement('p');
SIRETp1.className = classP;
SIRETp1.textContent = "Dans ce traitement, nous utilisons une API du gouvernement pour récupérer des informations sur des entités à partir du SIRET. Il y a 2 types d’utilisation, dans un premier temps, vous pouvez faire une recherche simple via le SIRET (14 chiffres) uniquement. De plus, dans le cas où vous souhaitez récupérer des informations sur un grand nombre de document, vous pouvez le faire via un dépôt de document.";

const SIRETp2 = document.createElement('p');
SIRETp2.className = classPCentrer;
SIRETp2.textContent = "Voici la page d’acceuil :";

const SIRETp3 = document.createElement('p');
SIRETp3.className = classP;
SIRETp3.textContent = "Veuillez-vous fier aux informations ci-dessous pour construire le fichier de dépôt :";

const SIRETp4 = document.createElement('p');
SIRETp4.className = classPCentrer;
SIRETp4.textContent = "Exemple de fichier : ";

const SIRETp5 = document.createElement('p');
SIRETp5.className = classP;
SIRETp5.textContent = "Dans le cadre de ce traitement, nous utilisons l’API de l’Annuaire des Entreprises (site du gouvernement), disponible ICI.";

SIRETImg1 = document.createElement('img');
SIRETImg1.className = classImg;
SIRETImg1.src = "static/doc/SIRET1.png"
SIRETImg1Div = document.createElement('div');
SIRETImg1Div.className = classImgDiv;
SIRETImg1Div.appendChild(SIRETImg1);

SIRETImg2 = document.createElement('img');
SIRETImg2.className = classImg;
SIRETImg2.src = "static/doc/SIRET2.png"
SIRETImg2Div = document.createElement('div');
SIRETImg2Div.className = classImgDiv;
SIRETImg2Div.appendChild(SIRETImg2);

SIRETUl1 = document.createElement('ul');
SIRETUl1.className = classUl;
SIRETLi1Ul1 = document.createElement('li');
SIRETLi1Ul1.textContent = "Format : .CSV (délimité par des virgules)";
SIRETLi2Ul1 = document.createElement('li');
SIRETLi2Ul1.textContent = "Uniquement des SIRET";
SIRETUl1.appendChild(SIRETLi1Ul1);
SIRETUl1.appendChild(SIRETLi2Ul1);

// Pour les Coordonnées GPS : 

const GPSp1 = document.createElement('p');
GPSp1.className = classP;
GPSp1.textContent = "Ce traitement utilise l’API d’OpenStreetMap pour récupérer des coordonnées GPS à partir d’adresse. Il nécessite le dépôt d’un document.";

const GPSp2 = document.createElement('p');
GPSp2.className = classP;
GPSp2.textContent = "Concernant le fichier de dépôt : ";

const GPSp3 = document.createElement('p');
GPSp3.className = classPCentrer;
GPSp3.textContent = "Exemple de fichier ci-dessous : ";

const GPSp4 = document.createElement('p');
GPSp4.className = classP;
GPSp4.textContent = "Une fois que vous avez déposé le fichier, cliquez sur « Télécharger le CSV », vous pourrez cliquer dessus lorsque le traitement sera terminé.";

const GPSp5 = document.createElement('p');
GPSp5.className = classP;
GPSp5.textContent = "En retour, vous recevrez un fichier comportant l’identifiant, le type d’adresse (ville, village, etc…), le nom de l’endroit de retour, latitude et longitude.";

const GPSp6 = document.createElement('p');
GPSp6.className = classP;
GPSp6.textContent = "Sur la même page, vous trouverez un second traitement, permettant de calculer le minimum de distance entre 2 coordonnées, via, dans un premier temps, le calcul de la distance de Haversine. Puis une fois toutes les distances calculées, on sélectionne la distance minimal.";


GPSImg1 = document.createElement('img');
GPSImg1.className = classImg;
GPSImg1.src = "static/doc/GPS1.png"
GPSImg1Div = document.createElement('div');
GPSImg1Div.className = classImgDiv;
GPSImg1Div.appendChild(GPSImg1);

GPSImg2 = document.createElement('img');
GPSImg2.className = classImg;
GPSImg2.src = "static/doc/GPS2.png"
GPSImg2Div = document.createElement('div');
GPSImg2Div.className = classImgDiv;
GPSImg2Div.appendChild(GPSImg2);

GPSUl1 = document.createElement('ul');
GPSUl1.className = classUl;
GPSLi1Ul1 = document.createElement('li');
GPSLi1Ul1.textContent = "Format : .CSV (délimité par des virgules)";
GPSLi2Ul1 = document.createElement('li');
GPSLi2Ul1.textContent = "5 Colonnes : Identifiant, Ville, Département, Région, Pays";
GPSUl1.appendChild(GPSLi1Ul1);
GPSUl1.appendChild(GPSLi2Ul1);