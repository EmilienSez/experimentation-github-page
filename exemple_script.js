// Pour télécharger un fichier 
document.getElementById('download').addEventListener('click', function() {
  // Données à inclure dans le fichier CSV
  const data = [
      ['Nom', 'Âge', 'Ville'],
      ['Alice', 30, 'Paris'],
      ['Bob', 25, 'Lyon'],
      ['Charlie', 35, 'Marseille']
  ];

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
});