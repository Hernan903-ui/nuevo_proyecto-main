import i18next from "i18next";

document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector");

  if (!languageSelector) {
    return;
  }

  // Cambiar idioma al seleccionar una opción
  languageSelector.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    i18next.changeLanguage(selectedLanguage, () => {
      updateContent();
    });
  }, (err) => {
    console.error("Error changing language:", err);
  });

  // Actualizar el contenido traducido
  const updateContent = () => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      element.textContent = i18next.t(key);
    });
  };

  // Inicializar al cargar la página
  updateContent();
});