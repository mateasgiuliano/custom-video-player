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

    // ✅ Use your actual Cloudflare Stream Video ID
    const videoId = "48fd8e8285166ea0935772228fbe428a"; 
    const videoUrl = `https://customer-pcv8v9br19tspxo3.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

    // Load Cloudflare Stream Video
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("✅ Video source loaded!");
        });
    } else {
        video.src = videoUrl;
    }

    // 🎯 **Play/Pause Button**
    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            this.innerHTML = "⏸"; // Update icon
        } else {
            video.pause();
            this.innerHTML = "▶️";
        }
    });

    // 🔊 **Mute/Unmute Button**
    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        this.innerHTML = video.muted ? "🔇" : "🔊"; // Toggle mute icon
    });

    // 📺 **Fullscreen Toggle**
    fullscreenBtn.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // 🎥 **Seek Bar Update**
    seekBar.addEventListener("input", function () {
        const seekTime = (video.duration * seekBar.value) / 100;
        video.currentTime = seekTime;
    });

    // 🔉 **Volume Control**
    volumeSlider.addEventListener("input", function () {
        video.volume = volumeSlider.value;
    });

    // ✅ **Tracking for Video Progress**
    let trackingPoints = [25, 50, 75, 95, 100]; // Track at these percentages
    let tracked = {};

    video.addEventListener("timeupdate", function () {
        let percent = (video.currentTime / video.duration) * 100;

        trackingPoints.forEach(point => {
            if (percent >= point && !tracked[point]) {
                console.log(`📊 ${point}% watched!`);
                tracked[point] = true; // Ensure event fires only once
            }
        });

        // 🎯 **Update Seek Bar as Video Plays**
        seekBar.value = (video.currentTime / video.duration) * 100;
    });
});
