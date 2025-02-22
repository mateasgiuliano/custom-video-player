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

    // Replace with your Cloudflare Stream Video ID
    const videoId = "48dfe82856166ea0935772228fbe428a";
    const videoUrl = `https://customer-pcv8v9br19tspxo3.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

    // Load video via HLS.js if supported
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

    // Play/Pause on Video Click
    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Volume slider logic
    volumeSlider.addEventListener("input", () => {
        video.volume = volumeSlider.value;
    });

    // Seek bar logic
    video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        const progress = (video.currentTime / video.duration) * 100;
        seekBar.value = progress;
    });

    seekBar.addEventListener("input", () => {
        const time = (seekBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    // Settings icon -> toggle settings menu
    settingsIcon.addEventListener("click", () => {
        settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
    });

    // Playback speed change
    if (playbackSelect) {
        playbackSelect.addEventListener("change", () => {
            video.playbackRate = parseFloat(playbackSelect.value);
        });
    }

    // Fullscreen toggle
    fullscreenIcon.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Tracking progress at key points (25%, 50%, 75%, 95%, 100%)
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

    // **THEME CUSTOMIZATION FUNCTION**
    function updateTheme(primaryColor, bgOpacity) {
        document.documentElement.style.setProperty("--progress-bar", primaryColor);
        document.documentElement.style.setProperty("--control-bg", `rgba(255, 255, 255, ${bgOpacity})`);
    }

    // Example Usage (change dynamically later)
    updateTheme("#ff5733", 0.5);
});
