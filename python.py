import main as mod
import requests
import json

data = mod.recupererDataExcelbyRow(dir = mod.DATA_DIR, nom_fichier="Fichier de base pour traitement.xlsx", sheet="Commune Callon Finale")
print(data)

for row in data[1:5] :
    url = f"https://nominatim.openstreetmap.org/search?q={row[4]}&format=json"
    r = requests.get(url)
    if r.status_code == 200 :
        rJson = json.loads(r.text)
    else :
        rJson = [f'Erreur requête : {url}', r.status_code]
    print(rJson)

url = "https://nominatim.openstreetmap.org/search?q=Bourg%20en%20Bresse,%20Ain,%20Auvergne-Rh%C3%B4ne-Alpes,%20France&format=json"
r = requests.get(url)
print(r)