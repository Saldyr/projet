export function isEmptyBody(body?: object | null): boolean {
  // Cas null/undefined => vide directement
  if (!body) return true;

  // Avec whitelist: true de NestJS, un body "{}" n'arrive ps comme un objet vide
  // mais comme une instance du DTO avec tous les champs à undefined.
  // Object.keys() retournrait les KEYS de la classe même vides => faux négatif.
  // On vérifie donc les VALEURS plutôt que les KEYS :
  // si toutes les valeurs sont undefined, null ou "" : body => vide
  return Object.values(body).every(
    (v) => v === undefined || v === null || v === '',
  );
}
