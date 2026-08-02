/**
 * Portfolio Contact & Direct Email Dispatcher
 * Sends emails directly to vijayakrishna.n213@gmail.com via HTTP API
 * with automatic fallback to mailto URI.
 */

const TARGET_EMAIL = 'vijayakrishna.n213@gmail.com';

/**
 * Sends message directly in background via FormSubmit API.
 * No email client or external app required on user's device.
 */
async function sendMail(event) {
  event.preventDefault();

  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const subjectInput = document.getElementById('sender-subject');
  const messageInput = document.getElementById('sender-message');
  const statusMsg = document.getElementById('form-status');
  const submitBtn = document.querySelector('.submit-btn');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const subject = (subjectInput && subjectInput.value.trim()) ? subjectInput.value.trim() : `Portfolio Contact from ${name}`;
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !message) {
    if (statusMsg) {
      statusMsg.style.display = 'block';
      statusMsg.style.color = '#ef4444';
      statusMsg.textContent = 'Please fill out all required fields (Name, Email, Message).';
    }
    return;
  }

  // Display sending state
  if (statusMsg) {
    statusMsg.style.display = 'block';
    statusMsg.style.color = '#38bdf8';
    statusMsg.textContent = '⏳ Sending message...';
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }

  try {
    // Send background HTTP request directly to target email without opening any local app
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: subject,
        message: message
      })
    });

    const result = await response.json();

    if (response.ok || result.success === 'true' || result.success === true) {
      if (statusMsg) {
        statusMsg.style.color = '#00f260';
        statusMsg.textContent = '✅ Message sent successfully! I will get back to you soon.';
      }
      const form = document.querySelector('.modal-form');
      if (form) form.reset();
    } else {
      throw new Error(result.message || 'Form submission failed');
    }
  } catch (error) {
    console.warn('Direct HTTP fetch failed, attempting fallback to mailto:', error);
    if (statusMsg) {
      statusMsg.style.color = '#eab308';
      statusMsg.textContent = 'Opening email application...';
    }

    // Fallback: Mailto link for devices with configured email apps
    const bodyText = `Hello Vijay,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}`;

    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 300);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  }
}

/**
 * Opens the interactive Contact Modal
 */
function openContactModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Closes the interactive Contact Modal
 */
function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside modal content
window.addEventListener('click', function (e) {
  const modal = document.getElementById('contact-modal');
  if (e.target === modal) {
    closeContactModal();
  }
});

/**
 * Toggles mobile hamburger navigation menu
 */
function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  if (navMenu) navMenu.classList.toggle('active');
  if (navToggle) navToggle.classList.toggle('active');
}

/**
 * Closes mobile hamburger navigation menu
 */
function closeMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  if (navMenu) navMenu.classList.remove('active');
  if (navToggle) navToggle.classList.remove('active');
}
