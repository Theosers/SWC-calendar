export const ERRORS = {
  empty_field: "Tous les champs doivent être remplis.",
  invalid_email: "L’adresse e-mail est invalide.",
  ...
};

export function showError(code, sel='[wized="signup-error"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = ERRORS[code] || ERRORS.unknown_error;
  box.classList.add("is-visible");
  box.setAttribute("data-error", code);
}

export function clearError(sel='[wized="signup-error"]') {
  const box = document.querySelector(sel);
  if (!box) return;
  box.textContent = "";
  box.classList.remove("is-visible");
  box.removeAttribute("data-error");
}

