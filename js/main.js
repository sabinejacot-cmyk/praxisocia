/* PraxiSocIA — interactions */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu after clicking a link (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal on scroll */
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* Highlight active nav link based on current page */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* Contact form — front-end only demo handler (no backend on Infomaniak static) */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      // If the form has a real action (e.g. Infomaniak/Formspree), let it submit.
      if (form.getAttribute("action") && form.getAttribute("action") !== "#") {
        return;
      }
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var name = (form.querySelector("[name=nom]") || {}).value || "";
      var email = (form.querySelector("[name=email]") || {}).value || "";
      var msg = (form.querySelector("[name=message]") || {}).value || "";
      var subject = encodeURIComponent("Demande via le site — " + name);
      var body = encodeURIComponent(
        "Nom : " + name + "\nEmail : " + email + "\n\n" + msg
      );
      if (status) {
        status.textContent =
          "Merci ! Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi.";
      }
      window.location.href =
        "mailto:contact@drsabinejacot.ch?subject=" + subject + "&body=" + body;
    });
  }

  /* Footer year */
  var y = document.querySelector("#year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
})();
