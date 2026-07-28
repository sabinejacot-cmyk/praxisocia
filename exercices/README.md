# Mes exercices de mots 🦊

Petite application de jeux d'orthographe, créée pour s'entraîner sur :

1. **n ou m ?** — la règle du *m devant m, b, p* (cha**m**bre, i**m**portant… mais mo**n**tagne)
2. **ai ou ia ?** — écrire les lettres dans le bon ordre (m**ai**son / p**ia**no)
3. **ain ou ian ?** — idem (p**ain** / v**ian**de)

Elle est pensée pour un enfant avec un TSA : présentation toujours identique,
gros boutons, pas de chronomètre, pas de rouge vif ni de sons de « défaite »,
la règle est réexpliquée visuellement à chaque erreur, et chaque mot peut être
**écouté à voix haute** (bouton 🔊) pour travailler le lien son ↔ lettres.

## Comment l'essayer sur l'ordinateur

Dans ce dossier :

```bash
python3 -m http.server 8000
```

puis ouvrir <http://localhost:8000/exercices/> (ou le dossier directement).

## Comment la mettre en ligne

C'est un simple dossier de fichiers, comme le reste du site : dans le
Gestionnaire de fichiers Infomaniak, téléversez le dossier `exercices/`
à côté des autres fichiers du site. L'application sera alors accessible à
l'adresse :

**https://drsabinejacot.ch/exercices/**

(Elle n'apparaît nulle part dans les menus du site professionnel et contient
`noindex` : seuls ceux qui ont l'adresse la trouvent.)

## Comment la mettre sur le téléphone (comme une vraie app)

Une fois en ligne, ouvrez l'adresse sur le téléphone puis :

- **iPhone (Safari)** : bouton Partager □↑ → « Sur l'écran d'accueil »
- **Android (Chrome)** : menu ⋮ → « Ajouter à l'écran d'accueil » (ou « Installer l'application »)

Une icône apparaît sur l'écran d'accueil, l'app s'ouvre en plein écran et
fonctionne ensuite **même sans internet**.

## Comment ajouter des mots (2 minutes)

Tout est dans le fichier **`mots.js`**. Chaque mot est une ligne comme :

```js
{ avant: "cha", reponse: "m", apres: "bre" },   // chambre
```

- `avant` = le début du mot (avant le trou)
- `reponse` = ce que l'enfant doit choisir (`n`/`m`, `ai`/`ia`, `ain`/`ian`)
- `apres` = la fin du mot

Copiez une ligne, changez les trois morceaux, enregistrez, re-téléversez
`mots.js` : les nouveaux mots sont dans le jeu. Chaque partie pioche
10 mots au hasard (moitié de chaque réponse), donc plus il y a de mots,
plus les parties varient.

> Astuce : évitez pour l'instant les exceptions (*bonbon*, *néanmoins*…)
> tant que la règle de base n'est pas solide.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page de l'application |
| `mots.js` | **Les listes de mots — le seul fichier à modifier** |
| `app.js` | La logique du jeu |
| `style.css` | L'apparence |
| `manifest.webmanifest` + `icons/` | L'installation sur téléphone |
| `sw.js` | Le fonctionnement hors-ligne |
