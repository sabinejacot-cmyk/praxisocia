/* =========================================================
   Mes exercices de mots — logique du jeu
   ========================================================= */

const QUESTIONS_PAR_PARTIE = 10;

/* ---------- Étoiles mémorisées sur l'appareil ---------- */
const memoire = {
  lire(cle, defaut) {
    try { return JSON.parse(localStorage.getItem("exomots-" + cle)) ?? defaut; }
    catch { return defaut; }
  },
  ecrire(cle, valeur) {
    try { localStorage.setItem("exomots-" + cle, JSON.stringify(valeur)); } catch {}
  }
};

/* ---------- Synthèse vocale (le mot est lu à voix haute) ---------- */
let voixFr = null;
function chargerVoix() {
  const voix = speechSynthesis.getVoices().filter(v => v.lang && v.lang.startsWith("fr"));
  voixFr = voix.find(v => v.lang === "fr-FR") || voix[0] || null;
}
if ("speechSynthesis" in window) {
  chargerVoix();
  speechSynthesis.onvoiceschanged = chargerVoix;
}
function dire(texte, lent) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texte);
  u.lang = "fr-FR";
  if (voixFr) u.voice = voixFr;
  u.rate = lent ? 0.75 : 0.9;
  speechSynthesis.speak(u);
}

/* ---------- Raccourcis DOM ---------- */
const $ = id => document.getElementById(id);
const ecrans = document.querySelectorAll(".ecran");
function montrerEcran(id) {
  ecrans.forEach(e => e.classList.toggle("actif", e.id === id));
  window.scrollTo(0, 0);
}

/* ---------- État de la partie en cours ---------- */
let moduleActuel = null;
let file = [];          // questions de la partie
let indexQuestion = 0;
let etoilesSession = 0;
let indiceUtilise = false;

/* =========================================================
   Écran d'accueil
   ========================================================= */
function afficherAccueil() {
  const total = MODULES.reduce((s, m) => s + memoire.lire("etoiles-" + m.id, 0), 0);
  $("compteur-etoiles-total").textContent = total;

  const liste = $("liste-missions");
  liste.innerHTML = "";
  MODULES.forEach(mod => {
    const btn = document.createElement("button");
    btn.className = "carte-mission";
    btn.type = "button";
    btn.innerHTML =
      `<span class="emoji" aria-hidden="true">${mod.emoji}</span>
       <span><span class="titre">${mod.titre}</span>
       <span class="sous-titre">${mod.sousTitre}</span></span>
       <span class="etoiles-mission">⭐ ${memoire.lire("etoiles-" + mod.id, 0)}</span>`;
    btn.addEventListener("click", () => ouvrirRegle(mod));
    liste.appendChild(btn);
  });
  montrerEcran("ecran-accueil");
}

/* =========================================================
   Écran « la règle » (toujours montré avant de jouer)
   ========================================================= */
function boutonSon(mot) {
  return `<button class="btn-mini-son" type="button" data-dire="${mot}">🔊 ${mot}</button>`;
}

const REGLES = {
  nm: () => `
    <h3>La règle magique 🪄</h3>
    <p>Les lettres <strong>m</strong>, <strong>b</strong> et <strong>p</strong> sont
    les <strong>3 amies de la lettre m</strong> :</p>
    <div class="lettres-amies">
      <span class="lettre-tuile">m</span>
      <span class="lettre-tuile">b</span>
      <span class="lettre-tuile">p</span>
    </div>
    <p class="grosse-regle">Devant m, b, p<br>→ j'écris <span class="surligne-vert">m</span></p>
    <p>Devant toutes les autres lettres → j'écris <strong>n</strong>.</p>
    <p><strong>L'astuce :</strong> regarde la lettre <em>juste après</em> le trou
    (elle est soulignée en violet dans le jeu).</p>
    <ul class="exemples-regle">
      <li><span class="mot-exemple">cha<span class="surligne-vert">m</span><span class="surligne-jaune">b</span>re</span> ${boutonSon("chambre")}</li>
      <li><span class="mot-exemple">i<span class="surligne-vert">m</span><span class="surligne-jaune">p</span>ortant</span> ${boutonSon("important")}</li>
      <li><span class="mot-exemple">mo<span class="surligne-vert">n</span><span class="surligne-jaune">t</span>agne</span> ${boutonSon("montagne")}</li>
    </ul>`,
  aiia: () => `
    <h3>L'astuce des sons 👂</h3>
    <p>On écrit les lettres <strong>dans l'ordre où on les entend</strong>,
    comme un petit train de sons 🚃🚃 :</p>
    <p class="grosse-regle">J'entends « è » → j'écris <span class="surligne-vert">ai</span><br>
    J'entends « i » puis « a » → j'écris <span class="surligne-vert">ia</span></p>
    <ul class="exemples-regle">
      <li><span class="mot-exemple">m<span class="surligne-vert">ai</span>son</span> — j'entends « è » ${boutonSon("maison")}</li>
      <li><span class="mot-exemple">p<span class="surligne-vert">ia</span>no</span> — j'entends « i » puis « a » ${boutonSon("piano")}</li>
    </ul>
    <p><strong>L'astuce :</strong> dis le mot tout doucement et écoute quel son
    arrive en premier.</p>`,
  ainian: () => `
    <h3>L'astuce des sons 👂</h3>
    <p>Écoute bien le son, comme un petit train de sons 🚃🚃 :</p>
    <p class="grosse-regle">J'entends « in » (comme p<strong>ain</strong>) → j'écris <span class="surligne-vert">ain</span><br>
    J'entends « i » puis « an » → j'écris <span class="surligne-vert">ian</span></p>
    <ul class="exemples-regle">
      <li><span class="mot-exemple">p<span class="surligne-vert">ain</span></span> — j'entends « in » ${boutonSon("pain")}</li>
      <li><span class="mot-exemple">v<span class="surligne-vert">ian</span>de</span> — j'entends « i » puis « an » ${boutonSon("viande")}</li>
    </ul>
    <p><strong>L'astuce :</strong> dis le mot tout doucement et écoute quel son
    arrive en premier.</p>`
};

function ouvrirRegle(mod) {
  moduleActuel = mod;
  $("regle-titre").textContent = mod.emoji + " " + mod.titre;
  $("regle-contenu").innerHTML = REGLES[mod.id]();
  montrerEcran("ecran-regle");
}

/* =========================================================
   La partie
   ========================================================= */
function melanger(tableau) {
  const t = tableau.slice();
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

function commencerPartie() {
  // Moitié de chaque réponse possible, pour que ce soit équilibré.
  const [optA, optB] = moduleActuel.options;
  const lotA = melanger(moduleActuel.mots.filter(m => m.reponse === optA));
  const lotB = melanger(moduleActuel.mots.filter(m => m.reponse === optB));
  const moitie = QUESTIONS_PAR_PARTIE / 2;
  file = melanger(lotA.slice(0, moitie).concat(lotB.slice(0, moitie)));

  indexQuestion = 0;
  etoilesSession = 0;
  $("etoiles-session").textContent = "0";
  montrerEcran("ecran-jeu");
  afficherQuestion();
}

function motComplet(q) { return q.avant + q.reponse + q.apres; }

function afficherQuestion() {
  const q = file[indexQuestion];
  $("progression").style.width = (indexQuestion / file.length * 100) + "%";

  // Le mot à trou ; pour « n ou m ? », la lettre suivante est soulignée.
  let apresHtml = q.apres;
  if (moduleActuel.id === "nm" && q.apres) {
    apresHtml = `<span class="lettre-suivante">${q.apres[0]}</span>` + q.apres.slice(1);
  }
  $("mot-a-trou").innerHTML = q.avant + `<span class="trou">?</span>` + apresHtml;

  // Boutons de réponse (toujours dans le même ordre : c'est rassurant).
  const zone = $("zone-reponses");
  zone.innerHTML = "";
  moduleActuel.options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "btn-reponse";
    b.type = "button";
    b.textContent = opt;
    b.addEventListener("click", () => repondre(opt, b));
    zone.appendChild(b);
  });

  $("texte-indice").hidden = true;
  indiceUtilise = false;
  $("zone-feedback").hidden = true;
  $("zone-feedback").classList.remove("juste", "faux");

  dire(motComplet(q), true);
}

const INDICES = {
  nm: q => {
    const suivante = q.apres ? q.apres[0] : "";
    return `Regarde la lettre soulignée : « ${suivante} ». Est-ce que c'est m, b ou p ?`;
  },
  aiia: () => "Dis le mot doucement : est-ce que tu entends « è », ou « i » puis « a » ?",
  ainian: () => "Dis le mot doucement : est-ce que tu entends « in » comme pain, ou « i » puis « an » ?"
};

function montrerIndice() {
  const q = file[indexQuestion];
  $("texte-indice").textContent = INDICES[moduleActuel.id](q);
  $("texte-indice").hidden = false;
  indiceUtilise = true;
}

const EXPLICATIONS = {
  nm: q => {
    const suivante = q.apres ? q.apres[0] : "";
    return q.reponse === "m"
      ? `Après le trou il y a « <strong>${suivante}</strong> » — c'est une amie de m (m, b, p) → on écrit <strong>m</strong>.`
      : `Après le trou il y a « <strong>${suivante}</strong> » — ce n'est pas m, b ou p → on écrit <strong>n</strong>.`;
  },
  aiia: q => q.reponse === "ai"
    ? `On entend « è » → on écrit a puis i : <strong>ai</strong>.`
    : `On entend « i » puis « a » → on écrit i puis a : <strong>ia</strong>.`,
  ainian: q => q.reponse === "ain"
    ? `On entend « in » (comme dans p<strong>ain</strong>) → on écrit <strong>ain</strong>.`
    : `On entend « i » puis « an » → on écrit <strong>ian</strong>.`
};

const BRAVOS = ["Bravo ! 🌟", "Super ! 🎈", "Génial ! 🚀", "Bien joué ! 🦊", "Excellent ! 🏆"];

function repondre(choix, bouton) {
  const q = file[indexQuestion];
  const boutons = document.querySelectorAll(".btn-reponse");
  boutons.forEach(b => b.disabled = true);

  const juste = choix === q.reponse;
  if (juste) {
    bouton.classList.add("juste");
    etoilesSession++; // l'indice ne fait pas perdre l'étoile : on encourage à l'utiliser
    $("etoiles-session").textContent = etoilesSession;
    $("feedback-message").textContent = BRAVOS[Math.floor(Math.random() * BRAVOS.length)];
  } else {
    bouton.classList.add("faux");
    boutons.forEach(b => { if (b.textContent === q.reponse) b.classList.add("juste"); });
    $("feedback-message").textContent = "Presque ! Regarde bien 👀";
  }

  const complet = motComplet(q);
  const motAffiche = q.avant + `<span class="surligne-vert">${q.reponse}</span>` + q.apres;
  $("feedback-explication").innerHTML =
    `<span class="mot-complet">${motAffiche}</span><br>` + EXPLICATIONS[moduleActuel.id](q);

  const fb = $("zone-feedback");
  fb.classList.add(juste ? "juste" : "faux");
  fb.hidden = false;
  $("btn-continuer").focus();
  dire(complet, false);
}

function questionSuivante() {
  indexQuestion++;
  if (indexQuestion >= file.length) {
    finDePartie();
  } else {
    afficherQuestion();
  }
}

/* =========================================================
   Fin de partie
   ========================================================= */
function finDePartie() {
  $("progression").style.width = "100%";

  const cle = "etoiles-" + moduleActuel.id;
  memoire.ecrire(cle, memoire.lire(cle, 0) + etoilesSession);

  $("fin-score").textContent = `⭐ ${etoilesSession} / ${file.length}`;
  if (etoilesSession === file.length) {
    $("fin-emoji").textContent = "🏆";
    $("fin-titre").textContent = "Champion !";
    $("fin-message").textContent = "Tout juste ! Tu es un vrai champion des mots !";
  } else if (etoilesSession >= file.length * 0.7) {
    $("fin-emoji").textContent = "🎉";
    $("fin-titre").textContent = "Bravo !";
    $("fin-message").textContent = "Très belle partie ! Encore une pour gagner plus d'étoiles ?";
  } else {
    $("fin-emoji").textContent = "💪";
    $("fin-titre").textContent = "Bien essayé !";
    $("fin-message").textContent = "C'est en s'entraînant qu'on devient plus fort. On réessaie ensemble ?";
  }
  montrerEcran("ecran-fin");
}

/* =========================================================
   Branchements
   ========================================================= */
document.querySelectorAll("[data-action='accueil']").forEach(b =>
  b.addEventListener("click", () => { speechSynthesis.cancel(); afficherAccueil(); }));

$("btn-commencer").addEventListener("click", commencerPartie);
$("btn-ecouter").addEventListener("click", () => dire(motComplet(file[indexQuestion]), true));
$("btn-indice").addEventListener("click", montrerIndice);
$("btn-continuer").addEventListener("click", questionSuivante);
$("btn-rejouer").addEventListener("click", commencerPartie);

// Boutons 🔊 des écrans de règle
$("regle-contenu").addEventListener("click", e => {
  const b = e.target.closest("[data-dire]");
  if (b) dire(b.dataset.dire, true);
});

afficherAccueil();

/* ---------- Mode hors-ligne (installable sur téléphone) ---------- */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
