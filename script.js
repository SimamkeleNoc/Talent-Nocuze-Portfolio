// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ Footer year ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============ Terminal typing effect ============
const typedOut = document.getElementById('typedOut');
const cursor = document.getElementById('cursor');

const messages = [
  'Talent Simamkele Nocuze',
  'ICT Applications Developer',
  'Cape Town, South Africa',
  'Java · Python · JavaScript · SQL',
  'Generative AI · LLMs · Machine Learning',
  'Building practical, user-focused software'
];

let msgIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedOut) return;
  const current = messages[msgIndex];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    typedOut.textContent = messages[0];
    if (cursor) cursor.style.display = 'none';
    return;
  }

  if (!deleting) {
    charIndex++;
    typedOut.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedOut.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 55);
}

typeLoop();

// ============ Scroll-reveal for sections ============
const revealTargets = document.querySelectorAll(
  '.about-grid, .timeline-item, .edu-card, .cert-card, .skill-card, .project-card'
);

if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 500ms ease, transform 500ms ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
}

// ============ Active nav link on scroll ============
const sections = document.querySelectorAll('main .section, #hero');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(sec => navObserver.observe(sec));
}

// ============ Theme toggle (dark = original palette, default) ============
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// In-memory only (no localStorage — keeps this safe to preview as an artifact;
// add localStorage.getItem/setItem here once deployed if you want it to persist).
let currentTheme = 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  htmlEl.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

applyTheme('dark');

themeToggle?.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ============ Talent AI Assistant chatbot ============
(function () {
  const chatbot = document.getElementById('chatbot');
  const launcher = document.getElementById('chatbotLauncher');
  const closeBtn = document.getElementById('chatbotClose');
  const panel = document.getElementById('chatbotPanel');
  const messagesEl = document.getElementById('chatbotMessages');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const suggestions = document.getElementById('chatbotSuggestions');

  if (!chatbot || !launcher) return;

  let hasGreeted = false;

  function openChat() {
    chatbot.classList.add('open');
    launcher.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if (!hasGreeted) {
      hasGreeted = true;
      addBotMessage(
        "Hi, I'm the Talent AI Assistant \u{1F44B} Ask me about Talent's skills, " +
        "projects, education, certifications, or how to get in touch \u2014 " +
        "or tap a suggestion below."
      );
    }
    input?.focus();
  }

  function closeChat() {
    chatbot.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  launcher.addEventListener('click', () => {
    chatbot.classList.contains('open') ? closeChat() : openChat();
  });
  closeBtn?.addEventListener('click', closeChat);

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `msg ${sender === 'user' ? 'msg-user' : 'msg-bot'}`;
    bubble.innerHTML = text;
    messagesEl.appendChild(bubble);
    scrollToBottom();
  }

  function addBotMessage(text) {
    addMessage(text, 'bot');
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'msg msg-bot msg-typing';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    scrollToBottom();
  }

  function hideTyping() {
    document.getElementById('typingIndicator')?.remove();
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      closeChat();
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }
  }

  // Simple keyword-matched intents grounded in the CV content
  const intents = [
    {
      keywords: ['hello', 'hi', 'hey', 'howzit', 'sup'],
      reply: "Hey there! I can tell you about Talent's background, skills, projects, education, or certifications. What would you like to know?"
    },
    {
      keywords: ['skill', 'tech stack', 'technolog', 'language', 'program'],
      reply: "Talent works with Java, Python, JavaScript, HTML, CSS, MySQL, Apache Derby, and ASP.NET MVC, plus cloud platforms (Azure, AWS, Google Cloud) and AI/ML tooling from Generative AI and LLM coursework. Want to see the full <a href=\"#skills\" data-nav=\"skills\">Skills section</a>?",
      nav: 'skills'
    },
    {
      keywords: ['project', 'portfolio', 'built', 'built', 'built anything', 'work sample'],
      reply: "Talent has built a Student/Course Enrolment System with database auth, a Traabco booking system for an accounting firm, and a Residence Laundry Booking System. Check out the <a href=\"#projects\" data-nav=\"projects\">Projects section</a> for details.",
      nav: 'projects'
    },
    {
      keywords: ['certif', 'coursera', 'course', 'credential'],
      reply: "Talent holds 7 verified Coursera certificates from IBM, DeepLearning.AI, Google Cloud, AWS, and Stanford Online \u2014 covering Generative AI, Prompt Engineering, LLMs, Machine Learning, and Python for Data Science. See the <a href=\"#certifications\" data-nav=\"certifications\">Certifications section</a>.",
      nav: 'certifications'
    },
    {
      keywords: ['educat', 'degree', 'diploma', 'study', 'university', 'school', 'matric'],
      reply: "Talent is completing a Diploma in ICT: Applications Development at Cape Peninsula University of Technology, holds a Diploma in IT from Richfield Institute of Technology, and matriculated from South City Christian College. More in the <a href=\"#education\" data-nav=\"education\">Education section</a>.",
      nav: 'education'
    },
    {
      keywords: ['experience', 'history', 'job', 'internship'],
      reply: "Talent's practical experience comes from applied academic and collaborative development projects \u2014 designing, building, and integrating full working systems. See the <a href=\"#experience\" data-nav=\"experience\">Experience section</a>.",
      nav: 'experience'
    },
    {
      keywords: ['about', 'who are you', 'who is talent', 'background'],
      reply: "Talent Simamkele Nocuze is a final-year ICT student in Cape Town specializing in Applications Development, with hands-on Generative AI and Machine Learning coursework. Full story in the <a href=\"#about\" data-nav=\"about\">About section</a>.",
      nav: 'about'
    },
    {
      keywords: ['contact', 'email', 'reach', 'hire', 'get in touch', 'linkedin', 'github'],
      reply: "You can reach Talent via the <a href=\"#contact\" data-nav=\"contact\">Contact section</a>, or directly on <a href=\"https://www.linkedin.com/in/talent-simamkele-nocuze-06a6bb275\" target=\"_blank\" rel=\"noopener noreferrer\">LinkedIn</a> and <a href=\"https://github.com/SimamkeleNoc\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub</a>.",
      nav: 'contact'
    },
    {
      keywords: ['location', 'where', 'based', 'cape town'],
      reply: "Talent is based in Cape Town, Western Cape, South Africa."
    },
    {
      keywords: ['language', 'speak'],
      reply: "Talent speaks English, IsiXhosa, and IsiZulu."
    },
    {
      keywords: ['thank', 'thanks', 'cheers'],
      reply: "You're welcome! Let me know if there's anything else you'd like to explore on the site."
    }
  ];

  function findReply(query) {
    const q = query.toLowerCase();
    for (const intent of intents) {
      if (intent.keywords.some(k => q.includes(k))) return intent;
    }
    return null;
  }

  function handleQuery(query) {
    addMessage(query, 'user');
    showTyping();

    setTimeout(() => {
      hideTyping();
      const intent = findReply(query);
      if (intent) {
        addBotMessage(intent.reply);
      } else {
        addBotMessage(
          "I'm not sure about that one, but I can help with Talent's skills, projects, " +
          "education, certifications, experience, or contact info \u2014 try one of the " +
          "suggestions below, or ask in your own words."
        );
      }
    }, 500 + Math.random() * 400);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    handleQuery(query);
  });

  suggestions?.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      if (q) handleQuery(q);
    });
  });

  // Let in-chat links scroll to sections instead of just jumping instantly
  messagesEl?.addEventListener('click', (e) => {
    const target = e.target.closest('a[data-nav]');
    if (target) {
      e.preventDefault();
      scrollToSection(target.getAttribute('data-nav'));
    }
  });
})();
