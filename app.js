/**
 * PORTFOLIO V2 — DYNAMIC PARTICLES & AMBIENT CANVAS BACKGROUND
 * Interactive floating particles with constellation connection lines
 * and ambient glowing depth orbs. 60fps performance optimized.
 */

(function () {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    // Mouse position tracking for interactive particle effect
    const mouse = {
        x: null,
        y: null,
        radius: 140
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", () => {
        resize();
        initParticles();
    });
    resize();

    // Ambient Glowing Background Orbs (Depth Layer)
    const orbs = [
        { x: width * 0.2, y: height * 0.3, radius: 280, color: "rgba(6, 182, 212, 0.08)", vx: 0.2, vy: 0.15 },
        { x: width * 0.8, y: height * 0.6, radius: 320, color: "rgba(99, 102, 241, 0.07)", vx: -0.2, vy: 0.2 },
        { x: width * 0.5, y: height * 0.85, radius: 250, color: "rgba(139, 92, 246, 0.06)", vx: 0.15, vy: -0.2 }
    ];

    // Floating Particles Array
    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.8 + 1; // 1px - 2.8px
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.alpha = Math.random() * 0.5 + 0.3;
            // Palette: Cyan, Indigo, Violet, Bright Slate
            const colors = [
                "rgba(6, 182, 212, ",
                "rgba(99, 102, 241, ",
                "rgba(139, 92, 246, ",
                "rgba(248, 250, 252, "
            ];
            this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce gently off canvas boundary edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse proximity interaction (subtle dynamic repulsion)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 1.5;
                    this.y -= (dy / dist) * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.colorPrefix + this.alpha + ")";
            ctx.shadowColor = "rgba(6, 182, 212, 0.5)";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 13000), 85);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    function connectParticles() {
        const maxDist = 120;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.18;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Ambient Depth Glowing Orbs
        orbs.forEach(orb => {
            orb.x += orb.vx;
            orb.y += orb.vy;

            if (orb.x < 0 || orb.x > width) orb.vx *= -1;
            if (orb.y < 0 || orb.y > height) orb.vy *= -1;

            const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            gradient.addColorStop(0, orb.color);
            gradient.addColorStop(1, "rgba(7, 9, 14, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // 2. Draw Floating Particles & Constellation Connecting Lines
        connectParticles();
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
})();
