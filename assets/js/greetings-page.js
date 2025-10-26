// greetings-page.js
// Page-specific scripts for greetings.html

// Random favicon generator
(function () {
    try {
        const icons = [
            "💻",
            "🚀",
            "🏋️",
            "📚",
            "🎯",
            "💡",
            "🔥",
            "✨",
            "🌟",
            "⚡",
            "🎨",
            "📊",
            "🧠",
            "💪",
            "🌐",
            "📱",
            "⚙️",
            "🔧",
        ];
        const e = icons[Math.floor(Math.random() * icons.length)];
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#3b6fa6";
        ctx.fillRect(0, 0, 64, 64);
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(e, 32, 32);
        const link = document.getElementById("dynamic-favicon") || document.createElement("link");
        link.rel = "icon";
        link.href = canvas.toDataURL();
        if (!document.getElementById("dynamic-favicon")) document.head.appendChild(link);
    } catch (e) {
        /* ignore */
    }
})();

// Initialize particles.js background
document.addEventListener("DOMContentLoaded", function () {
    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#667eea" },
                shape: { type: "circle" },
                opacity: { value: 0.15, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.05 } },
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
                line_linked: { enable: true, distance: 150, color: "#667eea", opacity: 0.08, width: 1 },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true,
                },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.25 } }, push: { particles_nb: 2 } },
            },
            retina_detect: true,
        });
    }

    // Map modal functionality
    const mapBtn = document.getElementById("map-btn");
    const mapModal = document.getElementById("map-modal");
    const modalClose = mapModal.querySelector(".modal-close");

    // Load location media dynamically
    (async function () {
        try {
            const resp = await fetch("/assets/data/location_media.json");
            const data = await resp.json();
            const container = document.getElementById("location-media-container");

            if (data.video && data.video.youtube_id) {
                const videoDiv = document.createElement("div");
                videoDiv.className = "location-video";
                videoDiv.innerHTML = `
            <div style="position:relative;">
              <iframe 
                width="100%" 
                height="400" 
                src="https://www.youtube-nocookie.com/embed/${data.video.youtube_id}?rel=0&modestbranding=1" 
                title="${data.video.title || "Guatemala Video"}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style="border-radius:12px;">
              </iframe>
              <div style="margin-top:12px;text-align:center;">
                <a href="https://www.youtube.com/watch?v=${
                    data.video.youtube_id
                }" target="_blank" rel="noopener noreferrer" 
                   style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:rgba(102,126,234,0.9);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;transition:all .2s ease;"
                   onmouseover="this.style.background='rgba(102,126,234,1)';this.style.transform='translateY(-2px)'"
                   onmouseout="this.style.background='rgba(102,126,234,0.9)';this.style.transform='translateY(0)'">
                  📺 Watch on YouTube
                </a>
              </div>
            </div>
          `;
                container.appendChild(videoDiv);
            }

            if (data.photos && data.photos.length > 0) {
                const photosDiv = document.createElement("div");
                photosDiv.className = "location-photos";
                data.photos.forEach((photo) => {
                    const img = document.createElement("img");
                    img.src = photo.url;
                    img.alt = photo.alt || "Guatemala photo";
                    img.loading = "lazy";
                    photosDiv.appendChild(img);
                });
                container.appendChild(photosDiv);
            }
        } catch (e) {
            console.warn("Could not load location media", e);
        }
    })();

    mapBtn.addEventListener("click", () => {
        mapModal.classList.add("show");
        mapModal.setAttribute("aria-hidden", "false");
    });

    modalClose.addEventListener("click", () => {
        mapModal.classList.remove("show");
        mapModal.setAttribute("aria-hidden", "true");
    });

    mapModal.addEventListener("click", (e) => {
        if (e.target === mapModal) {
            mapModal.classList.remove("show");
            mapModal.setAttribute("aria-hidden", "true");
        }
    });

    // Mouse follower effect
    (function () {
        try {
            const dot = document.createElement("div");
            dot.id = "mouse-follower";
            dot.setAttribute("aria-hidden", "true");
            Object.assign(dot.style, {
                position: "fixed",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "rgba(255,255,255,0.12)",
                mixBlendMode: "screen",
                transform: "translate(-50%,-50%)",
                transition: "transform .08s linear, opacity .2s",
                zIndex: 2,
            });
            document.body.appendChild(dot);
            let last = 0;
            window.addEventListener("mousemove", function (ev) {
                const now = Date.now();
                if (now - last < 8) return;
                last = now;
                dot.style.left = ev.clientX + "px";
                dot.style.top = ev.clientY + "px";
                dot.style.opacity = "1";
            });
            window.addEventListener("mouseout", () => (dot.style.opacity = "0"));
        } catch (e) {
            /* ignore */
        }
    })();
});
