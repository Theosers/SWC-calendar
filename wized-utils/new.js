const ERRORS = {
  empty_field: "L’email et le mot de passe sont obligatoires.",
  invalid_email: "L’adresse e-mail est invalide.",
  email_too_long: "L’adresse e-mail est trop longue (max 254 caractères).",
  password_too_short: "Le mot de passe doit contenir au moins 8 caractères.",
  password_too_weak: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
  network_error: "Problème de connexion. Vérifie ta connexion internet.",
  server_error: "Une erreur interne au serveur est survenue.",
  unknown_error: "Une erreur inconnue est survenue. Réessaie plus tard.",
  too_many_requests: "Nos serveurs sont momentanément saturés. Merci de réessayer dans quelques secondes.",
  unauthorized: "Identifiants invalides",
  email_exists: "Cette adresse e-mail est déjà enregistrée."
};

function showError(code, sel = '[wized="error-message"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = ERRORS[code] || ERRORS.unknown_error;
  box.classList.add("is-visible");
  box.setAttribute("data-error", code);
}

function clearError(sel = '[wized="error-message"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = "";
  box.classList.remove("is-visible");
  box.removeAttribute("data-error");
}

/**
 * Vérifie les champs du formulaire (email + password uniquement)
 * @param {object} i - Inputs Wized (ex: i["input:email"])
 * @returns {string|null} Code d’erreur s’il y en a une, sinon null
 */
function getFormValidationError(i) {
  const email = i["input:email"]?.trim().toLowerCase() || "";
  const pass  = i["input:password"]?.trim() || "";

  // --- Champs obligatoires
  if (!email || !pass) return "empty_field";

  // --- Vérification email
  if (email.length > 254) return "email_too_long";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "invalid_email";

  // --- Vérification mot de passe
  if (pass.length < 8) return "password_too_short";
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  if (!passwordRegex.test(pass)) return "password_too_weak";

  // ✅ Tout est bon
  return null;
}

/**
 * Analyse la réponse serveur (r.Sign_up, r.Login, etc.)
 * @param {object} response - La réponse Wized
 * @returns {string|null} Code d’erreur s’il y en a un, sinon null
 */
function getServerValidationError(response) {
  if (!navigator.onLine) return "network_error";
  if (!response || typeof response.status === "undefined") return "network_error";

  if (response.status >= 500) return "server_error";
  if (response.status === 429) return "too_many_requests";
  if (response.status === 403) return "email_exists";
  if (response.status === 401) return "unauthorized";
  if (response.status >= 400) return "unknown_error";

  return null;
}

Object.assign(window, {
  ERRORS,
  showError,
  clearError,
  getFormValidationError,
  getServerValidationError
});

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log("✅ Validation email/password prête :", window.getFormValidationError);
});
