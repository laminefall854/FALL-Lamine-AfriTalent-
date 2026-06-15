document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
  function applyTheme(theme) {
    htmlElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      themeIcon.className = "bi bi-sun-fill text-warning";
    } else {
      themeIcon.className = "bi bi-moon-fill text-dark";
    }
  }
  const navbar = document.querySelector(".custom-navbar");
  const btnBackToTop = document.getElementById("btnBackToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
    if (window.scrollY > 300) {
      btnBackToTop.classList.remove("d-none");
    } else {
      btnBackToTop.classList.add("d-none");
    }
  });

  btnBackToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});