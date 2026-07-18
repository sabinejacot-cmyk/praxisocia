# Site PraxiSocIA — drsabinejacot.ch

Site vitrine de **PraxiSocIA** (Dre Sabine Jacot) — sociologie appliquée,
formation d'adultes et intelligence artificielle. Site **statique**
(HTML / CSS / JS), sans base de données ni framework : il s'héberge tel quel
sur **Infomaniak** (ou tout hébergement web).

## Identité (charte validée)

- Ivoire lumineux `#F8F3E9` — fond dominant
- Bleu paon profond `#285F63` — bandeaux, boutons, structure
- Terracotta grisé `#B36A52` — labels, filets, soulignés, puces
- Anthracite bleuté `#273638` — texte courant et grands titres
- Typographie : **Fraunces** (titres) + **Inter** (corps)

Le contenu textuel provient du fichier validé `PraxiSocIA_Site.md` et est
repris **mot à mot**. Les règles microtypographiques (espaces insécables
avant `; : ! ?` et dans les guillemets « », espace fine pour les milliers,
demi-cadratins, italiques) sont appliquées.

## Pages

| Fichier | Chapitre |
|---|---|
| `index.html` | Accueil — Présentation |
| `le-nom.html` | Le nom |
| `parcours.html` | Parcours |
| `approche-ia.html` | Une approche sociologique de l'IA |
| `prestations.html` | Prestations (4 pôles + Formats & modalités) |
| `publics.html` | À qui je m'adresse |
| `contact.html` | Contact (coordonnées + formulaire) |
| `mentions-legales.html` | Mentions légales & confidentialité (gabarit) |
| `css/style.css` · `js/main.js` · `assets/favicon.svg` | Style, scripts, favicon |
| `robots.txt` · `sitemap.xml` | Référencement |

## Prévisualiser en local

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Mise en ligne sur Infomaniak

1. **Manager Infomaniak** → Hébergement → **Gestionnaire de fichiers** (ou FTP).
2. Dossier racine du site (souvent `web/`, `www/` ou `sites/drsabinejacot.ch/`),
   là où se trouve la page « en construction » actuelle.
3. Remplacez l'ancien `index.html` et téléversez **tout** le contenu de ce
   dossier (fichiers `.html`, dossiers `css/`, `js/`, `assets/`, `robots.txt`,
   `sitemap.xml`), en conservant la structure des dossiers.
4. Ouvrez `https://drsabinejacot.ch`.

### Accès FTP
Manager → Hébergement → **FTP / SSH** → « Créer un accès FTP / SSH ».
Notez l'hôte, l'identifiant et le mot de passe (à ne pas partager en clair).

## Formulaire de contact

Champs : Nom* · Organisation · Type de demande* · Message*, avec honeypot
anti-spam (pas de captcha visible). Par défaut, l'envoi ouvre le logiciel de
messagerie du visiteur (`mailto:contact@drsabinejacot.ch`). Pour un envoi
automatique, donner au `<form>` une vraie `action` (service de formulaire ou
script Infomaniak).

## À compléter avant la mise en ligne publique (checklist de la spec)

- [ ] Adresse postale dans `mentions-legales.html`
- [ ] Nom définitif de la « boussole critique » (page Prestations)
- [ ] Test d'envoi du formulaire vers contact@drsabinejacot.ch
- [ ] Relecture intégrale par Sabine sur un site de préproduction
- [x] Lien page UniNE intégré
- [x] Liens LinkedIn et ORCID intégrés

## Personnaliser

- Couleurs / typo : variables en haut de `css/style.css` (`:root`).
- Textes : dans les fichiers `.html` (ou régénérés depuis le contenu source).
- Images / photos : à déposer dans `assets/` et à intégrer sur demande.

---

*PraxiSocIA — Dre Sabine Jacot · Suisse romande.*
« Comprendre et diagnostiquer, former et transmettre, évaluer et accompagner l'action. »
