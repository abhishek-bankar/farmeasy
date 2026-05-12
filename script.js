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