import type { Translations } from "./en";

export const de: Translations = {
  nav: {
    about: "Über mich",
    experience: "Erfahrung",
    projects: "Projekte",
    contact: "Kontakt",
    resume: "Lebenslauf",
    downloadResume: "Lebenslauf herunterladen",
    cvFile: "/Lebenslauf_Rauscher.pdf",
  },
  hero: {
    greeting: "Hallo, ich bin",
    title: "Informatik Student @ FH Wiener Neustadt",
    tagline: "Noch am Lernen. Schon am entwickeln.",
    downloadResume: "Lebenslauf herunterladen",
    getInTouch: "Kontakt aufnehmen",
    scroll: "Scroll",
  },
  about: {
    sectionHeading: "Über mich",
    subtitle: "Lerne mich kennen",
    bio1: "Ich bin ein angehender Softwareentwickler aus Wien, der es liebt, saubere, schnelle Anwendungen zu entwickeln. Meine Leidenschaft ist es, komplexe Probleme in einfache, elegante Lösungen umzuwandeln. Ich achte auf Details – sowohl im Code als auch im Design.",
    bio2: "Derzeit bin ich darauf fokussiert, meine Fähigkeiten zu verbessern, um ein zuverlässiger Full-Stack-Entwickler zu werden. Immer bereit, neue Technologien zu erlernen und spannende Projekte zu übernehmen.",
    facts: {
      basedIn: "Herkunft",
      education: "Ausbildung",
      available: "Verfügbarkeit",
      languages: "Sprachen",
    },
    factValues: {
      basedIn: "Wien",
      education: "FH Wiener Neustadt",
      available: "Offen für neue Projekte",
      languages: "Deutsch, Englisch, Spanisch",
    },
  },
  experience: {
    sectionHeading: "Erfahrung",
    subtitle: "Wo ich gearbeitet habe",
    items: [
      {
        role: "Marketing Praktikant",
        company: "Gurkerl.at",
        location: "Wien, Österreich",
        period: "Jul 2023 – Jan 2025",
        type: "Vollzeit / Teilzeit / Hybrid",
        bullets: [
          "Webseiten für bestimmte Kampagnen erstellen und anpassen",
          "Social-Media-Kommunikation und Content-Erstellung",
          "Erstellung und Verwaltung von Kampagnen",
        ],
        tech: ["UI/UX", "Social Media", "Werbung"],
      },
      {
        role: "Fußballtrainer",
        company: "ASK Oberwaltersdorf",
        location: "Oberwaltersdorf",
        period: "Jul 2023 – Aktuell",
        type: "Ehrenamtlich",
        bullets: [
          "Training einer Jugendfußballmannschaft (aktuell U14) mit Fokus auf Spielentwicklung, Teamarbeit und Sportgeist",
          "Organisieren und Leiten von regelmäßigen Trainingseinheiten sowie Erstellung von Trainingsplänen",
          "Zusammenarbeit mit Eltern und Vereinsführung, um ein positives und unterstützendes Umfeld für die Spieler zu gewährleisten",
        ],
        tech: ["Coaching", "Teamarbeit", "Kommunikation"],
      },
    ],
  },
  projects: {
    sectionHeading: "Projekte",
    subtitle: "Was ich bisher entwickelt habe:",
    inProgress: "Weitere folgen bald",
    checkBack: "// bald verfügbar",
    featured: "Ausgewähltes Projekt",
    showLess: "Weniger anzeigen",
    showMore: "Mehr Projekte anzeigen",
    descriptions: {
      "Browsing-Wrapped":
        "Eine Safari-Erweiterung, die deinen Browserverlauf aufzeichnet und in eine animierte Zusammenfassung verwandelt. Top-Seiten, verbrachte Zeit, wiederkehrende Themen – alles auf deinem Gerät berechnet.",
    } as Record<string, string>,
  },
  contact: {
    sectionHeading: "Kontakt aufnehmen",
    subtitle: "Hast du eine Frage oder möchtest du zusammenarbeiten?",
    intro:
      "Ich bin jederzeit offen für neue Möglichkeiten. Ob du ein Projekt im Sinn hast, eine passende Rolle oder einfach Kontakt aufnehmen möchtest – melde dich gerne.",
    nameLabel: "Name *",
    emailLabel: "E-Mail *",
    messageLabel: "Nachricht *",
    namePlaceholder: "Max Mustermann",
    emailPlaceholder: "max.mustermann@beispiel.com",
    messagePlaceholder: "Hallo Laurenz, ich würde gerne über... sprechen",
    sendButton: "Nachricht senden",
    successTitle: "Nachricht geöffnet!",
    successBody:
      "Dein Standard-E-Mail-Programm wurde mit der Nachricht geöffnet. Klicke auf Senden und ich melde mich bald bei dir.",
    sendAnother: "Weitere Nachricht senden →",
    findOnline: "Relevante Socials:",
    directContact: "Oder direkt erreichbar",
    errorRequired: "Pflichtfeld",
    errorEmail: "Bitte gib eine gültige E-Mail-Adresse ein",
  },
};
