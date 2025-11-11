window.Webflow ||= [];
window.Webflow.push(() => {
  const ERRORS = {
  empty_field: "Tous les champs doivent être remplis.",

  // Email
  invalid_email: "L’adresse e-mail est invalide.",
  email_too_long: "L’adresse e-mail est trop longue (max 254 caractères).",
  email_exists: "Cette adresse e-mail est déjà enregistrée.",

  // Nom et prénom
  invalid_name: "Le prénom n’est pas valide (lettres uniquement, 2 à 50 caractères).",
  invalid_last_name: "Le nom n’est pas valide (lettres uniquement, 2 à 50 caractères).",

  // Mots de passe
  password_too_short: "Le mot de passe doit contenir au moins 8 caractères.",
  password_too_weak: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
  password_mismatch: "Les mots de passe ne correspondent pas.",

  // Erreurs serveur / réseau
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
  function validateClient(i) {
  const email   = i["input:email"]?.trim().toLowerCase() || "";
  const name    = i["input:name"]?.trim() || "";
  const last    = i["input:last_name"]?.trim() || i["input:last-name"]?.trim() || "";
  const pass    = i["input:password"]?.trim() || "";
  const confirm = i["input:confirm-password"]?.trim() || "";


  // --- Vérification champs vides
  if (!email || !name || !last || !pass || !confirm) return "empty_field";

  // --- Vérification email
  if (email.length > 75) return "email_too_long";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isEmail) {
    return "invalid_email";
  }

  // --- Vérification nom / prénom
  const nameRegex = /^[A-Za-zÀ-ÿ' -]{2,50}$/;

  if (!nameRegex.test(last)) return "invalid_last_name";
  if (!nameRegex.test(name)) return "invalid_name";

  // --- Vérification mot de passe
  if (pass.length < 8) return "password_too_short";

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  if (!passwordRegex.test(pass)) return "password_too_weak";

  // --- Vérification correspondance mot de passe
  if (pass !== confirm) return "password_mismatch";

  return "";
}
  window.ERRORS = ERRORS;
  window.showError = showError;
  window.clearError = clearError;
  window.validateClient = validateClient;

  console.log("✅ Fonctions globales Webflow disponibles :");
});
 
