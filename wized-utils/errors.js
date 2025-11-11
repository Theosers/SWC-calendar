// errors.js
const ERRORS = {
  empty_field: "Tous les champs doivent être remplis.",
  invalid_email: "L’adresse e-mail est invalide.",
  email_too_long: "L’adresse e-mail est trop longue (max 254 caractères).",
  email_exists: "Cette adresse e-mail est déjà enregistrée.",
  invalid_name: "Le prénom n’est pas valide (lettres uniquement, 2 à 50 caractères).",
  invalid_last_name: "Le nom n’est pas valide (lettres uniquement, 2 à 50 caractères).",
  password_too_short: "Le mot de passe doit contenir au moins 8 caractères.",
  password_too_weak: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
  password_mismatch: "Les mots de passe ne correspondent pas.",
  network_error: "Problème de connexion. Vérifie ta connexion internet.",
  server_error: "Une erreur interne au serveur est survenue.",
  unknown_error: "Une erreur inconnue est survenue. Réessaie plus tard.",
  too_many_requests: "Nos serveurs sont momentanément saturés. Merci de réessayer dans quelques secondes."
};

function showError(code, sel='[wized="signup-error"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = ERRORS[code] || ERRORS.unknown_error;
  box.classList.add("is-visible");
  box.setAttribute('data-error', code);
}

function clearError(sel='[wized="signup-error"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = "";
  box.classList.remove("is-visible");
  box.removeAttribute('data-error');
}

window.ERRORS = ERRORS;
window.showError = showError;
window.clearError = clearError;
