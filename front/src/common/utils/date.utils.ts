/**
 * Convertit une date (objet Date ou string ISO) en un string au format français
 * @param date - date à formater (Date ou string)
 * @returns La date formatée en string ou une chaîne vide si la date est invalide
 * formatDateToFrench(new Date()) => "7 Septembre 2026"
 * formatDateToFrench("2026-06-07T00:00:00.000Z") => "7 Septembre 2026"
 */

export function formatDateFr(date: Date | string): string {

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if(isNaN(dateObj.getTime())) return '';

    const dateString = dateObj.toLocaleDateString(
        'fr-FR', 
        {
            day: "numeric",
            month: "long",
            year: "numeric"

        }
    )

    return dateString;
}