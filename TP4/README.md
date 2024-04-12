# TP4

## Exo1 & Exo1.2
Dans le dossier Exo1 et Exo1.2 les serveurs texte basique et html.

## Exo2
Dans le dossier Exo2 l'implémentation d'une première version de notre backend API REST avec Express avec des routes pour : 
- `api/genres`
- `api/genre/rock/artists`
- `api/artists`
- `api/artist/rolling_stones/albums`

Vous pouvez vous balader à l'adresse `http://localhost:8080` pour constater l'utilisation de l'API sur notre application

## Exo3

⚠️ Veuillez a bien saisir votre API_KEY dans le fichier `.env` du dossier Exo3.

Dans le dossier Exo3 l'implémentation du backend API REST en utilisant l'API de lastfm.

Les routes :
- `api/genres` qui renvoie la liste des genres ainsi que leur description
- `api/genre/rock/artists` qui renvoie tous les artists les plus connus d'un genre.

PS : Nous n'avons pas utiliser de XML et avons fait des requetes a l'API en récupérant directement au format JSON

PS2 : Nous avons générez notre propre API_KEY pour le TP (mais pour suivre les bonnes pratiques nous ne vous la laissons pas dans le code).

