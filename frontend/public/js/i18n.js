const translations = {};
async function loadTranslations(lang) {
  const response = await fetch(`/locales/${lang}.json`);
  translations[lang] = await response.json();
}
function translate(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key] || key;
  });
}
async function changeLanguage(lang){
  await loadTranslations(lang);
  translate(lang);
  localStorage.setItem('language', lang);
}
function getCurrentLanguage() {
  return localStorage.getItem('language') || navigator.language.split('-')[0] || 'en';
}
const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
  languageSelector.addEventListener('change', (event) => {
    changeLanguage(event.target.value);
  });
  const currentLanguage = getCurrentLanguage();
  languageSelector.value = currentLanguage;
  loadTranslations(currentLanguage).then(() => {
    translate(currentLanguage);
  });
}
export { loadTranslations, translate, changeLanguage, getCurrentLanguage };