/**
 * Portfolio Interactive Engine & 3D WebGL Quantum Physics (2025/2026 Edition)
 * Author: Nunna Vijaya Krishna
 */

const TARGET_EMAIL = 'vijayakrishna.n213@gmail.com';

/* ==========================================================================
   1. 3D INTERACTIVE QUANTUM CORE (Three.js WebGL)
   ========================================================================== */

(function init3DQuantumCore() {
  const canvas = document.getElementById('canvas-3d');
  const stage = document.getElementById('stage-container');
  if (!canvas || !stage || typeof THREE === 'undefined') return;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, stage.clientWidth / stage.clientHeight, 0.1, 1000);
  camera.position.z = 7.5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Dynamic Multi-Spectrum Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 60);
  cyanLight.position.set(5, 5, 5);
  scene.add(cyanLight);

  const deepBlueLight = new THREE.PointLight(0x0284c7, 3, 60);
  deepBlueLight.position.set(-5, -5, 4);
  scene.add(deepBlueLight);

  // Group container
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 1. Inner Quantum Nucleus (Faceted Crystal Icosahedron)
  const coreGeometry = new THREE.IcosahedronGeometry(1.65, 0);
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x070e18,
    emissive: 0x0369a1,
    specular: 0x00f0ff,
    shininess: 100,
    flatShading: true,
    transparent: true,
    opacity: 0.92
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  coreGroup.add(coreMesh);

  // 2. Cybernetic Outer Wireframe Shell
  const wireGeometry = new THREE.IcosahedronGeometry(1.7, 0);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  coreGroup.add(wireMesh);

  // 3. Emissive Vertex Nodes
  const vertices = [];
  const posAttr = coreGeometry.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    vertices.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
  }
  const nodesGeometry = new THREE.BufferGeometry();
  nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const nodesMaterial = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.16,
    transparent: true,
    opacity: 0.95
  });
  const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
  coreGroup.add(nodesMesh);

  // 4. Primary Orbital Gyro Ring
  const ring1Geometry = new THREE.TorusGeometry(2.45, 0.02, 16, 120);
  const ring1Material = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0x0284c7,
    emissiveIntensity: 0.5
  });
  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  ring1.rotation.x = Math.PI / 3;
  coreGroup.add(ring1);

  // 5. Secondary Orbital Ring (Counter-Angled)
  const ring2Geometry = new THREE.TorusGeometry(2.8, 0.015, 16, 120);
  const ring2Material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.85,
    roughness: 0.15,
    emissive: 0x0369a1,
    emissiveIntensity: 0.4
  });
  const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.y = Math.PI / 6;
  coreGroup.add(ring2);

  // 6. Tertiary Outer Horizon Ring
  const ring3Geometry = new THREE.TorusGeometry(3.15, 0.01, 16, 120);
  const ring3Material = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x0284c7,
    emissiveIntensity: 0.3
  });
  const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
  ring3.rotation.z = Math.PI / 5;
  coreGroup.add(ring3);

  // 7. Interactive Constellation Starfield (160 dynamic particles)
  const particleCount = 160;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 2.8 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i + 2] = radius * Math.cos(phi);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.055,
    transparent: true,
    opacity: 0.85
  });
  const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
  coreGroup.add(particleCloud);

  // Cursor Tracking with Spring Damping & Scroll Parallax
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isHovered = false;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let scrollYOffset = 0;

  window.addEventListener('scroll', () => {
    scrollYOffset = window.scrollY * 0.001;
  }, { passive: true });

  function onPointerMove(e) {
    const rect = stage.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    mouse.targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);

    if (isDragging) {
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;
      coreGroup.rotation.y += deltaX * 0.01;
      coreGroup.rotation.x += deltaY * 0.01;
    }
    previousMousePosition = { x: clientX, y: clientY };
  }

  // Window cursor parallax tracking
  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    if (!isHovered) {
      mouse.targetX = normX * 0.7;
      mouse.targetY = normY * 0.7;
    }
  }, { passive: true });

  stage.addEventListener('mouseenter', () => { isHovered = true; });
  stage.addEventListener('mouseleave', () => { isHovered = false; });
  stage.addEventListener('mousemove', onPointerMove, { passive: true });
  stage.addEventListener('touchmove', onPointerMove, { passive: true });

  stage.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  // Tactile Shockwave Pulse on Click
  stage.addEventListener('click', () => {
    coreMesh.scale.set(1.22, 1.22, 1.22);
    wireMesh.scale.set(1.26, 1.26, 1.26);
    cyanLight.intensity = 6;
    setTimeout(() => {
      coreMesh.scale.set(1, 1, 1);
      wireMesh.scale.set(1, 1, 1);
      cyanLight.intensity = 3.5;
    }, 280);
  });

  // Responsive Canvas Resize
  function onResize() {
    if (!stage || !canvas) return;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize);

  // Performance Guardrail: Pause offscreen
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(stage);

  // 60FPS Spring Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse coordinates with spring damping
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    // Base continuous rotation + dynamic cursor tilt + scroll parallax
    if (!isDragging) {
      coreGroup.rotation.y = elapsedTime * 0.28 + (mouse.x * 1.35) + scrollYOffset;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + (mouse.y * -1.0);
    }

    // Counter-rotating orbital rings
    ring1.rotation.z = elapsedTime * 0.45;
    ring2.rotation.z = -elapsedTime * 0.38;
    ring3.rotation.x = elapsedTime * 0.28;

    // Particle cloud slow orbital drift
    particleCloud.rotation.y = -elapsedTime * 0.09;
    particleCloud.rotation.x = Math.cos(elapsedTime * 0.1) * 0.12;

    // Dynamic light tracking with cursor
    cyanLight.position.x = mouse.x * 6 + 3;
    cyanLight.position.y = mouse.y * 6 + 3;

    // Floating breathing physics
    coreGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

    renderer.render(scene, camera);
  }

  animate();
})();

/* ==========================================================================
   2. SCROLL PROGRESS INDICATOR & SCROLL REVEAL OBSERVER
   ========================================================================== */

(function initScrollAnimations() {
  const progressBar = document.getElementById('scroll-progress');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  // 1. Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && progressBar) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // 2. IntersectionObserver for Reveal Animations
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Active Nav Link Tracking on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => navObserver.observe(section));
})();

/* ==========================================================================
   3. AMBIENT CURSOR GLOW
   ========================================================================== */

(function initAmbientCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function updateGlow() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(updateGlow);
  }
  updateGlow();
})();

/* ==========================================================================
   4. 3D PERSPECTIVE CARD PARALLAX TILT & SPOTLIGHTS
   ========================================================================== */

(function init3DCardTiltAndSpotlight() {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update spotlight position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Parallax Tilt Calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
})();

/* ==========================================================================
   5. DYNAMIC PROJECT CATEGORY FILTER ENGINE
   ========================================================================== */

(function initProjectFilterEngine() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Toggle active chip
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
})();

/* ==========================================================================
   6. MAGNETIC BUTTON MICRO-PHYSICS
   ========================================================================== */

(function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
})();

/* ==========================================================================
   7. CONTACT MODAL & DIRECT EMAIL DISPATCHER
   ========================================================================== */

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
      statusMsg.style.background = 'rgba(239, 68, 68, 0.15)';
      statusMsg.style.color = '#ef4444';
      statusMsg.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      statusMsg.textContent = 'Please fill out all required fields (Name, Email, Message).';
    }
    return;
  }

  if (statusMsg) {
    statusMsg.style.display = 'block';
    statusMsg.style.background = 'rgba(56, 189, 248, 0.1)';
    statusMsg.style.color = '#00f0ff';
    statusMsg.style.border = '1px solid rgba(0, 240, 255, 0.25)';
    statusMsg.textContent = 'Sending message...';
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }

  try {
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
        statusMsg.style.background = 'rgba(0, 255, 157, 0.1)';
        statusMsg.style.color = '#00ff9d';
        statusMsg.style.border = '1px solid rgba(0, 255, 157, 0.25)';
        statusMsg.textContent = 'Message sent successfully! I will respond promptly.';
      }
      const form = document.querySelector('.modal-form');
      if (form) form.reset();
    } else {
      throw new Error(result.message || 'Form submission failed');
    }
  } catch (error) {
    console.warn('HTTP dispatch fallback to mailto:', error);
    if (statusMsg) {
      statusMsg.style.background = 'rgba(255, 184, 0, 0.1)';
      statusMsg.style.color = '#ffb800';
      statusMsg.style.border = '1px solid rgba(255, 184, 0, 0.25)';
      statusMsg.textContent = 'Opening email application...';
    }

    const bodyText = `Hello Vijay,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
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

function openContactModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('click', function (e) {
  const modal = document.getElementById('contact-modal');
  if (e.target === modal) {
    closeContactModal();
  }
});

/* ==========================================================================
   8. MOBILE NAVIGATION
   ========================================================================== */

function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  if (navMenu) navMenu.classList.toggle('active');
  if (navToggle) navToggle.classList.toggle('active');
}

function closeMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  if (navMenu) navMenu.classList.remove('active');
  if (navToggle) navToggle.classList.remove('active');
}
