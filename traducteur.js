/* =========================================================
   PraxiSocIA — Traducteur visuel
   Caméra → reconnaissance d'objets (COCO-SSD, TensorFlow.js)
   → traduction (dictionnaire local) → prononciation (Web Speech).
   Tout se passe dans le navigateur : aucune image n'est envoyée.
   ========================================================= */
(function () {
  "use strict";

  var video   = document.getElementById("tv-video");
  var canvas  = document.getElementById("tv-canvas");
  var ctx     = canvas.getContext("2d");
  var startBtn= document.getElementById("tv-start");
  var langSel = document.getElementById("tv-langue");
  var speakBtn= document.getElementById("tv-speak");
  var statusEl= document.getElementById("tv-status");
  var resultEl= document.getElementById("tv-result");
  var srcEl   = document.getElementById("tv-source");
  var confEl  = document.getElementById("tv-conf");
  var stage   = document.getElementById("tv-stage");

  var model = null;
  var stream = null;
  var running = false;
  var langue = "fr";
  var lastLabel = null;      // dernier objet prononcé
  var lastPhrase = "";       // dernière phrase traduite (pour le bouton audio)

  // ---- Remplir le sélecteur de langue -------------------------------------
  Object.keys(window.TV_LANGUES).forEach(function (code) {
    var L = window.TV_LANGUES[code];
    var opt = document.createElement("option");
    opt.value = code;
    opt.textContent = L.drapeau + "  " + L.nom;
    if (code === "fr") opt.selected = true;
    langSel.appendChild(opt);
  });

  langSel.addEventListener("change", function () {
    langue = langSel.value;
    lastLabel = null; // force le rafraîchissement de la traduction affichée
  });

  function setStatus(txt) { statusEl.textContent = txt; }

  // ---- Traduction ---------------------------------------------------------
  function traduire(label) {
    var entry = window.TV_DICO[label];
    if (!entry) return null;
    return entry[langue] || entry.fr;
  }

  // ---- Synthèse vocale ----------------------------------------------------
  function prononcer(phrase) {
    if (!("speechSynthesis" in window) || !phrase) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(phrase);
      u.lang = window.TV_LANGUES[langue].voix;
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (e) { /* silencieux */ }
  }

  speakBtn.addEventListener("click", function () {
    if (lastPhrase) prononcer(lastPhrase);
  });

  // ---- Affichage du résultat ---------------------------------------------
  function afficher(label, score) {
    var phrase = traduire(label);
    if (!phrase) return;
    srcEl.textContent = "« " + label + " »";
    resultEl.textContent = phrase;
    confEl.textContent = Math.round(score * 100) + " %";
    speakBtn.hidden = false;
    lastPhrase = phrase;

    // Ne prononce automatiquement que si l'objet a changé
    if (label !== lastLabel) {
      lastLabel = label;
      prononcer(phrase);
    }
  }

  // ---- Boucle de détection ------------------------------------------------
  function boucle() {
    if (!running || !model) return;
    if (video.readyState < 2) { requestAnimationFrame(boucle); return; }

    // Ajuste le canvas à la vidéo
    if (canvas.width !== video.videoWidth) {
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    model.detect(video).then(function (preds) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ne garde que les détections fiables, trie par confiance
      var bons = preds.filter(function (p) { return p.score > 0.5; })
                      .sort(function (a, b) { return b.score - a.score; });

      bons.forEach(function (p, i) {
        var x = p.bbox[0], y = p.bbox[1], w = p.bbox[2], h = p.bbox[3];
        var principal = (i === 0);
        ctx.lineWidth = principal ? 4 : 2;
        ctx.strokeStyle = principal ? "#B36A52" : "rgba(40,95,99,.7)";
        ctx.strokeRect(x, y, w, h);

        var t = traduire(p.class) || p.class;
        var etiquette = t + "  ·  " + Math.round(p.score * 100) + "%";
        ctx.font = "600 20px Inter, sans-serif";
        var tw = ctx.measureText(etiquette).width;
        ctx.fillStyle = principal ? "#B36A52" : "rgba(40,95,99,.85)";
        ctx.fillRect(x, y - 30, tw + 16, 30);
        ctx.fillStyle = "#fff";
        ctx.fillText(etiquette, x + 8, y - 9);
      });

      if (bons.length) {
        afficher(bons[0].class, bons[0].score);
        setStatus("Objet identifié — pointez un autre objet pour continuer.");
      } else {
        setStatus("Aucun objet reconnu… rapprochez-vous ou changez d'angle.");
      }

      requestAnimationFrame(boucle);
    }).catch(function () {
      requestAnimationFrame(boucle);
    });
  }

  // ---- Démarrage ----------------------------------------------------------
  function chargerModele() {
    setStatus("Chargement du modèle de reconnaissance…");
    return cocoSsd.load().then(function (m) { model = m; });
  }

  function ouvrirCamera() {
    setStatus("Ouverture de la caméra…");
    var contraintes = {
      audio: false,
      video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } }
    };
    return navigator.mediaDevices.getUserMedia(contraintes).then(function (s) {
      stream = s;
      video.srcObject = s;
      return video.play();
    });
  }

  function demarrer() {
    if (running) { arreter(); return; }
    startBtn.disabled = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus("Ce navigateur ne permet pas l'accès à la caméra.");
      startBtn.disabled = false;
      return;
    }

    var p = model ? Promise.resolve() : chargerModele();
    p.then(ouvrirCamera).then(function () {
      running = true;
      stage.classList.add("live");
      startBtn.textContent = "Arrêter";
      startBtn.disabled = false;
      setStatus("Pointez la caméra vers un objet.");
      requestAnimationFrame(boucle);
    }).catch(function (err) {
      startBtn.disabled = false;
      if (err && err.name === "NotAllowedError") {
        setStatus("Accès à la caméra refusé. Autorisez-le puis réessayez.");
      } else {
        setStatus("Impossible de démarrer : " + (err && err.message ? err.message : err));
      }
    });
  }

  function arreter() {
    running = false;
    stage.classList.remove("live");
    if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
    video.srcObject = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startBtn.textContent = "Démarrer la caméra";
    setStatus("Caméra arrêtée.");
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  startBtn.addEventListener("click", demarrer);
  window.addEventListener("pagehide", arreter);
})();
