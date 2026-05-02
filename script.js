/* ===================================================
   Naveen Kumar K - Portfolio Script
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============ LOADER ============ */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 600);
  });

  /* ============ THEME TOGGLE ============ */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme') || 'light';

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', theme);
  };
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ============ STICKY NAVBAR ============ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ============ MOBILE MENU ============ */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ============ ACTIVE SECTION HIGHLIGHT ============ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  });

  /* ============ TYPING EFFECT ============ */
  const typingTarget = document.getElementById('typingText');
  const phrases = [
    'IT Student',
    'Data Entry Specialist',
    'AI Tools User'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typingTarget.textContent = current.substring(0, charIdx--);
    } else {
      typingTarget.textContent = current.substring(0, charIdx++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === current.length + 1) {
      isDeleting = true;
      speed = 1500; // pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 300;
    }

    setTimeout(typeLoop, speed);
  };
  typeLoop();

  /* ============ SCROLL REVEAL ANIMATIONS ============ */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ============ ANIMATED SKILL BARS ============ */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ============ SCROLL TO TOP ============ */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============ DOWNLOAD RESUME (placeholder PDF generation) ============ */
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const resumeContent = `
NAVEEN KUMAR K
Chennai, India | 8122184845 | naveennk1208@gmail.com

OBJECTIVE
Motivated and detail-oriented Information Technology student seeking a part-time
Office/Admin role to apply organizational and technical skills.

EDUCATION
- B.Tech Information Technology (Pursuing) - Meenakshi College of Engineering, Chennai
- Class XII (2025) - 82% (Top 10 in class)
- Class X (2023) - 81%

SKILLS
Technical: Typing (Fast & Accurate), Data Entry, Internet Research
AI & Tools: Claude AI, ChatGPT, Qwen AI, Gamma
Office: MS Office Basics, Document Management, Email Communication
Soft Skills: Time Management, Attention to Detail, Team Player, Quick Learner

KEY STRENGTHS
- Fast and accurate data entry
- Strong research skills
- Efficient multitasking
- Quick learner of new tools
- Experience with AI productivity tools

LANGUAGES
Tamil (Native), English (Proficient)
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Naveen_Kumar_K_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
  });

  /* ============ CONTACT FORM ============ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '✓ Message sent successfully! I will get back to you soon.';
    formStatus.style.color = 'var(--accent)';
    contactForm.reset();
    setTimeout(() => formStatus.textContent = '', 5000);
  });

  /* ============ PARTICLES BACKGROUND ============ */
  const particlesContainer = document.getElementById('particles');
  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 15 + 10}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    particlesContainer.appendChild(p);
  }

  /* ============ FOOTER YEAR ============ */
  document.getElementById('year').textContent = new Date().getFullYear();

});