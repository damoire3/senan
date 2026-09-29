# SENAN Travel

Réservation de bus au Bénin — un **site vitrine** (présentation, marketing) et une **app PWA installable** (réservation, tickets, reçus, notifications) construite avec Next.js, React et Tailwind CSS.

Ce README résume ce qui est fait, ce qui est simulé/provisoire, et ce qu'il reste à faire avant une mise en production réelle.

---

## 🗂️ Structure du projet

**Site vitrine** (pages publiques, header/footer classiques) :
- `/` — Accueil
- `/about` — À propos
- `/services` — Services
- `/destinations` — Destinations
- `/faq` — FAQ
- `/contact` — Contact

**App PWA** (`/reservations/*`, interface indépendante avec sa propre barre du haut / navigation basse, installable sur l'écran d'accueil) :
- `/reservations` — Réserver un trajet (assistant en 4 étapes) + bandeau de promos
- `/reservations/tickets` — Mes tickets
- `/reservations/recus` — Mes reçus (imprimables)
- `/reservations/notifications` — Notifications
- `/reservations/profil` — Profil, installation de l'app, réinitialisation des données

Le contenu texte/trajets/contact de Senan est centralisé dans `app/data/senan.ts`.

---

## ✅ Ce qui est fait

- Design du site repris du modèle "Bus Charter" (structure, header flottant, animations au scroll, effet de survol) avec les couleurs, polices, images et textes de Senan.
- Header fixe : se masque en descendant, réapparaît en remontant (y compris en bas de page).
- App de réservation en 4 étapes (trajet → voyageur → paiement → ticket), avec messages d'erreur clairs si un champ manque.
- Génération d'un vrai ticket + reçu + notification à chaque réservation.
- Recherche sur la page d'accueil du site → pré-remplit directement l'app.
- Formulaire de contact → ouvre WhatsApp avec le message pré-rempli.
- Formulaire newsletter fonctionnel (validation + confirmation).
- Écran d'onboarding au premier lancement de l'app (présentation + inscription rapide), avec bandeau de promos façon Glovo/Uber.
- PWA installable : manifeste, service worker (mode hors-ligne basique), bannière d'installation dans l'app.

---

## ⚠️ Simulé / provisoire — à remplacer avant la mise en production

| Élément | État actuel | À faire |
|---|---|---|
| **Paiement** | Simulé (faux délai de 1,4s, aucun prélèvement réel) | Intégrer un vrai agrégateur (FedaPay, KkiaPay, PayGate...) pour MTN/Moov/Celtiis/Visa |
| **Stockage des tickets/comptes** | `localStorage` sur l'appareil uniquement — rien n'est partagé entre appareils, tout peut être perdu si le cache est vidé | Backend + base de données + comptes utilisateurs réels |
| **Formulaire de contact** | Ouvre WhatsApp (aucun serveur e-mail) | Brancher un vrai service (Resend, SendGrid...) si un email pro est souhaité |
| **Newsletter** | Valide l'e-mail mais ne l'envoie nulle part | Brancher un vrai outil d'e-mailing (Mailchimp, Brevo...) |
| **Icônes PWA** | SVG uniquement | Générer de vraies icônes PNG (192/512px) — le SVG fonctionne mal sur "Ajouter à l'écran d'accueil" iOS |
| **Promos affichées dans l'app** | 3 exemples inventés pour la démo (`app/data/senan.ts`, `export const promos`) | Remplacer par les vraies offres commerciales |
| **Réseaux sociaux (footer)** | Icônes non cliquables (pas d'URL fournie) | Ajouter les vrais liens |
| **Mentions légales / Confidentialité** | Juste du texte dans le footer, aucune page derrière | Rédiger et créer ces pages |
| **Équipe (page À propos)** | 4 pôles (Direction, Opérations, Support, Tech) sans noms ni photos | Ajouter les vraies infos si souhaité |
| **Notifications** | Uniquement dans l'app (pas de vraies push/SMS) | Web Push ou SMS (Twilio, etc.) si besoin de notifier même app fermée |

---

## 🎨 Reste à faire côté design (fidélité au modèle "Bus Charter")

- Les pages **Services**, **FAQ**, **Destinations** suivent la structure générale du modèle mais n'ont pas encore été comparées écran par écran à l'original (contrairement à l'accueil et À propos, relus plus en détail).
- Les équivalents des pages **notre flotte / détail d'un bus**, **équipe avec photos**, **blog** du modèle n'ont pas d'équivalent construit (Senan n'avait pas ce contenu).
- Une relecture visuelle comparative (capture d'écran du modèle à côté du rendu Senan) permettrait d'ajuster les derniers écarts d'espacement/proportions.

---

## 🚀 Prochaines étapes techniques recommandées, par priorité

1. **Backend + base de données** — sans ça, les tickets restent coincés sur un seul téléphone.
2. **Vraie passerelle de paiement** — condition pour un vrai lancement commercial.
3. **Icônes PNG + test réel "Ajouter à l'écran d'accueil"** sur Android et iOS.
4. **Contenu réel** : réseaux sociaux, promos, mentions légales, équipe.
5. **E-mailing** (contact + newsletter) si un canal e-mail est voulu en plus de WhatsApp.
6. **Notifications push/SMS** si besoin d'alerter les voyageurs même app fermée.
7. **Déploiement** (Vercel ou équivalent) + nom de domaine + certificat HTTPS (obligatoire pour une PWA).
8. **Tests sur vrais appareils** (Android/iOS, connexions lentes) avant mise en ligne.

---

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

- Site vitrine : toutes les pages sauf `/reservations`.
- App : `http://localhost:3000/reservations` (le premier accès déclenche l'onboarding).

Ce projet utilise Next.js (App Router), Tailwind CSS v4, et [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour les polices (Playfair Display, Roboto Serif).

## Déploiement

Le plus simple reste [Vercel](https://vercel.com/new), créateur de Next.js — voir la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying). Une PWA nécessite HTTPS pour être installable : Vercel le fournit automatiquement.
