document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Minimal Player JS loaded!");

    const video = document.getElementById("customPlayer");
    const volumeIcon = document.getElementById("volumeIcon");
    const volumeSlider = document.getElementById("volumeSlider");
    const seekBar = document.getElementById("seekBar");
    const settingsIcon = document.getElementById("settingsIcon");
    const settingsMenu = document.getElementById("settingsMenu");
    const fullscreenIcon = document.getElementById("fullscreenIcon");
    const playbackSelect = document.getElementById("playbackSelect");

    // ✅ Correct Video ID from Cloudflare Stream
    const videoId = "48dfe82856166ea0935772228fbe428a"; 
    const videoUrl = `https://customer-pcv8v9br19tspxo3.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

    // ✅ HLS.js Video Loading (STAYS AS IT WORKED BEFORE)
    if (Hls.isSupported()) {
        const hls = new Hls({ debug: false });
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("✅ Video source loaded!");
        });
    } else {
        video.src = videoUrl;
    }

    // ✅ Click video to Play/Pause (STAYS AS IT WORKED BEFORE)
    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // ✅ Volume slider logic (STAYS AS IT WORKED BEFORE)
    volumeSlider.addEventListener("input", () => {
        video.volume = volumeSlider.value;
    });

    // ✅ Seek bar tracking & dragging (STAYS AS IT WORKED BEFORE)
    video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        const progress = (video.currentTime / video.duration) * 100;
        seekBar.value = progress;
    });

    seekBar.addEventListener("input", () => {
        const time = (seekBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    // ✅ Settings icon -> toggle settings menu (STAYS AS IT WORKED BEFORE)
    settingsIcon.addEventListener("click", () => {
        settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
    });

    // ✅ Playback speed change (STAYS AS IT WORKED BEFORE)
    if (playbackSelect) {
        playbackSelect.addEventListener("change", () => {
            video.playbackRate = parseFloat(playbackSelect.value);
        });
    }

    // ✅ Fullscreen toggle (STAYS AS IT WORKED BEFORE)
    fullscreenIcon.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // ✅ Tracking progress at key points (STAYS AS IT WORKED BEFORE)
    const trackPoints = [25, 50, 75, 95, 100];
    const tracked = {};
    video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        const percent = (video.currentTime / video.duration) * 100;

        trackPoints.forEach(point => {
            if (percent >= point && !tracked[point]) {
                console.log(`✅ User watched ${point}% of the video.`);
                tracked[point] = true;
            }
        });
    });

    // ✅ Fix Volume Hover Responsiveness
    volumeIcon.addEventListener("mouseenter", () => {
        volumeSlider.style.opacity = "1"; 
        volumeSlider.style.pointerEvents = "all";
    });

    volumeIcon.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!volumeSlider.matches(":hover")) {
                volumeSlider.style.opacity = "0"; 
                volumeSlider.style.pointerEvents = "none";
            }
        }, 200); // Slight delay to allow user interaction
    });

    volumeSlider.addEventListener("mouseleave", () => {
        volumeSlider.style.opacity = "0"; 
        volumeSlider.style.pointerEvents = "none";
    });

    // ✅ THEME CUSTOMIZATION (New but Safe)
    function updateTheme(primaryColor, progressColor, iconOpacity) {
        document.documentElement.style.setProperty("--progress-bar", progressColor);
        document.documentElement.style.setProperty("--icon-opacity", iconOpacity);
    }

    // Example Usage - Can Be Controlled via Dashboard Later
    updateTheme("#ffffff", "#3498db", "0.6");
});
