import type { LegendKey, ProjectId } from '../projects'

interface ProjectDetailText {
  tagline: string
  paragraphs: string[]
  highlights: string[]
}

export const en = {
  a11y: {
    skip: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    mainNav: 'Main navigation',
  },
  nav: {
    projects: 'Projects',
    about: 'About',
    experience: 'Experience',
    contact: 'Contact',
    resume: 'Resume',
  },
  hero: {
    role: 'Computer science student at FH Wiener Neustadt.',
    tagline: 'Still learning. Already building.',
    lead: "I'm a software developer in the making from Vienna. I build clean, fast applications, from systems programming in C to browser extensions.",
    viewProjects: 'View projects',
    downloadResume: 'Download resume (PDF)',
  },
  facts: {
    basedIn: 'Based in',
    education: 'Studies',
    available: 'Availability',
    languages: 'Languages',
    values: {
      basedIn: 'Vienna, Austria',
      education: 'Computer Science, FH Wiener Neustadt',
      available: 'Open for new projects',
      languages: 'German, English, Spanish',
    },
  },
  projects: {
    heading: 'Projects',
    intro: "Things I've built so far.",
    codeLink: 'Code on GitHub',
    more: 'More projects on GitHub',
    descriptions: {
      'dungeon-crawler':
        'A turn-based roguelike for the terminal: race an AI rival through a procedurally generated dungeon, then face it in the arena.',
      dispatcher:
        'A systems programming demo in C with a parent-child process architecture for distributed task processing. Workers communicate via POSIX message queues, with configurable pool sizes, bounded task queues and graceful shutdown.',
      'browsing-wrapped':
        'A Safari extension that tracks your browsing and turns it into an animated recap. Top sites, time spent, recurring themes, all computed on your device.',
    } satisfies Record<ProjectId, string> as Record<ProjectId, string>,
    visuals: {
      dungeon: 'Animated sketch: player and AI rival race through a dungeon towards the exit.',
      dispatcher: 'Diagram: a parent process sends tasks through a message queue to three workers.',
      wrapped: 'Sketch of a weekly recap with the most visited sites.',
      wrappedTitle: 'Your week',
      wrappedNote: 'Sample data',
    },
  },
  about: {
    heading: 'About me',
    bio1: "I'm an upcoming software developer based in Vienna who loves building clean, fast applications. My passion is turning complex problems into simple, elegant solutions. I care about the details, in both code and design.",
    bio2: 'Right now I am focused on sharpening my skills to become a reliable full-stack developer. I am always eager to learn new technologies and take on exciting projects.',
    skillsHeading: 'What I work with',
    primary: 'Main focus',
    familiar: 'Also in use',
    usedIn: 'used in',
    stackHint: 'Marked technologies lead to the project they are used in.',
  },
  detail: {
    back: 'All projects',
    viewProject: 'View project',
    playInBrowser: 'Play in the browser',
    tech: 'Built with',
    highlights: 'In short',
    projects: {
      'dungeon-crawler': {
        tagline: 'A dungeon crawler for the terminal, written in Python',
        paragraphs: [
          'Every run builds a new dungeon that fills your terminal window. A wall splits the map in two: you explore one half, an AI rival explores the other. Both of you collect gear, dodge traps and fight monsters to level up. Whoever is stronger when you meet in the arena at the center wins.',
          'It started as a university project. I have kept refining and extending it ever since, and it is the project I am proudest of.',
        ],
        highlights: [],
      },
      dispatcher: {
        tagline: 'A task dispatcher built on plain POSIX processes',
        paragraphs: [
          'A parent process forks a pool of workers, hands out tasks through a bounded message queue and waits for every worker to report its statistics before it cleans up.',
        ],
        highlights: [
          'Two queues: one for tasks going out, one for results coming back.',
          'Each worker shuts down on its own termination message.',
          'One C file, built with a single compiler call.',
        ],
      },
      'browsing-wrapped': {
        tagline: 'Your browsing as an animated recap',
        paragraphs: [
          'A Safari extension that turns your browsing into an animated recap: top sites, time spent and recurring themes, in the style of a music year-in-review.',
        ],
        highlights: [
          'Everything is computed on your Mac. No account, no server, no telemetry.',
          'Stores domains instead of full URLs, and single keywords instead of search queries.',
          'Installs with Homebrew.',
        ],
      },
    } satisfies Record<ProjectId, ProjectDetailText> as Record<ProjectId, ProjectDetailText>,
    dungeon: {
      playHeading: 'Try it right here',
      playIntro:
        'A browser version of the game. Blue and orange race through a freshly generated dungeon, then meet in the arena. It plays itself until you take over.',
      points: [
        {
          title: 'A new map every run',
          text: 'The generator carves a maze with rooms, open areas and a central arena, and sizes all of it to the terminal it starts in.',
        },
        {
          title: 'A rival with a plan',
          text: 'The opponent works in three phases. It collects items, then hunts monsters, then heads for the arena to come after you.',
        },
        {
          title: 'Monsters that find you',
          text: 'Monsters wander until you step inside their detection range. From then on they chase you along the shortest path, found with breadth-first search.',
        },
      ],
      legendTitle: 'What you see on the map',
      legend: {
        you: 'You',
        rival: 'The AI rival',
        door: 'Arena door',
        weapon: 'Weapon, raises attack',
        armor: 'Armor, raises defense',
        spike: 'Spike trap, hidden until triggered',
        poison: 'Poison cloud, lowers defense',
        gnome: 'Gnome',
        gremlin: 'Gremlin',
        jelly: 'Jelly',
        dragon: 'Dragon',
      } satisfies Record<LegendKey, string> as Record<LegendKey, string>,
      runTitle: 'Play the real thing',
      runNote: 'Needs Python 3.10 or newer and a terminal of at least 80 by 30 characters.',
      copy: 'Copy commands',
      copied: 'Copied',
      copyFailed: 'Copying failed, select the text instead',
    },
  },
  experience: {
    heading: 'Experience',
    intro: "Where I've worked and volunteered.",
    items: [
      {
        role: 'Marketing Intern',
        company: 'Gurkerl.at',
        location: 'Vienna, Austria',
        period: 'Jul 2023 – Jan 2025',
        type: 'Full-time / part-time / hybrid',
        bullets: [
          'Building and adapting websites for certain campaigns',
          'Social media communication and content creation',
          'Campaign creation and management',
        ],
        tags: ['UI/UX', 'Social Media', 'Advertising'],
      },
      {
        role: 'Soccer Coach',
        company: 'ASK Oberwaltersdorf',
        location: 'Oberwaltersdorf',
        period: 'Jul 2023 – Present',
        type: 'Volunteer',
        bullets: [
          'Coaching a youth soccer team (currently U16) with a focus on skill development, teamwork and sportsmanship',
          'Organizing and leading regular training sessions and creating practice plans',
          'Collaborating with parents and club management to ensure a positive and supportive environment for the players',
        ],
        tags: ['Coaching', 'Teamwork', 'Communication'],
      },
    ],
  },
  contact: {
    heading: 'Get in touch',
    intro:
      "I'm currently open to new opportunities. Whether you have a project in mind, a role that might be a good fit, or just want to connect, feel free to reach out.",
    emailHeading: 'Email',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copying failed',
    onlineHeading: 'Online',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'max.mustermann@example.com',
    messagePlaceholder: "Hi Laurenz, I'd love to talk about ...",
    submit: 'Open email draft',
    submitHint: 'Opens your email app with the finished message.',
    subjectPrefix: 'Portfolio contact from',
    successTitle: 'Draft opened',
    successBody:
      'Your email app opened with the message pre-filled. Hit send there and I will get back to you soon.',
    sendAnother: 'Write another message',
    errorRequired: 'Please fill in this field.',
    errorEmail: 'Please enter a valid email address.',
  },
  footer: {
    backToTop: 'Back to top',
  },
}

export type Translations = typeof en
