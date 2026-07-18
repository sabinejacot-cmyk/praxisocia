/* PraxiSocIA — interactions */
(function () {
  "use strict";

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Menu déroulant « Démarche » (clic + accessible) */
  document.querySelectorAll(".dropbtn").forEach(function (btn) {
    var menu = btn.nextElementSibling;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown.open").forEach(function (m) {
      m.classList.remove("open");
      var b = m.previousElementSibling;
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });

  /* Apparition au défilement (progressive : contenu visible sans JS) */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* Lien de navigation actif */
  var file = location.pathname.split("/").pop();
  var isHome = file === "" || file === "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === file || (isHome && (href === "/" || href === "index.html"))) {
      a.classList.add("active");
    }
  });

  /* Formulaire de contact
     Par défaut : ouverture du logiciel de messagerie (mailto), fonctionne
     partout sans serveur. Pour un envoi automatique, donner au formulaire
     une vraie "action" (service de formulaire ou script Infomaniak). */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      /* Honeypot anti-spam : si le champ caché est rempli, on ignore. */
      var hp = form.querySelector("[name=site]");
      if (hp && hp.value) {
        e.preventDefault();
        return;
      }
      var action = form.getAttribute("action");
      if (action && action !== "#") {
        return; /* laisse partir vers le service configuré */
      }
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var val = function (n) {
        var el = form.querySelector("[name=" + n + "]");
        return el ? el.value : "";
      };
      var subject = encodeURIComponent(
        "Site PraxiSocIA — " + (val("type") || "Message") + " — " + val("nom")
      );
      var body = encodeURIComponent(
        "Nom : " + val("nom") + "\n" +
        "Organisation : " + val("organisation") + "\n" +
        "Type de demande : " + val("type") + "\n\n" +
        val("message")
      );
      if (status) {
        status.textContent =
          "Merci. Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi.";
      }
      window.location.href =
        "mailto:contact@drsabinejacot.ch?subject=" + subject + "&body=" + body;
    });
  }

  /* Année du pied de page */
  var y = document.querySelector("#year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
})();
