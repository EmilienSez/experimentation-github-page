boutonDocDPE = document.getElementById('doc-dpe');
titre = document.getElementById('titre');
paragrapheUn = document.getElementById('p1');



// Ecouteur d'événement : 
boutonDocDPE.addEventListener('click', (e) => {
    titre.textContent = "Documentation - Utilisation de l'API DPE"
  })
;