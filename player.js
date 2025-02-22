document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 player.js loaded!");

    const video = document.getElementById("customPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const muteBtn = document.getElementById("muteBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const seekBar = document.getElementById("seekBar");
    const volumeSlider = document.getElementById("volumeSlider");

    if (!video) {
        console.error("❌ ERROR: Video element not found.");
        return;
    }

    // Load Cloudflare Stream Video
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/your-video-id/manifest/video.m3u8");
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("✅ Video source loaded!");
        });
    } else {
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/your-video-id/manifest/video.m3u8";
    }

    // Play/Pause Button
    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            this.innerHTML = "⏸"; // Pause Icon
        } else {
            video.pause();
            this.innerHTML = "▶️"; // Play Icon
        }
    });

    // Mute Button
    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        this.innerHTML = video.muted ? "🔇" : "🔊"; // Mute/Unmute Icon
    });

    // Fullscreen Button
    fullscreenBtn.addEventListener("click", function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    // Seek Bar
    video.addEventListener("timeupdate", function () {
        let progress = (video.currentTime / video.duration) * 100;
        seekBar.value = progress;
    });

    seekBar.addEventListener("input", function () {
        let seekTime = (this.value / 100) * video.duration;
        video.currentTime = seekTime;
    });

    // Volume Slider
    volumeSlider.addEventListener("input", function () {
        video.volume = this.value;
    });

    // Video Tracking Points (25%, 50%, 75%, 100%)
    const trackPoints = [0.25, 0.5, 0.75, 1];
    let trackTriggered = [false, false, false, false];

    video.addEventListener("timeupdate", function () {
        let progress = video.currentTime / video.duration;
        trackPoints.forEach((point, index) => {
            if (!trackTriggered[index] && progress >= point) {
                console.log(`✅ ${point * 100}% watched!`);
                trackTriggered[index] = true;
            }
        });
    });
});
