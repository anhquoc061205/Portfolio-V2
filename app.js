/**
 * PORTFOLIO V2 — LIGHTWEIGHT AMBIENT CANVAS BACKGROUND
 * Optimized for high performance (60fps, low CPU usage).
 * Draws subtle glowing gradient orbs that drift gently in the dark background.
 */

(function () {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    // Subtle Glowing Orbs Data
    const orbs = [
        { x: width * 0.2, y: height * 0.3, radius: 250, color: "rgba(6, 182, 212, 0.08)", vx: 0.3, vy: 0.2 },
        { x: width * 0.8, y: height * 0.6, radius: 300, color: "rgba(99, 102, 241, 0.07)", vx: -0.25, vy: 0.3 },
        { x: width * 0.5, y: height * 0.8, radius: 220, color: "rgba(139, 92, 246, 0.06)", vx: 0.2, vy: -0.25 }
    ];

    function draw() {
        ctx.clearRect(0, 0, width, height);

        orbs.forEach(orb => {
            // Move orbs gently
            orb.x += orb.vx;
            orb.y += orb.vy;

            // Bounce off boundaries
            if (orb.x < 0 || orb.x > width) orb.vx *= -1;
            if (orb.y < 0 || orb.y > height) orb.vy *= -1;

            // Radial gradient glow
            const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            gradient.addColorStop(0, orb.color);
            gradient.addColorStop(1, "rgba(7, 9, 14, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
})();
