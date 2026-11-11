'use client';

import { useEffect } from 'react';

// Enhance the server-rendered portfolio without shipping its static content as client components.
export default function PortfolioInteractions() {
  useEffect(() => {
    const lifetime = new AbortController();
    const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: lifetime.signal });
    const modal = document.getElementById('contact-modal');
    const form = modal.querySelector('form');
    const menu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    const links = [...menu.querySelectorAll('a')];
    const status = document.getElementById('form-status');
    let opener, frame = 0, request, timeout, backdropPress = false;
    const closeMenu = () => { menu.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); };
    const setStatus = (state, message) => { status.dataset.state = state; status.textContent = message; status.hidden = false; };
    const outside = event => { const r = modal.getBoundingClientRect(); return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom; };
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - innerHeight;
      document.getElementById('scroll-progress').style.width = `${height > 0 ? scrollY / height * 100 : 0}%`;
      const current = links.filter(link => document.querySelector(link.hash).getBoundingClientRect().top <= 120).at(-1);
      links.forEach(link => { link.classList.toggle('active', link === current); if (link === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    };
    listen(window, 'scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
    listen(window, 'resize', update);
    update();
    listen(toggle, 'click', () => { toggle.setAttribute('aria-expanded', String(menu.classList.toggle('active'))); });
    listen(document, 'click', event => {
      const target = event.target.closest('[data-contact-open], [data-contact-close], .filter-chip, .nav-link');
      if (!event.target.closest('.navbar') || target?.matches('.nav-link')) closeMenu();
      if (target?.matches('[data-contact-open]')) {
        event.preventDefault(); opener = target; closeMenu(); modal.showModal(); document.body.classList.add('modal-open'); document.getElementById('sender-name').focus();
      } else if (target?.matches('[data-contact-close]')) modal.close();
      else if (target?.matches('.filter-chip')) {
        document.querySelectorAll('.filter-chip').forEach(chip => { chip.classList.toggle('active', chip === target); chip.setAttribute('aria-pressed', String(chip === target)); });
        document.querySelectorAll('.project-card').forEach(card => { card.hidden = target.dataset.filter !== 'all' && card.dataset.category !== target.dataset.filter; });
        update();
      }
    });
    listen(document, 'keydown', event => { if (event.key === 'Escape' && menu.classList.contains('active')) { closeMenu(); toggle.focus(); } });
    listen(window.matchMedia('(min-width: 901px)'), 'change', () => { if (menu.contains(document.activeElement) && innerWidth <= 900) toggle.focus(); closeMenu(); });
    listen(modal, 'close', () => { document.body.classList.remove('modal-open'); if (opener?.isConnected) opener.focus(); });
    listen(modal, 'keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...modal.querySelectorAll('button:not(:disabled), input:not([tabindex="-1"]), textarea, a[href]')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    listen(modal, 'pointerdown', event => { backdropPress = outside(event); });
    listen(modal, 'click', event => { if (backdropPress && outside(event)) modal.close(); backdropPress = false; });
    listen(form, 'input', event => event.target.removeAttribute('aria-invalid'));
    listen(form, 'submit', async event => {
      event.preventDefault();
      const button = form.querySelector('.submit-btn');
      if (button.disabled) return;
      const required = [...form.querySelectorAll('[required]')];
      const invalid = required.filter(input => !input.value.trim() || !input.validity.valid);
      required.forEach(input => input.setAttribute('aria-invalid', String(invalid.includes(input))));
      if (invalid.length) { setStatus('error', 'Please enter your name, a valid email address, and a message.'); invalid[0].focus(); return; }
      const values = Object.fromEntries(new FormData(form));
      const { name, email, subject, message } = values;
      button.disabled = true; form.setAttribute('aria-busy', 'true'); setStatus('pending', 'Sending message…');
      request = new AbortController(); timeout = setTimeout(() => request.abort(), 30000);
      try {
        const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values), signal: request.signal });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error('Submission not confirmed');
        if (lifetime.signal.aborted) return;
        setStatus('success', 'Message sent successfully. Thank you for getting in touch.'); form.reset();
        form.querySelector('.direct-mail-btn').href = 'mailto:vijayakrishna.n213@gmail.com';
      } catch {
        if (lifetime.signal.aborted) return;
        setStatus('error', 'Your message could not be sent. Please try again, or choose Direct Mail to send it through your email app.');
        form.querySelector('.direct-mail-btn').href = `mailto:vijayakrishna.n213@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      } finally {
        clearTimeout(timeout); button.disabled = false; form.removeAttribute('aria-busy');
      }
    });
    return () => { lifetime.abort(); request?.abort(); clearTimeout(timeout); cancelAnimationFrame(frame); document.body.classList.remove('modal-open'); };
  }, []);
  return null;
}
