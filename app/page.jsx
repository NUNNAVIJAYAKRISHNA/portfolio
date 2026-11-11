import PortfolioInteractions from "./portfolio-interactions";

export default function Home() {
 return <>

	<a className="skip-link" href="#main-content">Skip to content</a>

	
	<div className="scroll-progress-bar" id="scroll-progress" aria-hidden="true"></div>


	
	<header className="navbar">
		<div className="nav-container">
			<a href="#" className="nav-logo">
				<span className="logo-accent">NVK</span>
				<span className="logo-text">Nunna Vijaya Krishna</span>
			</a>
			
			<button className="nav-toggle" id="nav-toggle"  aria-label="Toggle navigation" aria-controls="nav-menu" aria-expanded="false">
				<span className="hamburger-bar"></span>
				<span className="hamburger-bar"></span>
				<span className="hamburger-bar"></span>
			</button>

			<nav className="nav-menu" id="nav-menu" aria-label="Primary">
				<a href="#projects" className="nav-link" >Work</a>
				<a href="#experience" className="nav-link" >Experience</a>
				<a href="#focus" className="nav-link" >Expertise</a>
				<a href="#certifications" className="nav-link" >Credentials</a>
				<a href="#contact" className="nav-link" >Contact</a>
			</nav>

			<a href="mailto:vijayakrishna.n213@gmail.com" className="nav-cta" data-contact-open="true">
				<span>Get in Touch</span>
				<svg aria-hidden="true" focusable="false" className="cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
			</a>
		</div>
	</header>

	<main id="main-content">
	
	<section id="about" className="hero folio-hero" aria-labelledby="intro-title">
		<div className="intro-copy">
			<p className="folio-kicker">Software engineering / Applied machine learning</p>
			<h1 id="intro-title">Nunna Vijaya Krishna</h1>
			<p className="intro-statement">I build web applications, computer vision models, and ServiceNow workflows.</p>
			<p className="intro-description">My work connects backend architecture, deep learning, and enterprise automation. Here are the projects behind it.</p>
			<div className="intro-actions">
				<a href="#projects" className="folio-action folio-action-primary">Selected Work <span aria-hidden="true">&#8595;</span></a>
				<a href="mailto:vijayakrishna.n213@gmail.com" className="folio-action" data-contact-open="true">Contact <span aria-hidden="true">&#8599;</span></a>
			</div>
		</div>
		<aside className="intro-aside" aria-label="Profile and credentials">
			<img src="/images/profile.jpg" alt="Nunna Vijaya Krishna" width="88" height="88" className="intro-portrait" />
			<p className="intro-availability">Available for engineering roles</p>
			<p>Computer Science<br />ServiceNow CAD &#38; CSA<br />AWS &#38; MongoDB certified</p>
			<div className="intro-links">
				<a href="https://github.com/NUNNAVIJAYAKRISHNA" target="_blank" rel="noopener noreferrer">GitHub &#8599;</a>
				<a href="https://linkedin.com/in/nunnavijayakrishna" target="_blank" rel="noopener noreferrer">LinkedIn &#8599;</a>
				<a href="https://credly.com/users/n-vijay-krishna" target="_blank" rel="noopener noreferrer">Credentials &#8599;</a>
			</div>
			<p className="intro-record">5+ shipped apps &#183; 100% NQT coding</p>
		</aside>
	</section>

	
	<section id="projects" className="selected-work" aria-labelledby="work-title">
		<div className="section-header-flex">
			<div className="section-header">
				<div className="section-tag">
					Portfolio
				</div>
				<h2 className="section-title" id="work-title">Selected Work</h2>
				<p className="section-subtitle">Real-world applications in Machine Learning, Full Stack, and Enterprise Automation.</p>
			</div>

			
			<div className="project-filters" id="project-filters" role="group" aria-label="Filter projects">
				<button className="filter-chip active" data-filter="all" aria-pressed="true">All</button>
				<button className="filter-chip" data-filter="ml" aria-pressed="false">Machine Learning</button>
				<button className="filter-chip" data-filter="fullstack" aria-pressed="false">Full Stack</button>
				<button className="filter-chip" data-filter="servicenow" aria-pressed="false">ServiceNow</button>
			</div>
		</div>

		<div className="projects-grid" id="projects-grid">

			
			<article className="project-card project-card-featured" data-category="fullstack">
				<div className="project-body">
					<div className="project-meta">
						<span className="project-type">Full Stack Platform</span>
						<a href="https://assignment-submission-gules.vercel.app/" target="_blank" rel="noopener noreferrer" className="live-link">
							Live Production Demo
							<svg aria-hidden="true" focusable="false" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
						</a>
					</div>
					<h3 className="project-title">ClassVault &#8211; Assignment Submission Platform</h3>
					<div className="project-tech">Next.js 15 &#8226; React 19 &#8226; Node.js &#8226; Express &#8226; MongoDB</div>
					
					<div className="project-details">
						<div className="project-section">
							<div className="project-label">Problem</div>
							<div className="project-text">Tracking student assignment submissions accurately at department scale without manual paperwork.</div>
						</div>
						<div className="project-section">
							<div className="project-label">Solution</div>
							<div className="project-text">Full-stack web application featuring role-based authentication, RESTful APIs, file management, and real-time submission workflows.</div>
						</div>
					</div>
					
					<div className="project-impact">
						<span>Deploys on Vercel with scalable database design &#38; JWT security</span>
					</div>
				</div>
			</article>

			
			<article className="project-card" data-category="ml">
				<div className="project-body">
					<div className="project-meta">
						<span className="project-type">Deep Learning</span>
						<span className="accuracy-badge">91.2% Accuracy</span>
					</div>
					<h3 className="project-title">Plant Disease Classification Pipeline</h3>
					<div className="project-tech">PyTorch &#8226; ConvNeXt &#8226; TensorFlow Lite &#8226; OpenCV</div>
					
					<div className="project-details">
						<div className="project-section">
							<div className="project-label">Problem</div>
							<div className="project-text">Automated high-accuracy detection of plant diseases from leaf imagery in agricultural environments.</div>
						</div>
						<div className="project-section">
							<div className="project-label">Solution</div>
							<div className="project-text">Custom deep convolutional neural network (ConvNeXt) trained on an 80,000+ image dataset with advanced augmentation &#38; optimization.</div>
						</div>
					</div>

					<div className="project-impact">
						<span>Achieved 91.2% classification accuracy across complex leaf datasets</span>
					</div>
				</div>
			</article>

			
			<article className="project-card" data-category="servicenow">
				<div className="project-body">
					<div className="project-meta">
						<span className="project-type">ServiceNow Scoped App</span>
						<span className="accuracy-badge">35/35 UAT &#8226; 10/10 Security PoC</span>
					</div>
					<h3 className="project-title">Patient Discharge Readiness Command Center</h3>
					<div className="project-tech">ServiceNow &#8226; Flow Designer &#8226; Script Includes &#8226; Business Rules &#8226; ACLs &#8226; Service Portal</div>
					
					<div className="project-details">
						<div className="project-section">
							<div className="project-label">Problem</div>
							<div className="project-text">Medically cleared hospital discharges stall across uncoordinated Pharmacy, Billing/TPA, Transport, and Nursing handoffs, delaying bed turnover and caregiver visibility.</div>
						</div>
						<div className="project-section">
							<div className="project-label">Solution</div>
							<div className="project-text">Scoped ServiceNow application across 5 custom tables with Flow Designer checklists &#38; SLAs, server-side blocker rollup, gatekeeper Business Rules, RBAC/ACLs, and a tokenized zero-PHI Caregiver Portal.</div>
						</div>
					</div>

					<div className="project-impact">
						<span>Passed 35/35 UAT scenarios and 10/10 Gate 3.5 security tests with zero PHI leakage</span>
					</div>
				</div>
			</article>

		</div>
	</section>

	
	<section id="experience">
		<div className="section-header">
			<div className="section-tag">
				Career Trajectory
			</div>
			<h2 className="section-title">Work Experience</h2>
			<p className="section-subtitle">Engineering roles in production software development and Agile system delivery.</p>
		</div>

		<div className="timeline">
			<div className="timeline-item">
				<div className="experience-card">
					<div className="job-header">
						<div>
							<h3 className="job-title">Full Stack Developer Intern</h3>
							<div className="job-company">RivoMind Technologies</div>
						</div>
						<span className="job-badge">Current</span>
					</div>
					<div className="job-duration">Remote &#8226; Jul 2026 &#8211; Present</div>
					<ul className="job-bullets">
						<li>Architecting modular frontend and backend components for core platform features.</li>
						<li>Recommended and implemented high-agency UI/UX enhancements across web interfaces.</li>
						<li>Participating in cross-functional Agile sprint planning, peer reviews, and system delivery.</li>
						<li>Delivering robust bug fixes and API integrations within stipulated production deadlines.</li>
					</ul>
				</div>
			</div>

			<div className="timeline-item">
				<div className="experience-card">
					<div className="job-header">
						<div>
							<h3 className="job-title">ServiceNow Intern</h3>
							<div className="job-company">SmartBridge Educational Services Pvt. Ltd.</div>
						</div>
						<span className="job-badge completed">Completed</span>
					</div>
					<div className="job-duration">May &#8211; June 2026</div>
					<ul className="job-bullets">
						<li>Successfully completed a structured internship program focused on practical application of technical concepts.</li>
						<li>Gained hands-on experience by working on real-world projects and implementing industry-relevant technologies.</li>
						<li>Strengthened problem-solving, technical, and project development skills through practical assignments.</li>
						<li>Collaborated with peers and mentors to complete assigned tasks and project deliverables.</li>
					</ul>
				</div>
			</div>

			<div className="timeline-item">
				<div className="experience-card">
					<div className="job-header">
						<div>
							<h3 className="job-title">Web Development Intern</h3>
							<div className="job-company">Cognifyz Technologies</div>
						</div>
						<span className="job-badge completed">Completed</span>
					</div>
					<div className="job-duration">Remote &#8226; Mar 2026 &#8211; Apr 2026</div>
					<ul className="job-bullets">
						<li>Debugged and optimized high-performance web interfaces using modern JavaScript.</li>
						<li>Implemented responsive frontend layouts with strict cross-browser compatibility.</li>
						<li>Applied systematic problem-solving and automated testing techniques under mentorship.</li>
						<li>Built performant DOM manipulation logic and core algorithm utilities.</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	
	<section id="focus">
		<div className="section-header">
			<div className="section-tag">
				Core Disciplines
			</div>
			<h2 className="section-title">Specializations</h2>
			<p className="section-subtitle">Disciplines where engineering rigor meets applied innovation.</p>
		</div>

		<div className="focus-grid">
			<div className="focus-card">
				<h3 className="focus-title">Software Engineering</h3>
				<p className="focus-desc">Designing robust backend systems, REST APIs, scalable application architecture, data structures, and efficient algorithms.</p>
			</div>
			
			<div className="focus-card">
				<h3 className="focus-title">Machine Learning</h3>
				<p className="focus-desc">Computer Vision, Deep Learning model architectures (CNNs, ConvNeXt), image preprocessing pipelines, and NLP classification.</p>
			</div>
			
			<div className="focus-card">
				<h3 className="focus-title">Full Stack Web Dev</h3>
				<p className="focus-desc">Modern responsive web applications using React.js, Next.js, Node.js, Express, MongoDB, and modern layout engines.</p>
			</div>
			
			<div className="focus-card">
				<h3 className="focus-title">Enterprise ServiceNow</h3>
				<p className="focus-desc">Custom application development, ServiceNow Flow Designer, Business Rules, Client Scripts, UI Policies, and ACL security configurations.</p>
			</div>
		</div>
	</section>

	
	<section id="skills" className="skills-section">
		<div className="section-header">
			<div className="section-tag">
				Engineering Stack
			</div>
			<h2 className="section-title">Technical Toolkit</h2>
			<p className="section-subtitle">Languages, backend architectures, machine learning frameworks, and developer tooling.</p>
		</div>

		<div className="toolkit-index">
			<div className="toolkit-group"><h3>Languages</h3><ul><li>Python</li><li>JavaScript</li><li>TypeScript</li><li>C++</li><li>Java</li><li>C</li></ul></div>
			<div className="toolkit-group"><h3>Web & data</h3><ul><li>React 19</li><li>Next.js 15</li><li>Node.js</li><li>Express.js</li><li>MongoDB</li><li>Firebase</li><li>SQL / Postgres</li><li>Tailwind CSS</li><li>HTML5</li><li>CSS3</li></ul></div>
			<div className="toolkit-group"><h3>Machine learning</h3><ul><li>PyTorch</li><li>TensorFlow</li><li>OpenCV</li><li>Pandas</li><li>NumPy</li><li>Scikit-Learn</li></ul></div>
			<div className="toolkit-group"><h3>Development tools</h3><ul><li>Git</li><li>GitHub</li><li>VS Code</li><li>Jupyter</li><li>Postman</li><li>Vercel</li></ul></div>
		</div>
	</section>

	
	<section id="servicenow">
		<div className="section-header">
			<div className="section-tag">
				Enterprise Platform
			</div>
			<h2 className="section-title">ServiceNow Architecture</h2>
			<p className="section-subtitle">Official dual industry certifications and automated enterprise architecture.</p>
		</div>

		<div className="servicenow-grid">
			<div className="servicenow-card">
				<div className="servicenow-card-title">
					Industry Certifications
				</div>
				<div className="servicenow-items">
					<div className="servicenow-item">
						<span>ServiceNow Certified System Administrator (CSA)</span>
						<span className="sn-cert-badge">Verified</span>
					</div>
					<div className="servicenow-item">
						<span>ServiceNow Certified Application Developer (CAD)</span>
						<span className="sn-cert-badge">Verified</span>
					</div>
				</div>
			</div>

			<div className="servicenow-card">
				<div className="servicenow-card-title">
					Platform Capabilities
				</div>
				<div className="servicenow-items">
					<div className="servicenow-item">Business Rules &#38; Server-Side Scripting</div>
					<div className="servicenow-item">Client Scripts &#38; UI Policies</div>
					<div className="servicenow-item">UI Actions &#38; Form Customizations</div>
					<div className="servicenow-item">Access Control Lists (ACLs) Security</div>
					<div className="servicenow-item">Flow Designer Workflow Automation</div>
					<div className="servicenow-item">Scoped Applications &#38; Catalog Items</div>
				</div>
			</div>
		</div>
	</section>

	
	<section id="achievements">
		<div className="section-header">
			<div className="section-tag">
				Competitive Honors
			</div>
			<h2 className="section-title">Key Achievements</h2>
			<p className="section-subtitle">National assessments and inter-collegiate competitive programming recognitions.</p>
		</div>

		<div className="achievements-grid">
			<div className="achievement-card">
				<h3 className="achievement-title">TCS iON NQT</h3>
				<div className="achievement-sub">March 20, 2026</div>
				<div className="achievement-desc">
					Achieved <strong>79th Percentile Overall</strong><br />
					<span className="highlight-score">Coding: 100%</span>
					<span className="highlight-score">Advanced: 83%</span>
				</div>
			</div>

			<div className="achievement-card">
				<h3 className="achievement-title">Compile &#38; Conquer</h3>
				<div className="achievement-sub">Competitive Coding Contest</div>
				<div className="achievement-desc">
					Awarded <strong>2nd Prize</strong> in the inter-college C Programming Competitive Coding Contest.
				</div>
			</div>

			<div className="achievement-card">
				<h3 className="achievement-title">Pythonista</h3>
				<div className="achievement-sub">Development Hackathon</div>
				<div className="achievement-desc">
					Secured <strong>2nd Prize</strong> in Python Programming &#38; Problem Solving Challenge.
				</div>
			</div>
		</div>
	</section>

	
	<section id="certifications">
		<div className="section-header">
			<div className="section-tag">
				Verified Credentials
			</div>
			<h2 className="section-title">Certifications</h2>
			<p className="section-subtitle">Verified industry credentials and cloud platform certifications.</p>
		</div>

		<div className="certs-grid">
			<div className="cert-item">
				<div className="cert-info">
					<div className="cert-name">ServiceNow CSA</div>
					<div className="cert-issuer">Certified System Administrator</div>
				</div>
			</div>

			<div className="cert-item">
				<div className="cert-info">
					<div className="cert-name">ServiceNow CAD</div>
					<div className="cert-issuer">Certified Application Developer</div>
				</div>
			</div>

			<div className="cert-item">
				<div className="cert-info">
					<div className="cert-name">MongoDB Associate</div>
					<div className="cert-issuer">Developer Certification</div>
				</div>
			</div>

			<div className="cert-item">
				<div className="cert-info">
					<div className="cert-name">AWS AI Practitioner</div>
					<div className="cert-issuer">Amazon Web Services</div>
				</div>
			</div>

			<div className="cert-item">
				<div className="cert-info">
					<div className="cert-name">NPTEL Introduction to ML</div>
					<div className="cert-issuer">Introduction to Machine Learning</div>
				</div>
			</div>

			<div className="cert-item">
				<div className="cert-info">
					<div className="cert-name">NPTEL AI Fundamentals</div>
					<div className="cert-issuer">Fundamentals of AI</div>
				</div>
			</div>
		</div>
	</section>

	
	<section id="education">
		<div className="section-header">
			<div className="section-tag">
				Academic Foundation
			</div>
			<h2 className="section-title">Education</h2>
		</div>

		<div className="education-card">
			<div className="ed-body">
				<h3 className="ed-degree">B.Tech in Computer Science &#38; Engineering</h3>
				<div className="ed-school">Aditya Institute of Technology and Management</div>
				<div className="ed-meta">
					<span className="ed-pill">CGPA: 8.63</span>
					<span className="ed-pill">Graduation: 2027</span>
				</div>
			</div>
		</div>
	</section>

	</main>
	
	<footer id="contact" className="cta-footer">
		<div className="footer-container">
			<h2 className="footer-title">Let's Build High-Impact Systems Together</h2>
			<p className="cta-text">Open to Software Engineering, Machine Learning, ServiceNow, and Full Stack Development opportunities.</p>
			
			<div className="hero-cta-group">
				<a href="mailto:vijayakrishna.n213@gmail.com" className="cta-btn primary" data-contact-open="true">
					<svg aria-hidden="true" focusable="false" className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					Get in Touch
				</a>
				<a href="https://github.com/NUNNAVIJAYAKRISHNA" target="_blank" rel="noopener noreferrer" className="cta-btn">
					<svg aria-hidden="true" focusable="false" className="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
					GitHub
				</a>
				<a href="https://linkedin.com/in/nunnavijayakrishna" target="_blank" rel="noopener noreferrer" className="cta-btn">
					<svg aria-hidden="true" focusable="false" className="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
					LinkedIn
				</a>
			</div>
			
			<div className="contact-line">
				<span className="contact-item">
					<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
					India
				</span>
				<span className="contact-item">
					<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
					+91 9550531182
				</span>
				<span className="contact-item">
					<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					vijayakrishna.n213@gmail.com
				</span>
			</div>
			
			<nav className="section-directory" aria-label="More about Vijay">
				<a href="#about">Introduction</a><a href="#skills">Skills</a><a href="#servicenow">ServiceNow</a><a href="#achievements">Achievements</a><a href="#education">Education</a>
			</nav>
			<div className="copyright">
				&#169; 2026 Nunna Vijaya Krishna. Built for performance and precision.
			</div>
		</div>
	</footer>

	
	<dialog id="contact-modal" className="contact-dialog" aria-labelledby="contact-title" aria-describedby="contact-description">
		<div className="modal-card">
			<button className="modal-close" data-contact-close="true" aria-label="Close">&#215;</button>
			<div className="modal-header">
				<h2 className="modal-title" id="contact-title">Get in Touch</h2>
				<p className="modal-sub" id="contact-description">Send a direct message to <strong>vijayakrishna.n213@gmail.com</strong></p>
			</div>
			<form className="modal-form" noValidate>
				<div className="form-group">
					<label htmlFor="sender-name">Your Name *</label>
					<input type="text" id="sender-name" name="name" maxLength={100} autoComplete="name" placeholder="Name" required className="form-input" />
				</div>
				<div className="form-group">
					<label htmlFor="sender-email">Your Email *</label>
					<input type="email" id="sender-email" name="email" maxLength={254} autoComplete="email" placeholder="email@example.com" required className="form-input" />
				</div>
				<div className="form-group">
					<label htmlFor="sender-subject">Subject</label>
					<input type="text" id="sender-subject" name="subject" maxLength={200} placeholder="Project Opportunity / Inquiry" className="form-input" />
				</div>
				<div className="form-group">
					<label htmlFor="sender-message">Message *</label>
					<textarea id="sender-message" name="message" maxLength={5000} rows="4" placeholder="Hello Vijay, I would like to discuss..." required className="form-input"></textarea>
				</div>
				<div className="contact-trap" aria-hidden="true"><label htmlFor="website">Leave blank</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
<div id="form-status" className="form-status" role="status" aria-live="polite" aria-atomic="true" hidden></div>
				<div className="modal-actions">
					<button type="submit" className="submit-btn">Send Message</button>
					<a href="mailto:vijayakrishna.n213@gmail.com" className="direct-mail-btn">Direct Mail</a>
				</div>
			</form>
		</div>
	</dialog>

	

<PortfolioInteractions />
</>;
}
