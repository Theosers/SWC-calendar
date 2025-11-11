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
  too_many_requests: "Nos serveurs sont momentanément saturés. Merci de réessayer dans quelques secondes.",
};

function showError(code, sel='[wized="signup-error"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = ERRORS[code] || ERRORS.unknown_error;
  box.classList.add("is-visible");
  box.setAttribute("data-error", code);
}

function clearError(sel='[wized="signup-error"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = "";
  box.classList.remove("is-visible");
  box.removeAttribute("data-error");
}

function getFormValidationError(i) {
  const email   = i["input:email"]?.trim().toLowerCase() || "";
  const name    = i["input:name"]?.trim() || "";
  const last    = i["input:last_name"]?.trim() || i["input:last-name"]?.trim() || "";
  const pass    = i["input:password"]?.trim() || "";
  const confirm = i["input:confirm-password"]?.trim() || "";

  if (!email || !name || !last || !pass || !confirm) return "empty_field";
  if (email.length > 75) return "email_too_long";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "invalid_email";
  const nameRegex = /^[A-Za-zÀ-ÿ' -]{2,50}$/;
  if (!nameRegex.test(last)) return "invalid_last_name";
  if (!nameRegex.test(name)) return "invalid_name";
  if (pass.length < 8) return "password_too_short";
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  if (!passwordRegex.test(pass)) return "password_too_weak";
  if (pass !== confirm) return "password_mismatch";
  return null;
}

Object.assign(window, { ERRORS, showError, clearError, validateClient });

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log("✅ Fonctions globales Webflow disponibles :", window.validateClient);
});
