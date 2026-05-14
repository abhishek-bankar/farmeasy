// Scroll reveal
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('up'); }),
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 72, behavior: 'smooth' }); }
    });
  });

  // Dealer modal open/close
  const dealerModal = document.getElementById('dealerModal');
  const openDealerBtn = document.getElementById('openDealerModal');
  const closeDealerBtn = document.getElementById('closeDealerModal');
  function openDealerModal() {
    dealerModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDealerModal() {
    dealerModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if (openDealerBtn) openDealerBtn.addEventListener('click', openDealerModal);
  if (closeDealerBtn) closeDealerBtn.addEventListener('click', closeDealerModal);
  if (dealerModal) {
    dealerModal.addEventListener('click', e => {
      if (e.target === dealerModal) closeDealerModal();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dealerModal.classList.contains('is-open')) closeDealerModal();
  });

  // Product cards — infinite loop animation while in view
  const pgrid = document.querySelector('.pgrid');
  if (pgrid) {
    const cards = Array.from(pgrid.querySelectorAll('.pcard'));
    let cardLoop = null;
    function runCardLoop() {
      cards.forEach(c => c.classList.remove('card-visible'));
      const totalTime = cards.length * 200 + 800;
      cards.forEach((card, i) => setTimeout(() => card.classList.add('card-visible'), i * 200));
      cardLoop = setTimeout(runCardLoop, totalTime);
    }
    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCardLoop();
        } else {
          clearTimeout(cardLoop);
          cards.forEach(c => c.classList.remove('card-visible'));
        }
      });
    }, { threshold: 0.1 });
    cardObs.observe(pgrid);
  }

  // Process steps — infinite loop animation while in view
  const processSteps = document.querySelector('.process-steps');
  if (processSteps) {
    const stepItems = Array.from(processSteps.children);
    let stepLoop = null;
    function runStepLoop() {
      stepItems.forEach(s => s.classList.remove('step-visible'));
      const totalTime = stepItems.length * 300 + 800;
      stepItems.forEach((item, i) => setTimeout(() => item.classList.add('step-visible'), i * 300));
      stepLoop = setTimeout(runStepLoop, totalTime);
    }
    const processObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runStepLoop();
        } else {
          clearTimeout(stepLoop);
          stepItems.forEach(s => s.classList.remove('step-visible'));
        }
      });
    }, { threshold: 0.15 });
    processObs.observe(processSteps);
  }

  // Testimonial carousel dots sync
  const ttrack = document.getElementById('tcarouselTrack');
  const tdots = document.querySelectorAll('.tdot');
  if (ttrack && tdots.length) {
    const cardWidth = 320 + 24;
    const total = 4;
    setInterval(() => {
      const scrolled = (Date.now() / (16000 / (cardWidth * total))) % (cardWidth * total);
      const active = Math.floor(scrolled / cardWidth) % total;
      tdots.forEach((d, i) => d.classList.toggle('active', i === active));
    }, 400);
  }

  // Web3Forms submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(contactForm) });
      const json = await res.json();
      if (json.success) {
        btn.textContent = '✓ Sent! We\'ll be in touch soon.';
        btn.style.background = 'var(--green)';
        contactForm.reset();
      } else {
        btn.textContent = 'Failed. Please try again.';
        btn.style.background = 'var(--red-dk)';
        btn.disabled = false;
      }
    });
  }