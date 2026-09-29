// Contenu réel de SENAN Travel (repris tel quel des pages existantes) — rien d'inventé.

export const trajets = [
  {
    numero: "01",
    image: "/Senan Travel Parakou.webp",
    ville: "Cotonou - Parakou",
    duree: "6 heures",
    titre: "Le Nord vivant",
    description: "Marchés vivants, culture Bariba et hospitalité du Nord. Une ville qui ne dort jamais",
    prix: "7000 F CFA",
  },
  {
    numero: "02",
    image: "/Senan Travel-Djougou.webp",
    ville: "Cotonou - Djougou",
    duree: "7 heures",
    titre: "L'Atacora authentique",
    description: "Montagne de l'Atacora, tradition Yom et artisanat local. L'authenticité à l'état pur.",
    prix: "7000 F CFA",
  },
  {
    numero: "03",
    image: "/Senan Travel Nati.webp",
    ville: "Cotonou - Natitingou",
    duree: "6 heures",
    titre: "Voyage dans le temps",
    description: "Berceau des états Sombas, joyau de l'Atacora. Un voyage dans le temps",
    prix: "7000 F CFA",
  },
];

export const services = [
  {
    icon: "search",
    titre: "Choisissez votre trajet",
    texte: "Sélectionnez votre ville de départ, votre destination et votre date de voyage.",
  },
  {
    icon: "card",
    titre: "Payez en toute sécurité",
    texte: "Réglez votre billet en ligne via notre plateforme sécurisée, en quelques secondes.",
  },
  {
    icon: "ticket",
    titre: "Recevez votre ticket digital",
    texte: "Votre billet arrive directement sur votre téléphone. Présentez-le le jour J.",
  },
  {
    icon: "shield",
    titre: "La transparence, toujours",
    texte: "Prix clairs, horaires fiables, paiements traçables. Aucune mauvaise surprise.",
  },
  {
    icon: "clock",
    titre: "Réserver en moins de 3 minutes",
    texte: "Fini les files d'attente. En quelques gestes, votre billet est payé et votre ticket digital arrive instantanément.",
  },
  {
    icon: "support",
    titre: "Support voyageur",
    texte: "Notre équipe vous accompagne par téléphone, WhatsApp ou en agence. Réponse rapide, 7j/7.",
  },
];

export const stats = [
  { end: 10000, suffix: "+", decimals: 0, label: "Voyageurs servis", icon: "users" },
  { end: 6, suffix: "", decimals: 0, label: "Destinations actives", icon: "pin" },
  { end: 4.9, suffix: "/5", decimals: 1, label: "Note moyenne", icon: "star" },
  { end: 100, suffix: "%", decimals: 0, label: "En ligne, à toute heure", icon: "globe" },
];

export const valeurs = [
  {
    label: "CONFIANCE",
    titre: "La transparence, toujours",
    texte:
      "Prix clairs, horaires fiables, paiements traçables. Aucune mauvaise surprise c'est note engagement envers chaque voyageurs béninois",
    image: "/Senan-Travel-confiance.webp",
  },
  {
    label: "RAPIDITE",
    titre: "Réserver en moins de 3 minutes",
    texte:
      "Fini les files d'attente. En quelques gestes ,votre billet est payé et votre ticket digital arrive instantanément",
    image: "/Senan-Travel-rapidité.webp",
  },
  {
    label: "SECURITE & MODERNITE",
    titre: "Une fierté africaine, tournée vers demain",
    texte:
      "Paiements chiffrés, données protégées et une identité contemporaine, pensée pour les réalités du marché africain",
    image: "/Senan-Travel-moderne.webp",
  },
];

export const equipe = [
  { titre: "Direction", texte: "Vision & stratégie" },
  { titre: "Opérations", texte: "Trajets & partenaires" },
  { titre: "Support", texte: "A votre écoute 7j/7" },
  { titre: "Tech", texte: "Plateforme & paiements" },
];

export const temoignages = [
  { nom: "Adjovi K.", lieu: "Cotonou. Rapidité", texte: "J'ai réservé Cotonou-Parakou en 2 minutes depuis mon lit. Rapide et totalement sans stress.", initiale: "A" },
  { nom: "Moussa I.", lieu: "Parakou. Confort", texte: "Le confort à bord et la ponctualité m'ont bluffé", initiale: "M" },
  { nom: "Célestine A.", lieu: "Abomey. Sécurité", texte: "Payer par Mobile Money était hyper sécurisé. Ticket reçu aussitot", initiale: "C" },
  { nom: "Rachidou B.", lieu: "Djougou. Professionnalisme", texte: "Service professsionnel du début jusqu'à la fin. Equipe réactive", initiale: "B" },
  { nom: "Yéwande D.", lieu: "Natitingou. Confiance", texte: "Je recommande les yeux fermés. Fiable, moderne et 100% béninois", initiale: "Y" },
];

export const faqs = [
  { q: "Quels services propose SENAN Travel ?", r: "Nous proposons la réservation de billets de voyage inter-villes au Bénin, le paiement en ligne sécurisé et la réception instantanée de votre ticket digital." },
  { q: "Comment réserver mon billet ?", r: "Choisissez votre trajet et votre date sur le site, réglez en ligne via Mobile Money ou carte, et recevez votre ticket digital instantanément." },
  { q: "Mon paiement en ligne est-il sécurisé ?", r: "Oui, tous les paiements passent par des partenaires certifiés (MTN, Moov, Celtiis, Visa) avec chiffrement de bout en bout." },
  { q: "Que faire si je dois annuler mon voyage ?", r: "Contactez notre équipe par téléphone ou WhatsApp au moins 24h avant le départ pour connaître les conditions de remboursement ou de report." },
];

// Photos libres de droits (Unsplash License), utilisées en fond des bannières internes
// faute d'avoir une photo dédiée pour chaque page.
export const unsplash = {
  busStation:
    "https://images.unsplash.com/photo-1699645994613-a4b91c7921f4?q=80&w=1600&auto=format&fit=crop",
  streetAfrica:
    "https://images.unsplash.com/photo-1649486116245-0dbbbc84dc6b?q=80&w=1600&auto=format&fit=crop",
};

// Offres mises en avant dans l'app, façon Glovo/Uber (bandeau promo sur l'accueil).
// ⚠️ Contenu d'exemple à remplacer par de vraies offres commerciales de Senan.
export const promos = [
  {
    titre: "-15% sur Cotonou → Parakou",
    texte: "Valable ce week-end, dans la limite des places disponibles.",
    couleur: "#00B4D8",
  },
  {
    titre: "Premier trajet : -1000 FCFA",
    texte: "Offre de bienvenue sur ta toute première réservation.",
    couleur: "#FF8C42",
  },
  {
    titre: "Trajet Djougou à petit prix",
    texte: "Réserve avant 48h et profite d'un tarif réduit.",
    couleur: "#1B263B",
  },
];

export const contact = {
  adresse: "Cotonou Rép. Bénin",
  email: "contact@senantravel.com",
  telAffiche: "+2290197000000",
  telHref: "tel:+2290197000000",
  horaires: "Lun-Sam . 08h00 - 19h00",
};
