# Labyrinthe

Un petit projet permettant de générer et de résoudre un labyrinthe.

![image](https://github.com/tomdepussay/maze/assets/109548814/77a799d8-7960-443a-bb28-b7071253e04b)

## Les algorithmes

### Algorithme de génération

#### Algorithme de Kruskal

L'algorithme de Kruskal est une méthode pour créer un labyrinthe qui est possible à resoudre.

Dans un premier temps, il crée un cadrillage du labyrinthe pour laisser une cellule isolée entre des murs.
![image](https://github.com/tomdepussay/maze/assets/109548814/5d929317-f9c0-4ec6-bf70-ef99433c956d)

Dans un second temps, chaque cellule isolée recoit un numéro unique (ici une couleur).
![image](https://github.com/tomdepussay/maze/assets/109548814/7ebb5a44-2b68-4c58-8bbd-c8c0fcfa8b1b)

Dans un troisième temps, il prend un mur au hasard (sauf les bords du labyrinthe) et le détruit, ce qui donne trois cellules, ces cellules se fusionnent en une seule. Donc elles ont le même numéro et la même couleur.
![image](https://github.com/tomdepussay/maze/assets/109548814/27f2c041-0b9a-4269-841e-a46d6a9e8ae1)

il répéte cette action jusqu'à ce que toutes les cellules isolées soit une seule et même cellule.
![image](https://github.com/tomdepussay/maze/assets/109548814/8cddef1c-0162-4a97-a5ad-1ae1ce684a90)

Quand c'est fini, ça veut dire qu'il existe un chemin possible pour aller n'importe ou dans le labyrinthe, donc il existe un chemin pour résoudre ce labyrinthe.

Le problème de l'algorithme est qu'il existe qu'un seul chemin possible. Pour complexifié cela, j'ai rajouté un algorithme qui supprime des murs au hasard.
Voila le résultat final.
![image](https://github.com/tomdepussay/maze/assets/109548814/927f9e83-40cb-4c8d-8a04-faa5d8a4ed16)

### Algorithme de résolution

#### Algorithme de parcours en largeur

L'algorithme de parcours en largeur consiste à créer une liste par niveau. Chaque niveau possède plusieurs cellules qui correspondent à la distance avec la cellule de départ.
La liste s'arrete quand on atteint le point d'arriver.
Dans l'exemple ci dessous, chaque cellule change de couleur selon leur distance avec le point de départ. 
![image](https://github.com/tomdepussay/maze/assets/109548814/d9894cfe-f5a2-4c66-a8f1-71acd4959bc1)

Après avoir ce resultat, il suffit de remonter la liste et nous avons le chemin le plus court.
![image](https://github.com/tomdepussay/maze/assets/109548814/179330bc-89b1-4bf9-90cc-21b72e9a224b)

## Crédit

- <a href="https://github.com/tomdepussay">Tom Depussay</a>
