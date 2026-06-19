document.addEventListener("DOMContentLoaded", () => {
    // 1. ÉLÉMENTS HTML
    const navbar = document.querySelector(".custom-navbar");
    const btnBackToTop = document.getElementById("btnBackToTop");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    // 2. GESTION DU THÈME (DARK/LIGHT MODE)
    const savedTheme = localStorage.getItem("theme") || "light";
    if (htmlElement) {
        htmlElement.setAttribute("data-bs-theme", savedTheme);
        updateThemeIcon(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            htmlElement.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === "dark") {
            themeIcon.className = "bi bi-sun-fill text-warning";
        } else {
            themeIcon.className = "bi bi-moon-fill text-dark";
        }
    }

    // 3. GESTION DU SCROLL (NAVBAR & BOUTON RETOUR EN HAUT)
    window.addEventListener("scroll", () => {
        // Effet Navbar au scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        // Apparition du bouton retour en haut
        if (btnBackToTop) {
            if (window.scrollY > 300) {
                btnBackToTop.classList.remove("d-none");
            } else {
                btnBackToTop.classList.add("d-none");
            }
        }
    });

    // 4. CLIC RETOUR EN HAUT
    if (btnBackToTop) {
        btnBackToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
  // Sélection de tous les compteurs
  const counters = document.querySelectorAll(".stat-counter");

  counters.forEach(counter => {
    // Force la valeur de départ à 0 au cas où
    counter.innerText = "0";

    const updateCounter = () => {
      // Récupère la cible (ex: 167)
      const target = parseInt(counter.getAttribute("data-target"), 10);
      // Récupère le chiffre actuellement affiché
      const current = parseInt(counter.innerText, 10);

      // Calcule un pas d'incrémentation dynamique (plus le chiffre est grand, plus ça va vite)
      const increment = Math.ceil(target / 100);

      if (current < target) {
        // Ajoute le pas à la valeur actuelle
        counter.innerText = Math.min(current + increment, target);
        // Rappelle la fonction toutes les 20 millisecondes pour continuer l'effet
        setTimeout(updateCounter, 20);
      } else {
        // Sécurité : s'assure que le chiffre final est exactement la cible
        counter.innerText = target;
      }
    };

    // Lance l'animation immédiatement
    updateCounter();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const freelanceCards = document.querySelectorAll(".freelance-card-wrapper");

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      freelanceCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          // Affiche la carte avec une transition fluide
          card.style.display = "block";
          setTimeout(() => card.style.opacity = "1", 10);
        } else {
          // Masque la carte
          card.style.opacity = "0";
          card.style.display = "none";
        }
      });

      // Optionnel : change le style visuel du bouton actif
      filterButtons.forEach(btn => btn.classList.replace("btn-dark", "btn-primary"));
      this.classList.replace("btn-primary", "btn-dark");
    });
  });
});

const form = document.getElementById("contactForm");
  const successAlert = document.getElementById("successAlert");

  // La condition "if (form)" est CRUCIALE : elle évite de bloquer les autres pages
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      let isFormValid = true;

      // Validation du Prénom
      const firstName = document.getElementById("firstName");
      if (firstName && firstName.value.trim() === "") {
        setInvalid(firstName, "Le prénom est requis.");
        isFormValid = false;
      } else if (firstName) {
        setValid(firstName);
      }

      // Validation du Nom
      const lastName = document.getElementById("lastName");
      if (lastName && lastName.value.trim() === "") {
        setInvalid(lastName, "Le nom est requis.");
        isFormValid = false;
      } else if (lastName) {
        setValid(lastName);
      }

      // Validation de l'Email
      const email = document.getElementById("email");
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (email) {
        if (email.value.trim() === "") {
          setInvalid(email, "L'adresse email est requise.");
          isFormValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
          setInvalid(email, "Veuillez entrer une adresse email valide.");
          isFormValid = false;
        } else {
          setValid(email);
        }
      }

      // Validation du Sujet
      const subject = document.getElementById("subject");
      if (subject) {
        if (subject.value === "") {
          setInvalid(subject, "Veuillez sélectionner un sujet.");
          isFormValid = false;
        } else {
          setValid(subject);
        }
      }

      // Validation du Message
      const message = document.getElementById("message");
      if (message) {
        const messageValue = message.value.trim();
        if (messageValue === "") {
          setInvalid(message, "Le message est requis.");
          isFormValid = false;
        } else if (messageValue.length < 20) {
          setInvalid(message, `Le message doit contenir au moins 20 caractères (actuellement : ${messageValue.length}).`);
          isFormValid = false;
        } else {
          setValid(message);
        }
      }

      // Résultat final
      if (isFormValid && successAlert) {
        successAlert.classList.remove("d-none");
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        form.reset();
        resetFormStyles();
      }
    });
  }