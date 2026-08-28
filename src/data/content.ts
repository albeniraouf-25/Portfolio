/**
 * ─────────────────────────────────────────────────────────────────────────
 *  THE ONLY FILE YOU NEED TO EDIT.
 *  Everything on the site — profile data AND interface copy — lives here, in
 *  both languages. The components render whatever is in this object; adding a
 *  job, a skill, or fixing a translation never requires touching code.
 *
 *  • Translatable text is written as { en: '…', ar: '…' }.
 *  • Language-neutral values (dates, tech names, emails, links) are plain.
 *  • Dates are ISO strings ('YYYY-MM-DD'); durations are computed for you.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Lang = 'en' | 'ar';
export type Loc<T> = Record<Lang, T>;

export interface Account {
  url: string;
  website: string;
  icon: string;
}

interface RawAbout {
  name: Loc<{first:string,last:string,father:string}>;
  job: Loc<string>;
  profileImage: string;
  birthDate: string;
  address: Loc<string>;
  addressOnMap: string;
  languages: Loc<string[]>;
  accounts: Account[];
  whoAmI: Loc<string>;
  emails: string[];
  phones: string[];
}
interface RawCompany {
  name: Loc<string>;
  location: Loc<string>;
  link: string;
  description: Loc<string>;
  image?: string;
  showName: boolean;
}
interface RawPosition {
  title: Loc<string>;
  type: Loc<string>;
  startDate: string;
  endDate?: string;
  coreFunctionalities: Loc<string[]>;
  technologiesAndLanguages: string[];
}
interface RawExperience {
  company: RawCompany;
  positions: RawPosition[];
}
interface RawEducation {
  college: Loc<string>;
  icon?: string;
  startDate: string;
  endDate?: string;
  title: Loc<string>;
  description: Loc<string>;
  achievements: Loc<string[]>;
}
interface RawCertificate {
  date: string;
  title: Loc<string>;
  description: Loc<string>;
  origin: Loc<string>;
  img: string;
  link?: string;
}
interface RawSkillGroup {
  label: Loc<string>;
  items: string[];
}

export interface UiStrings {
  /** Label on the language switch button (shows the language you'd switch TO). */
  switchLabel: string;
  nav: { about: string; work: string; skills: string; learning: string; recognition: string; contact: string; cta: string };
  hero: {
    greeting: string;
    kicker: string;
    /** use {place} where the highlighted location should appear */
    placeStrong: string;
    seeWork: string;
    madeIn: string;
    stats: { years: string; companies: string; tools: string };
  };
  about: { word: string; kicker: string; based: string; working: string; workingValue: string; languages: string };
  work: { index: string; kicker: string; title: string; lede: string; present: string; earlierOne: string; earlierMany: string };
  /** use {n} in skills.title for the tool count */
  skills: { index: string; kicker: string; title: string };
  learning: { index: string; kicker: string; title: string };
  certs: { index: string; kicker: string; title: string };
  contact: {
    word: string;
    headline: string;
    sub: string;
    email: string;
    phone: string;
    location: string;
    footerCity: string;
  };
}

export interface Content {
  settings: { defaultLanguage: Lang; languages: Lang[] };
  ui: Record<Lang, UiStrings>;
  skillGroups: RawSkillGroup[];
  restGroupLabel: Loc<string>;
  profile: {
    about: RawAbout;
    experiences: RawExperience[];
    skills: string[];
    educations: RawEducation[];
    certifications: RawCertificate[];
  };
}

export const content = {
  settings: { defaultLanguage: 'en', languages: ['en', 'ar'] },

  // ── Interface copy ──────────────────────────────────────────────────────
  ui: {
    en: {
      switchLabel: 'ع',
      nav: {
        about: 'About',
        work: 'Work',
        skills: 'Craft',
        learning: 'Learning',
        recognition: 'Recognition',
        contact: 'Contact',
        cta: 'Résumé on GitHub',
      },
      hero: {
        greeting: 'Hello & welcome',
        kicker: 'Software Engineer',
        placeStrong: 'As-Suwayda, Syria',
        seeWork: 'See my work',
        madeIn: '',
        stats: { years: 'years building', companies: 'companies', tools: 'tools in hand' },
      },
      about: {
        word: 'Bio',
        kicker: 'The craft',
        based: 'Based',
        working: 'Working',
        workingValue: 'Remote, worldwide',
        languages: 'Languages',
      },
      work: {
        index: 'I',
        kicker: 'Work — a mosaic',
        title: 'Every role, a tile in the same pattern.',
        lede: 'Six positions across solar energy, AI lead-generation, proptech, humanitarian tech and teaching — each one fitting into the same practice, shipped mostly remote.',
        present: 'Present',
        earlierOne: '1 earlier role',
        earlierMany: '{n} earlier roles',
      },
      skills: {
        index: 'II',
        kicker: 'The craft, by layer',
        title: '{n} tools.',
      },
      learning: {
        index: 'III',
        kicker: 'Education',
        title: 'Where the foundations were laid.',
      },
      certs: {
        index: 'IV',
        kicker: 'Recognition',
        title: 'A signal of good work.',
      },
      contact: {
        word: 'Come in',
        headline: 'Pull up a chair \nlet\'s build something.',
        sub: 'Open to full-stack and backend roles, remote. Email is the surest way to reach me.',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        footerCity: '',
      },
    },
    ar: {
      switchLabel: 'EN',
      nav: {
        about: 'عنّي',
        work: 'الخبرات',
        skills: 'المهارات',
        learning: 'الدراسة',
        recognition: 'الشهادات',
        contact: 'تواصل',
        cta: 'حسابي على GitHub',
      },
      hero: {
        greeting: 'أهلاً وسهلاً',
        kicker: 'مهندس برمجيات',
        placeStrong: 'السويداء، سوريا',
        seeWork: 'شاهد أعمالي',
        madeIn: '',
        stats: { years: 'سنوات خبرة', companies: 'شركات', tools: 'أدوات أعمل بها' },
      },
      about: {
        word: 'من أنا',
        kicker: '',
        based: 'الإقامة',
        working: 'نمط العمل',
        workingValue: 'عن بُعد، مع شركات حول العالم',
        languages: 'اللغات',
      },
      work: {
        index: '١',
        kicker: 'الخبرات — فسيفساء',
        title: 'كل تجربة قطعة من فسيفساء واحدة.',
        lede: 'عملت في الطاقة الشمسية والذكاء الاصطناعي والعقارات والعمل الإنساني والتدريس. مجالات مختلفة تجمعها حرفة واحدة — وأغلب الشغل كان عن بُعد.',
        present: 'حالياً',
        earlierOne: 'منصب سابق',
        earlierMany: '{n} مناصب سابقة',
      },
      skills: {
        index: '٢',
        kicker: 'عدّة الشغل، طبقة فوق طبقة',
        title: '{n} أداة.',
      },
      learning: {
        index: '٣',
        kicker: 'الدراسة',
        title: 'من هنا بدأت الحكاية.',
      },
      certs: {
        index: '٤',
        kicker: 'الشهادات',
        title: 'ثمرة الشغل المتقن.',
      },
      contact: {
        word: 'تفضّل،',
        headline: ' القهوة جاهزة \n احكِ لي عن مشروعك.',
        sub: 'متاح للعمل عن بُعد، full-stack أو backend.',
        email: 'البريد',
        phone: 'الهاتف',
        location: 'العنوان',
        footerCity: 'السويداء · سوريا',
      },
    },
  },

  // ── Skills, grouped by layer (items are shown as-is in both languages) ────
  skillGroups: [
    { label: { en: 'Languages', ar: 'لغات البرمجة' }, items: ['TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'PHP', 'HTML', 'CSS', 'Bash'] },
    { label: { en: 'Frontend', ar: 'الواجهات' }, items: ['Angular', 'React', 'Flutter', 'RxJS'] },
    { label: { en: 'Backend & Data', ar: 'الأنظمة الخلفية والبيانات' }, items: ['Node', 'Express', 'Django', 'Laravel', 'Prisma', 'TypeORM', 'PostgreSQL', 'MySQL', 'JWT', 'MVC'] },
    { label: { en: 'Infra & DevOps', ar: 'البنية التحتية والتشغيل' }, items: ['Linux', 'Ubuntu', 'AWS', 'Kubernetes', 'Git', 'NPM', 'ESLint', 'Automation Tests'] },
    { label: { en: 'Integrations', ar: 'خدمات خارجية' }, items: ['Stripe', 'Mailgun', 'SMTP', 'Zapier', 'QuickBase'] },
  ],
  restGroupLabel: { en: 'Tools & Practice', ar: 'أدوات أخرى' },

  // ── Profile ───────────────────────────────────────────────────────────────
  profile: {
    about: {
      name: { en: {first:'Raouf', father: 'Zeid' , last:'Albeni'}, ar: {first:'رؤوف', father: 'زيد' , last:'البني'} },
      job: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
      profileImage: '/resources/profile.webp',
      birthDate: '2001-11-25',
      address: { en: 'As Suwayda, Syria', ar: 'السويداء، سوريا' },
      addressOnMap: 'https://maps.app.goo.gl/XULPUYCtjJMK2Wau6',
      languages: {
        en: ['Arabic (Native Language)', 'English (Advanced)'],
        ar: ['العربية (اللغة الأم)', 'الإنجليزية (متقدّم)'],
      },
      accounts: [
        { url: 'https://github.com/albeniraouf-25', website: 'Github', icon: 'github' },
        { url: 'https://www.facebook.com/albeniraouf', website: 'Facebook', icon: 'facebook' },
        { url: 'https://www.instagram.com/albeniraouf', website: 'Instagram', icon: 'instagram' },
      ],
      whoAmI: {
        en: "I'm a Full-Stack Software Engineer, led a high-performing team with a focus on cutting-edge web development solutions. With extensive experience in delivering robust, scalable applications, I excel in architecting end-to-end systems that drive innovation and efficiency.\n\nMy passion for technology fuels my ability to rapidly adapt to new challenges, master emerging tools, and deliver superior results under pressure. I am committed to pushing boundaries, fostering collaboration, and consistently producing high-quality, impactful work.",
        ar: 'مهندس برمجيات أحب أن أبني الأشياء من أولها لآخرها: من قاعدة البيانات إلى آخر زر يضغطه المستخدم. قدت فريقاً صغيراً لسنوات، وتعلمت منها أن أفضل الأنظمة ليست الأعقد، بل الأوضح — التي تشتغل كل يوم بلا ضجيج.\n\nأتعلم الأدوات الجديدة بسرعة لأني ببساطة أستمتع بذلك، والضغط لا يخيفني ولا يجعلني أتنازل عن الجودة. وما زلت أؤمن أن التفاصيل الصغيرة التي لا ينتبه لها أحد هي الفرق بين منتج عادي ومنتج ممتاز.',
      },
      emails: ['albeniraouf@gmail.com'],
      phones: ['+963 981 241 453', '+963 949 294 811'],
    },

    experiences: [
      {
        company: {
          name: { en: 'Better Earth', ar: 'Better Earth' },
          location: { en: 'Los Angeles, USA', ar: 'لوس أنجلوس، الولايات المتحدة' },
          link: 'https://betterearth.solar',
          image: '/resources/experience/betterearth.png',
          description: {
            en: 'Better Earth provides residential solar energy systems and battery storage solutions that help homeowners become less dependent on conventional power sources. The company prioritizes a seamless customer journey, in-house installation, and lasting reliability to promote the shift toward renewable energy.',
            ar: 'تركّب Better Earth أنظمة طاقة شمسية وبطاريات تخزين للمنازل، حتى يقل اعتماد أصحابها على الكهرباء التقليدية. كل شيء يمر عبر فرق الشركة نفسها — من أول اتصال حتى التركيب — والهدف طاقة أنظف يُعتمد عليها.',
          },
          showName: false,
        },
        positions: [
          {
            title: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
            type: { en: 'Full-Time Remote', ar: 'دوام كامل · عن بُعد' },
            startDate: '2026-05-01',
            coreFunctionalities: {
              en: ['Software Development', 'Technical Support'],
              ar: ['تطوير البرمجيات', 'الدعم التقني'],
            },
            technologiesAndLanguages: ['Ubuntu', 'Linux', 'Git', 'Node','Next', 'Python', 'Django', 'PostgreSQL', 'QuickBase', 'Zapier', 'AWS', 'Notion'],
          },
        ],
      },
      {
        company: {
          name: { en: 'KnockIQ', ar: 'KnockIQ' },
          location: { en: 'Miami, USA', ar: 'ميامي، الولايات المتحدة' },
          link: 'https://knockiq.ai',
          image: '/resources/experience/knockiq.png',
          description: {
            en: 'KnockIQ is a pioneering technology company revolutionizing B2B lead generation through advanced artificial intelligence. By leveraging AI-driven insights and real-time engagement tools. KnockIQ empowers businesses to identify and connect with qualified leads.',
            ar: 'شركة ناشئة في نيويورك تستخدم الذكاء الاصطناعي لتغيير طريقة وصول شركات B2B إلى عملائها: تحدد العملاء الأنسب، وتساعد على الوصول إليهم في اللحظة المناسبة.',
          },
          showName: false,
        },
        positions: [
          {
            title: { en: 'Tech Support', ar: 'دعم تقني' },
            type: { en: 'Occasionally Remote', ar: 'عند الحاجة · عن بُعد' },
            startDate: '2026-05-01',
            coreFunctionalities: { en: ['Backend Development'], ar: ['تطوير الأنظمة الخلفية'] },
            technologiesAndLanguages: ['Ubuntu', 'Linux', 'Git', 'JWT', 'Express', 'Prisma', 'PostgreSQL', 'Node', 'TypeScript', 'Mailgun', 'Jira', 'Confluence', 'ESLint', 'Automation Tests', 'Stripe', 'React'],
          },
          {
            title: { en: 'Software Developer', ar: 'مطوّر برمجيات' },
            type: { en: 'Full-Time Remote', ar: 'دوام كامل · عن بُعد' },
            startDate: '2025-10-01',
            endDate: '2026-05-01',
            coreFunctionalities: { en: ['Backend Development'], ar: ['تطوير الأنظمة الخلفية'] },
            technologiesAndLanguages: ['Ubuntu', 'Linux', 'Git', 'JWT', 'Express', 'Prisma', 'PostgreSQL', 'Node', 'TypeScript', 'Mailgun', 'Jira', 'Confluence', 'ESLint', 'Automation Tests', 'Stripe', 'React'],
          },
          {
            title: { en: 'Software Developer', ar: 'مطوّر برمجيات' },
            type: { en: 'Part-Time Remote', ar: 'دوام جزئي · عن بُعد' },
            startDate: '2025-03-28',
            endDate: '2025-09-30',
            coreFunctionalities: { en: ['Backend Development'], ar: ['تطوير الأنظمة الخلفية'] },
            technologiesAndLanguages: ['Ubuntu', 'Linux', 'Git', 'JWT', 'Express', 'Prisma', 'PostgreSQL', 'Node', 'TypeScript', 'Mailgun', 'Jira', 'Confluence', 'ESLint', 'Automation Tests', 'Stripe'],
          },
        ],
      },
      {
        company: {
          name: { en: 'Lumina Team', ar: 'فريق لومينا' },
          location: { en: 'As Suwayda, Syria', ar: 'السويداء، سوريا' },
          link: 'https://lumina-team.org',
          image: '/resources/experience/lumina.png',
          description: {
            en: 'Lumina Team is a humanitarian initiative born from the hearts of the people of Suwayda Governorate, aiming to support those affected and bring smiles back to their faces. We work together as a team to provide assistance through diverse initiatives that promote community solidarity.',
            ar: 'مبادرة إنسانية ولدت من قلب السويداء، هدفها الوقوف مع المتضررين وإعادة الابتسامة لوجوههم. نعمل معاً كفريق واحد على مبادرات مختلفة تقوّي التكافل بين الناس.',
          },
          showName: true,
        },
        positions: [
          {
            title: { en: 'Chief Technology Officer', ar: 'المدير التقني' },
            type: { en: 'Volunteer', ar: 'تطوّع' },
            startDate: '2025-08-01',
            coreFunctionalities: { en: ['Software Development', 'Management'], ar: ['تطوير البرمجيات', 'الإدارة'] },
            technologiesAndLanguages: ['Git', 'JWT', 'Express', 'TypeORM', 'PostgreSQL', 'Node', 'TypeScript', 'ESLint', 'React', 'MVC'],
          },
        ],
      },
      {
        company: {
          name: { en: 'Socienta', ar: 'Socienta' },
          location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
          link: 'https://socienta.com',
          image: '/resources/experience/socienta.png',
          description: {
            en: 'Socienta empowers community management companies of all sizes in cutting through complexities of real-estate with a solution to serve landlords & tenants within their communities with the utmost satisfaction.',
            ar: 'منصة من دبي تسهّل على شركات إدارة المجتمعات السكنية شغلها اليومي في القطاع العقاري، وتقدم للملاك والمستأجرين تجربة مريحة داخل مجتمعاتهم.',
          },
          showName: false,
        },
        positions: [
          {
            title: { en: 'Team Lead', ar: 'قائد فريق' },
            type: { en: 'Full-Time Remote', ar: 'دوام كامل · عن بُعد' },
            startDate: '2022-11-15',
            endDate: '2025-08-31',
            coreFunctionalities: { en: ['Software Development', 'Management'], ar: ['تطوير البرمجيات', 'الإدارة'] },
            technologiesAndLanguages: ['Agile', 'Kubernetes', 'Linux', 'Git', 'JWT', 'Angular', 'Express', 'PostgreSQL', 'Node', 'TypeScript', 'Flutter', 'Mailgun', 'SMTP', 'Jira', 'Confluence', 'ESLint', 'Automation Tests'],
          },
          {
            title: { en: 'Software Developer', ar: 'مطوّر برمجيات' },
            type: { en: 'Full-Time Remote', ar: 'دوام كامل · عن بُعد' },
            startDate: '2021-08-25',
            endDate: '2022-11-15',
            coreFunctionalities: { en: ['Software Development'], ar: ['تطوير البرمجيات'] },
            technologiesAndLanguages: ['Agile', 'Kubernetes', 'Linux', 'Git', 'JWT', 'Angular', 'Express', 'PostgreSQL', 'Node', 'TypeScript', 'Flutter'],
          },
        ],
      },
      {
        company: {
          name: { en: 'Code Library', ar: 'مكتبة Code' },
          location: { en: 'Latakia, Syria', ar: 'اللاذقية، سوريا' },
          link: '',
          image: '/resources/experience/codeLib.png',
          description: {
            en: 'Code Library is focused on preparing high quality and precise lectures for the Faculty of Informatics Engineering at Latakia University.',
            ar: 'مشروع يهتم بإعداد محاضرات دقيقة ومرتبة لطلاب كلية الهندسة المعلوماتية في جامعة اللاذقية.',
          },
          showName: false,
        },
        positions: [
          {
            title: { en: 'Programming Languages Lectures Writer & Projects Developer', ar: 'معدّ محاضرات لغات البرمجة ومطوّر مشاريع' },
            type: { en: 'Full-Time On-Site', ar: 'دوام كامل · حضوري' },
            startDate: '2020-03-25',
            endDate: '2021-08-26',
            coreFunctionalities: { en: ['Lectures Writing', 'Web Apps Developer'], ar: ['كتابة المحاضرات', 'تطوير تطبيقات الويب'] },
            technologiesAndLanguages: ['React', 'Python', 'C++', 'Java', 'OOP', 'Microsoft Word'],
          },
        ],
      },
      {
        company: {
          name: { en: 'Programming Languages Tutor', ar: 'مدرّس لغات برمجة' },
          location: { en: 'Latakia, Syria', ar: 'اللاذقية، سوريا' },
          link: '',
          image: '/resources/experience/teacher.png',
          description: {
            en: "I've worked as a private teacher for programming languages, following the curricula of Latakia University.",
            ar: 'درّست لغات البرمجة دروساً خصوصية لطلاب الجامعة، على مناهج جامعة اللاذقية.',
          },
          showName: true,
        },
        positions: [
          {
            title: { en: 'Programming Languages Tutor', ar: 'مدرّس لغات برمجة' },
            type: { en: 'Part-Time On-Site', ar: 'دوام جزئي · حضوري' },
            startDate: '2020-03-24',
            endDate: '2021-08-24',
            coreFunctionalities: { en: ['Programming Languages Teaching'], ar: ['تدريس لغات البرمجة'] },
            technologiesAndLanguages: ['Python', 'C++', 'OOP', 'Java'],
          },
        ],
      },
    ],

    skills: [
      'Agile', 'Angular', 'Automation Tests', 'AWS', 'Bash', 'C', 'C++', 'C#', 'Confluence', 'CSS',
      'Django', 'ESLint', 'Express', 'Flutter', 'Git', 'Godot', 'HTML', 'Java', 'Jira', 'JWT',
      'Kubernetes', 'Laravel', 'Linux', 'Mailgun', 'Microsoft Word', 'MS Office', 'MVC', 'MySQL',
      'Node', 'Notion', 'NPM', 'OOP', 'PHP', 'PostgreSQL', 'Prisma', 'Python', 'QuickBase', 'React',
      'RxJS', 'SMTP', 'Stripe', 'TypeORM', 'TypeScript', 'Ubuntu', 'Unity', 'Wordpress', 'Zapier',
    ],

    educations: [
      {
        college: { en: 'Latakia University', ar: 'جامعة اللاذقية' },
        icon: 'university',
        startDate: '2019-09-20',
        endDate: '2026-08-21',
        title: { en: 'College', ar: 'الجامعة' },
        description: {
          en: 'Bachelor of Technology — BTech, Information Engineering',
          ar: 'إجازة في الهندسة المعلوماتية',
        },
        achievements: {
          en: ['Specialized in Software Engineering.', 'Achieved 100% in all programming classes (Python, C++, OOP, Java).'],
          ar: ['اخترت تخصص هندسة البرمجيات.', 'العلامة الكاملة في كل مواد البرمجة: Python وC++‎ وOOP وJava.'],
        },
      },
      {
        college: { en: 'Local Secondary School', ar: 'ثانوية عامة' },
        icon: 'school',
        startDate: '2016-09-01',
        endDate: '2019-09-02',
        title: { en: 'Secondary School', ar: 'الثانوية' },
        description: { en: 'Bachelor of Science — BS, Scientific', ar: 'الشهادة الثانوية — الفرع العلمي' },
        achievements: { en: ['Achieved 90% in the final exams.'], ar: ['معدل 90% في امتحانات الشهادة.'] },
      },
    ],

    certifications: [
      {
        date: '2025-04-01',
        title: { en: 'Spotlight of the Quarter — Q1 2025', ar: 'نجم الربع — الربع الأول 2025' },
        description: {
          en: 'Awarded to be the Spotlight of the Quarter One of 2025.',
          ar: 'اختارتني Socienta نجم الربع الأول لعام 2025، تقديراً لشغلي مع الفريق.',
        },
        origin: { en: 'Socienta', ar: 'Socienta' },
        img: '/resources/certificates/socientaQ1Spotlight.png',
      },
    ],
  },
} satisfies Content;
