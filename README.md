# music_player

Ceci est un projet de développement Web à titre pédagogique. Il est en lien avec le cours S8 ELC D-3 Applications Web de l'Ecole Centrale de Lyon. Le but est de développer une application "Music Player" en utilisant les notions du cours sur le JavaScript et le Node.js.

## Participants

- GROULT Guillaume (guillaume.groult@ecl17.ec-lyon.fr)
- NETO-NAKADAIRA Lucas (lucas.neto-nakadaira@ecl17.ec-lyon.fr)

## Objectifs fixés

- Faire un serveur accédant aux fichiers audio par des requêtes AJAX
- Afficher l’arborescence Artiste/Album/Titre et la jaquette de l’album
- Réaliser les fonctions de bases d’un lecteur de musique (Lecture, Pause, Stop, etc...)

## Technologie utilisée


- Page HTML
- Script JavaScript
- Feuille de style CSS
- Serveur réalisé avec Node.js grâce au framework Express et aux modules path et fs
- Requête AJAX réalisé avec le module JQuery, générant et renvoyant des fichiers JSON aux clients

## Mode d'emploi 

Pour utiliser le music_player :
1. Installer Node.js
2. Ouvrir une invite de commande et se déplacer dans le dossier du projet avec la commande "cd"
3. Installer les node_modules suivants avec la commande "npm install nomDuModule" : fs, path et express
4. Faire la commande "node 11_express_server.js" pour lancer le serveur
5. Ouvrir un navigateur (Firefox de préférence)
6. Aller à l'URL suivant : localhost:8080/player
7. Vous pouvez maintenant manipuler le music_player

Pour ajouter un album :
- Dans le dossier du projet puis dans Documents/Music, créer un dossier avec le nom de l'artiste : "NomDeLArtiste".
- Dans le dossier du projet puis dans Documents/Music/NomDeLArtiste, créer un dossier avec le nom de l'album : "NomDeLAlbum".
- Dans le dossier du projet puis dans Documents/Music/NomDeLArtiste/NomDeLAlbum, ajouter les titres à jouer et la jaquette de l'album au format.jpg

## Améliorations futures

- Affichage d'une barre de progression et d'une barre de volume interactives
- Désactivation des contrôles de la balise <audio>
- Gestion de la playlist (suppression de titre, passage à la musique suivante, etc...)
