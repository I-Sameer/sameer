/**
 * SAMEER KHAN - DEVELOPER PORTFOLIO
 * Modern Interactive Script: Navigation, Scrollspy, Form Validation, Modals & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Navigation & Scroll Effects
  // -------------------------------------------------------------------------
  const header = document.querySelector('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Handle Scroll Progress & Sticky Header
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Header Blur & Shadow on scroll
    if (scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll progress bar
    if (scrollProgress && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  // Scroll to Top click
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile Menu Toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu on clicking any link
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu on clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('open') && !header.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  // -------------------------------------------------------------------------
  // 2. Active Section Spy (IntersectionObserver)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // -------------------------------------------------------------------------
  // 3. Project Filtering System
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Hero Terminal Code Copy
  // -------------------------------------------------------------------------
  const terminalCopyBtn = document.getElementById('terminal-copy');
  const terminalCode = document.getElementById('terminal-code');

  terminalCopyBtn?.addEventListener('click', async () => {
    if (!terminalCode) return;
    try {
      await navigator.clipboard.writeText(terminalCode.innerText);
      showToast('Profile snippet copied to clipboard! ✨');
      const originalText = terminalCopyBtn.innerHTML;
      terminalCopyBtn.innerHTML = '<span>✓ Copied</span>';
      setTimeout(() => {
        terminalCopyBtn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      showToast('Could not copy automatically.');
    }
  });

  // -------------------------------------------------------------------------
  // 5. Copy Email to Clipboard
  // -------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
  const emailAddress = 'sameeriqbaalkhan@gmail.com';

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(emailAddress);
        showToast('Email address copied to clipboard! 📬');
      } catch (err) {
        window.location.href = `mailto:${emailAddress}`;
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. Project Modal Details
  // -------------------------------------------------------------------------
  const projectData = {
    'onevote': {
      title: 'OneVote – College Voting System',
      category: 'Full-Stack Web Engineering',
      badges: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth', 'Tailwind CSS'],
      overview: 'OneVote is a tamper-resistant, secure collegiate digital election platform designed to replace legacy paper ballots and informal polls.',
      details: [
        'Multi-role access control separating student voters, candidates, and election commissioners.',
        'Cryptographic vote integrity checking and duplicate prevention algorithms.',
        'Successfully piloted and powered Junior Class Representative (CR) elections with 150+ student voters.',
        'Real-time automated tallying dashboard with dynamic candidate metrics and instant result publication.'
      ],
      github: 'https://github.com/I-Sameer',
      demo: 'https://github.com/I-Sameer'
    },
    'customer-agent': {
      title: 'Customer Order Support Agent',
      category: 'AI Agents & LLM Orchestration',
      badges: ['Python', 'LangChain', 'LangGraph', 'Pydantic', 'FastAPI', 'SQLite'],
      overview: 'An enterprise-ready multi-turn conversational AI customer support agent capable of managing live order status, returns, address changes, and cancellations with zero hallucinations.',
      details: [
        'Engineered a strict 4-layer separation of concerns across data access, business logic rules, tool bindings, and agent orchestration.',
        'Enforced strict eligibility status gating (e.g. return window validity, verified transit states) at the core code layer.',
        'Integrated LangGraph interrupt-based middleware requiring human verification prior to irreversible actions (order refunds and address re-routing).',
        'State persistence and thread-isolated session memory handling concurrent customer sessions.'
      ],
      github: 'https://github.com/I-Sameer',
      demo: 'https://github.com/I-Sameer'
    },
    'iocl-automation': {
      title: 'LPG Bottling Automation & Telemetry Monitor',
      category: 'Embedded & Industrial Automation',
      badges: ['ESP32 / Arduino', 'C/C++', 'PLC Ladder Logic', 'Sensors & Transducers', 'Blynk IoT'],
      overview: 'Industrial telemetry dashboard and safety interlock simulation prototype inspired by on-site observations at the Indian Oil Corporation Limited (IOCL) LPG Bottling Plant.',
      details: [
        'Real-time simulation of automated rotary filling carousels, electronic check-weighing, and sonic leak detection tanks.',
        'Interlocked emergency safety protocols that mimic industrial PLC fail-safes during abnormal conveyor torque or gas sensor thresholds.',
        'Microcontroller telemetry integration broadcasting sensor status over lightweight IoT protocols.',
        'Direct application of Instrumentation & Control Engineering principles to prevent downtime and enforce industrial safety.'
      ],
      github: 'https://github.com/I-Sameer',
      demo: 'https://github.com/I-Sameer'
    },
    'ctf-toolkit': {
      title: 'CyberDojo Security & CTF Toolkit',
      category: 'Security & Systems Engineering',
      badges: ['Python', 'Bash', 'Cryptography', 'Linux', 'Web Exploitation'],
      overview: 'Curated suite of vulnerability analysis scripts, cryptographic decoders, and CTF challenges developed for competitive cyber security events.',
      details: [
        'Helped team secure 3rd Place out of 200+ participants in the competitive CYDO Hack CTF.',
        'Includes automated scripts for common steganography inspection, cipher cracking, and JWT token manipulation analysis.',
        'Active leadership in NIT Jalandhar Cyber Security Club, mentoring peers on secure coding practices and defense against common OWASP vulnerabilities.'
      ],
      github: 'https://github.com/I-Sameer',
      demo: 'https://github.com/I-Sameer'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-content');
  const openModalBtns = document.querySelectorAll('.open-project-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan); background:rgba(56,189,248,0.12); padding:4px 10px; border-radius:6px; border:1px solid rgba(56,189,248,0.25);">
            ${data.category}
          </span>
        </div>
        <p style="color:var(--text-secondary); font-size:1.02rem; line-height:1.7; margin-bottom:18px;">
          ${data.overview}
        </p>
        <h4 style="font-size:1rem; color:var(--text-main); margin-bottom:10px;">Key Architectural Highlights:</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
          ${data.details.map(d => `<li style="position:relative; padding-left:20px; font-size:0.92rem; color:var(--text-muted); line-height:1.6;"><span style="position:absolute; left:0; color:var(--accent-cyan);">▹</span>${d}</li>`).join('')}
        </ul>
        <div style="margin-bottom:24px;">
          <h4 style="font-size:0.92rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; font-family:var(--font-mono);">Technologies Used</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${data.badges.map(b => `<span style="font-family:var(--font-mono); font-size:0.78rem; padding:4px 10px; border-radius:6px; background:rgba(255,255,255,0.06); color:var(--text-secondary); border:1px solid var(--border-subtle);">${b}</span>`).join('')}
          </div>
        </div>
        <div style="display:flex; gap:12px; border-top:1px solid var(--border-subtle); padding-top:18px;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>View Source on GitHub</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('project-modal').classList.remove('active')">
            Close Preview
          </button>
        </div>
      `;

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    projectModal?.classList.remove('active');
    resumeModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  // -------------------------------------------------------------------------
  // 7. Interactive Resume Modal
  // -------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close');
  const openResumeBtns = document.querySelectorAll('.open-resume-trigger');
  const printResumeBtn = document.getElementById('print-resume-btn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  resumeCloseBtn?.addEventListener('click', closeModal);
  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeModal();
  });

  printResumeBtn?.addEventListener('click', () => {
    window.print();
  });

  // Global Escape Key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // -------------------------------------------------------------------------
  // 8. Contact Form Client-Side Validation & Submission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    let isValid = true;

    // Reset validations
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input?.classList.remove('invalid');
      const errEl = input?.parentElement?.querySelector('.form-error-msg');
      if (errEl) errEl.classList.remove('visible');
    });

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('invalid');
      nameInput.parentElement.querySelector('.form-error-msg').classList.add('visible');
      isValid = false;
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('invalid');
      emailInput.parentElement.querySelector('.form-error-msg').classList.add('visible');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      subjectInput.classList.add('invalid');
      subjectInput.parentElement.querySelector('.form-error-msg').classList.add('visible');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('invalid');
      messageInput.parentElement.querySelector('.form-error-msg').classList.add('visible');
      isValid = false;
    }

    if (!isValid) {
      showToast('Please fill out all required fields properly. ⚠️');
      return;
    }

    // Simulated Sending State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        <span>Sending Message...</span>
      `;
    }

    // Simulate Network Request
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        `;
      }

      formStatus.className = 'form-status success';
      formStatus.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>Thank you, <strong>${nameInput.value.trim()}</strong>! Your message has been sent. I'll get back to you shortly.</span>
      `;

      showToast('Message sent successfully! 🚀');
      contactForm.reset();

      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 7000);
    }, 1200);
  });

  // -------------------------------------------------------------------------
  // 9. Toast Notification Helper
  // -------------------------------------------------------------------------
  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
