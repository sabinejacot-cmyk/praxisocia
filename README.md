# Site PraxiSocIA — drsabinejacot.ch

Site vitrine de **PraxiSocIA** (Dre Sabine Jacot) — sociologie appliquée &
intelligence artificielle. Site statique (HTML / CSS / JS), sans base de
données ni framework : il s'héberge tel quel sur n'importe quel hébergement
web, dont **Infomaniak**.

## Contenu

| Fichier | Page |
|---|---|
| `index.html` | Accueil |
| `a-propos.html` | À propos (parcours, titres, valeurs, posture) |
| `prestations.html` | Prestations (4 pôles, méthodes DÉCLIC / CLÉ·IA, modalités) |
| `recherche.html` | Recherche (mandats, ancrages théoriques) |
| `contact.html` | Contact (coordonnées + formulaire) |
| `css/style.css` | Feuille de style (identité : marine #2C3E6B, terracotta #C0653A) |
| `js/main.js` | Menu mobile, animations, formulaire |
| `assets/favicon.svg` | Favicon |
| `robots.txt`, `sitemap.xml` | Référencement |

## Prévisualiser en local

Ouvrez simplement `index.html` dans un navigateur, ou lancez un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Mise en ligne sur Infomaniak

Le site remplace la page « en construction » actuelle. Deux méthodes :

### A. Via le Gestionnaire de fichiers (le plus simple)
1. Connectez-vous au **Manager Infomaniak** → votre **Hébergement Web**.
2. Ouvrez **Gestionnaire de fichiers** (ou FTP).
3. Placez-vous dans le dossier racine du site — en général `web/`, `www/` ou
   `sites/drsabinejacot.ch/`. C'est là que se trouve la page
   « en construction » actuelle (souvent `index.html`).
4. **Supprimez / remplacez** l'ancien `index.html`, puis **téléversez tout le
   contenu de ce dossier** (les fichiers `.html`, ainsi que les dossiers
   `css/`, `js/`, `assets/`, et `robots.txt`, `sitemap.xml`).
5. Ouvrez `https://drsabinejacot.ch` → la nouvelle page d'accueil s'affiche.

### B. Via FTP (FileZilla)
- Hôte / identifiants FTP : dans le Manager Infomaniak → Hébergement → **FTP/SSH**.
- Glissez-déposez tous les fichiers dans le dossier racine du site.

> ⚠️ Conservez la structure des dossiers telle quelle (`css/`, `js/`,
> `assets/`) : les chemins dans les pages sont relatifs.

## Formulaire de contact

Par défaut, le formulaire ouvre le logiciel de messagerie du visiteur
(`mailto:contact@drsabinejacot.ch`) — aucun réglage nécessaire, fonctionne
partout.

Pour un **envoi automatique** (le message arrive directement dans votre boîte
sans que le visiteur ait un client mail), deux options :
- **Formspree** (gratuit pour un faible volume) : créez un formulaire sur
  formspree.io et remplacez, dans `contact.html`, `action="#"` par l'URL
  fournie (`action="https://formspree.io/f/xxxx"`).
- **Script PHP Infomaniak** : si l'hébergement supporte PHP, on peut ajouter un
  petit `contact.php` qui envoie l'e-mail. Dites-le moi et je le prépare.

## Personnaliser

- **Couleurs / polices** : variables en haut de `css/style.css` (`:root`).
- **Photo de Sabine** : la page « À propos » affiche un monogramme « SJ ».
  Pour une vraie photo, déposez-la dans `assets/` et remplacez le bloc
  `.portrait` par une balise `<img>`.
- **Textes** : directement dans les fichiers `.html`.

---

Identité tirée du dossier de présentation PraxiSocIA (juillet 2026).
« Comprendre pour transformer. Former pour autonomiser. Chercher pour agir. »
