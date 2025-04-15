# Version préliminaire du projet informatique de:

- Aleksandr Solomennikov
- Roch Joel Cubahiro
- Rasha Sadoun
- Peter Nicolas


### Guide de lancement de l'application

## Exécution du frontend et du backend dans différents terminaux (les deux doivent être en cours d'exécution):

* Pour le backend:

> cd AppTest
> cd backend
> npm run dev

* Pour le frontend:

> cd AppTest
> cd frontend
> npm run dev

## Ouvrir le site par lien :

[la page principale](http://localhost:5173/main)


### Guide d'utilisation de l'application

## 1ère page

Il n'y a qu'un seul bouton à appuyer.

## 2ème page

Les données souhaitées doivent être sélectionnées, puis cliquer sur le bouton Submit.

## 3ème page

Si la requête est correcte, les données devraient apparaître dans le tableau. Si ce n'est pas le cas, c'est probablement dû au fait que :

* L'option de la liste déroulante n'est pas sélectionnée ou les informations de la troisième ligne sont incorrectes. 

* Le backend n'est pas lancé

* Erreur dans la clé API (AppTest/backend/.env)