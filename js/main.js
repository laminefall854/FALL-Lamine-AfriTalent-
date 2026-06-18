document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".custom-navbar");
    const btnBackToTop = document.getElementById("btnBackToTop");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;
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
    window.addEventListener("scroll", () => {
        // Effet Navbar au scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }
        if (btnBackToTop) {
            if (window.scrollY > 300) {
                btnBackToTop.classList.remove("d-none");
            } else {
                btnBackToTop.classList.add("d-none");
            }
        }
    });

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
  const counters = document.querySelectorAll(".stat-counter");

  counters.forEach(counter => {
    counter.innerText = "0";

    const updateCounter = () => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      // Récupère le chiffre actuellement affiché
      const current = parseInt(counter.innerText, 10);
      const increment = Math.ceil(target / 100);

      if (current < target) {
        
        counter.innerText = Math.min(current + increment, target);
        
        setTimeout(updateCounter, 20);
      } else {

        counter.innerText = target;
      }
    };

    updateCounter();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1 }); 

  sections.forEach(section => observer.observe(section));
});