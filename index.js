/**
 * PORTFOLIO V2 — MAIN INTERACTIVE JAVASCRIPT
 * Features: Typewriter effect, Mobile nav toggle, Scrollspy, Modal Case Study popups, Form validation & Toast notifications.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. TYPEWRITER EFFECT IN HERO SECTION
    // ----------------------------------------------------------------------
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const phrases = [
            "Front-End Applications.",
            "Responsive Web Interfaces.",
            "Interactive UI Experiences.",
            "Performant Web Products."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 1800; // Pause at end of phrase
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400;
            }

            setTimeout(typeLoop, typeSpeed);
        }

        typeLoop();
    }

    // ----------------------------------------------------------------------
    // 2. MOBILE NAVIGATION DRAWER
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const barIcon = document.getElementById("bar-icon");
    const closeIcon = document.getElementById("close-icon");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            const isExpanded = navMenu.classList.toggle("active");
            mobileToggle.setAttribute("aria-expanded", isExpanded);

            if (isExpanded) {
                barIcon.style.display = "none";
                closeIcon.style.display = "block";
            } else {
                barIcon.style.display = "block";
                closeIcon.style.display = "none";
            }
        });

        // Close mobile nav when clicking any link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                mobileToggle.setAttribute("aria-expanded", "false");
                if (barIcon && closeIcon) {
                    barIcon.style.display = "block";
                    closeIcon.style.display = "none";
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. ACTIVE NAV SCROLLSPY (IntersectionObserver)
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ----------------------------------------------------------------------
    // 4. CASE STUDY MODAL DATA & POPUP HANDLER
    // ----------------------------------------------------------------------
    const projectModal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");

    const caseStudiesData = {
        aistudyhub: {
            title: "AI Study Hub",
            badge: "⭐ Main Project",
            tech: ["React.js", "Vite", "Supabase", "Tailwind CSS", "React Router", "Custom Domain"],
            problem: "Students need a centralized, AI-powered platform to organize study resources, manage learning materials, and track progress — all with user authentication and real-time data sync across devices.",
            solution: "Built a full-stack React application with Supabase for backend (auth, database, real-time subscriptions), Tailwind CSS for responsive UI, React Router for SPA navigation, and deployed on custom domain aistudyhub.cloud.",
            keyFeatures: [
                "User authentication with Supabase Auth",
                "Real-time data synchronization across devices",
                "AI-powered study resource management",
                "Responsive Tailwind CSS UI with dark mode",
                "Custom domain deployment (aistudyhub.cloud)",
                "React Router SPA navigation"
            ],
            demoUrl: "https://aistudyhub.cloud/",
            githubUrl: "https://github.com/anhquoc061205"
        },
        spotify: {
            title: "Spotify Web Player Clone",
            badge: "Featured App",
            tech: ["JavaScript ES6+", "HTML5/CSS3", "Web Audio API", "DOM Manipulation"],
            problem: "Building a music player requires handling track queueing, play/pause states, volume control, dynamic DOM playlist updates, and responsive music controls — all without any framework.",
            solution: "Designed a clean Vanilla JavaScript architecture utilizing modular event handlers, custom HTML5 Audio API listeners (timeupdate, ended), and responsive CSS layout matching Spotify's aesthetic.",
            keyFeatures: [
                "Real-time audio playback controls with track seekbar",
                "Dynamic track list rendering with active track highlights",
                "Volume control and mute toggle functionality",
                "Fully responsive layout deployed on Vercel"
            ],
            demoUrl: "https://spotify-clone-wheat-delta.vercel.app",
            githubUrl: "https://github.com/anhquoc061205/Spotify-clone"
        },
        todolist: {
            title: "Todo List CRUD App",
            badge: "Full CRUD",
            tech: ["JavaScript ES6+", "Axios", "MockAPI REST", "SweetAlert2", "Async/Await"],
            problem: "Implementing persistent task management with a live REST API backend, supporting full Create/Read/Update/Delete operations with user-friendly modal confirmations and notifications.",
            solution: "Used Axios for async HTTP requests to MockAPI, DOM rendering with innerHTML for dynamic task lists, SweetAlert2 for beautiful modal confirmations and notifications, and date formatting with toLocaleString.",
            keyFeatures: [
                "Full CRUD operations (POST, GET, PUT, DELETE) via REST API",
                "Async/Await pattern with proper error handling",
                "SweetAlert2 modal confirmations for delete actions",
                "Dynamic DOM rendering sorted by creation date",
                "Deployed and accessible on Vercel"
            ],
            demoUrl: "https://todo-list-ten-lilac-20.vercel.app",
            githubUrl: "https://github.com/anhquoc061205/todo-list"
        },
        portfoliov1: {
            title: "Personal Portfolio V1",
            badge: "Showcase Project",
            tech: ["HTML5", "CSS3 Custom Properties", "Particles.js", "Vanilla JS"],
            problem: "Creating an eye-catching personal developer website with animated particle effects, dark-mode aesthetic, and mobile-responsive navigation drawer.",
            solution: "Implemented dark-mode design with CSS Flexbox, custom CSS root variables for theming, Particles.js for animated canvas background, and JavaScript event listeners for mobile drawer toggle.",
            keyFeatures: [
                "Dark theme layout with Particles.js animated canvas background",
                "Mobile navigation drawer toggle with DOM event handling",
                "CSS custom properties for consistent design tokens",
                "Deployed on Vercel with live preview"
            ],
            demoUrl: "https://portfolio-lovat-mu-32.vercel.app",
            githubUrl: "https://github.com/anhquoc061205/Portfolio"
        },
        fountain: {
            title: "Fountain Education Landing",
            badge: "Landing Page",
            tech: ["HTML5/CSS3", "jQuery", "Slick Carousel", "Responsive Design"],
            problem: "Building a professional multi-section education platform landing page with interactive course category browsing, responsive hero section, and smooth scroll navigation.",
            solution: "Structured responsive layout with CSS Flexbox, integrated Slick carousel library for course category slider, jQuery scroll handlers for smooth navigation, and mobile hamburger menu toggle.",
            keyFeatures: [
                "Responsive hero section with CTA buttons",
                "Slick carousel for course category browsing",
                "Smooth scroll-to-top button",
                "Mobile hamburger navigation menu",
                "Service feature cards with icons"
            ],
            demoUrl: "https://fountain-navy.vercel.app",
            githubUrl: "https://github.com/anhquoc061205/fountain"
        },
        wischool: {
            title: "Wischool GPA Calculator",
            badge: "Utility Tool",
            tech: ["HTML", "CSS", "Vanilla JavaScript", "DOM Logic"],
            problem: "Students need a quick, reliable tool to calculate weighted GPA across 9 subjects with input validation and instant feedback — without needing to install any app.",
            solution: "Pure JavaScript DOM manipulation with form input handling, weighted average computation logic, and instant result display. Clean HTML structure with CSS styling for user-friendly interface.",
            keyFeatures: [
                "9-subject GPA weighted average calculator",
                "Input validation for numeric ranges",
                "Instant result computation and display",
                "Clean, minimalistic UI design"
            ],
            demoUrl: "https://wischool-one.vercel.app",
            githubUrl: "https://github.com/anhquoc061205/Wischool"
        }
    };

    function openModal(projectKey) {
        const data = caseStudiesData[projectKey];
        if (!data || !projectModal || !modalBody) return;

        const techTagsHtml = data.tech.map(t => `<span class="tag">${t}</span>`).join(" ");
        const featuresHtml = data.keyFeatures.map(f => `<li><i class="fa-solid fa-check highlight"></i> ${f}</li>`).join("");

        modalBody.innerHTML = `
            <div class="modal-header">
                <span class="project-badge">${data.badge}</span>
                <h2 id="modal-title" style="margin-top:0.75rem; font-size:1.6rem;">${data.title}</h2>
                <div class="tech-tags" style="margin: 0.75rem 0 1.25rem;">${techTagsHtml}</div>
            </div>
            <div class="modal-detail-content" style="display:flex; flex-direction:column; gap:1rem; font-size:0.92rem; color:var(--text-muted);">
                <div>
                    <h4 style="color:var(--text-primary); margin-bottom:0.3rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--cyan-primary);"></i> The Problem</h4>
                    <p>${data.problem}</p>
                </div>
                <div>
                    <h4 style="color:var(--text-primary); margin-bottom:0.3rem;"><i class="fa-solid fa-lightbulb" style="color:#f59e0b;"></i> The Solution</h4>
                    <p>${data.solution}</p>
                </div>
                <div>
                    <h4 style="color:var(--text-primary); margin-bottom:0.3rem;"><i class="fa-solid fa-list-check" style="color:#10b981;"></i> Key Features</h4>
                    <ul style="list-style:none; display:flex; flex-direction:column; gap:0.4rem;">${featuresHtml}</ul>
                </div>
            </div>
            <div style="margin-top:1.75rem; display:flex; gap:0.75rem;">
                <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Project
                </a>
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                    <i class="fa-brands fa-github"></i> GitHub Source
                </a>
            </div>
        `;

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Block body scroll when modal is open
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // Attach click events to all "Case Study" buttons
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".open-modal-btn");
        if (btn) {
            const projectKey = btn.getAttribute("data-project");
            openModal(projectKey);
        }
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
            closeModal();
        }
    });

    // ----------------------------------------------------------------------
    // 5. CONTACT FORM VALIDATION & TOAST NOTIFICATION
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const toast = document.getElementById("toast-notification");
    const toastMessage = document.getElementById("toast-message");

    function showToast(message) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            // Reset errors
            document.querySelectorAll(".form-group").forEach(fg => fg.classList.remove("error"));

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.closest(".form-group").classList.add("error");
                isValid = false;
            }

            // Validate Email Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.closest(".form-group").classList.add("error");
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.closest(".form-group").classList.add("error");
                isValid = false;
            }

            if (isValid) {
                contactForm.reset();
                showToast("Thank you! Your message has been sent successfully.");
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. SEAMLESS INFINITE ROTATING CAROUSEL (TRANSFORM TRANSLATE3D ENGINE)
    // ----------------------------------------------------------------------
    const marqueeWrapper = document.getElementById("marquee-wrapper");
    const marqueeTrack = document.getElementById("marquee-track");
    const prevBtn = document.getElementById("marquee-prev-btn");
    const nextBtn = document.getElementById("marquee-next-btn");

    if (marqueeWrapper && marqueeTrack && prevBtn && nextBtn) {
        let currentX = 0;
        let targetX = 0;
        let isHovered = false;
        let isAnimatingStep = false;
        const autoSpeed = 0.9; // Pixels per frame (~55px/sec)

        // Disable any CSS keyframe animation and overflow limits
        marqueeTrack.style.animation = "none";

        function getHalfWidth() {
            return marqueeTrack.scrollWidth / 2;
        }

        // 60fps Animation loop using translate3d
        function render() {
            const halfWidth = getHalfWidth();

            if (halfWidth > 0) {
                if (isAnimatingStep) {
                    // Smoothly interpolate currentX toward targetX when user clicks Prev/Next
                    currentX += (targetX - currentX) * 0.12;

                    // If close enough to target, finish step animation
                    if (Math.abs(targetX - currentX) < 0.5) {
                        currentX = targetX;
                        isAnimatingStep = false;
                    }
                } else if (!isHovered) {
                    // Continuous auto motion
                    currentX -= autoSpeed;
                    targetX = currentX;
                }

                // Seamless infinite loop wrap-around checks
                while (currentX <= -halfWidth) {
                    currentX += halfWidth;
                    targetX += halfWidth;
                }
                while (currentX > 0) {
                    currentX -= halfWidth;
                    targetX -= halfWidth;
                }

                marqueeTrack.style.transform = `translate3d(${currentX}px, 0, 0)`;
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);

        // Pause auto rotation on mouse hover & touch
        marqueeWrapper.addEventListener("mouseenter", () => { isHovered = true; });
        marqueeWrapper.addEventListener("mouseleave", () => { isHovered = false; });
        marqueeWrapper.addEventListener("touchstart", () => { isHovered = true; }, { passive: true });
        marqueeWrapper.addEventListener("touchend", () => { isHovered = false; });

        // Next Button Click -> Smooth Step Forward (378px)
        nextBtn.addEventListener("click", () => {
            const stepAmount = 378;
            targetX = (isAnimatingStep ? targetX : currentX) - stepAmount;
            isAnimatingStep = true;
        });

        // Prev Button Click -> Smooth Step Backward (378px)
        prevBtn.addEventListener("click", () => {
            const stepAmount = 378;
            targetX = (isAnimatingStep ? targetX : currentX) + stepAmount;
            isAnimatingStep = true;
        });
    }
});
