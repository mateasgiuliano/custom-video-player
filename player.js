document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ player.js loaded!");

    const video = document.getElementById("customPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const muteBtn = document.getElementById("muteBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const seekBar = document.getElementById("seekBar");
    const volumeSlider = document.getElementById("volumeSlider");

    if (!video) {
        console.error("❌ ERROR: Video element 'customPlayer' not found.");
        return;
    }

    // HLS.js Setup (CSP Safe)
    if (Hls.isSupported()) {
        console.log("🚀 HLS.js is supported!");
        const hls = new Hls({
            debug: false,  // Disables eval() debug logging
        });
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8");
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("🎥 Video source loaded!");
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log("🎥 Using native HLS playback.");
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";
    }

    // Play/Pause Button
    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseBtn.innerText = "Pause";
        } else {
            video.pause();
            playPauseBtn.innerText = "Play";
        }
    });

    // Mute Button
    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    });

    // Fullscreen Button
    fullscreenBtn.addEventListener("click", function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
            video.webkitRequestFullscreen();
        }
    });

    // Seek Bar
    video.addEventListener("timeupdate", function () {
        const value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
    });

    seekBar.addEventListener("input", function () {
        const time = (video.duration * seekBar.value) / 100;
        video.currentTime = time;
    });

    // Volume Control
    volumeSlider.addEventListener("input", function () {
        video.volume = volumeSlider.value;
    });

    // 🚀 Tracking Watch Progress
    const trackingPoints = [25, 50, 75, 95, 100]; // Track these points
    const trackedPoints = new Set();

    video.addEventListener("timeupdate", function () {
        const progress = (video.currentTime / video.duration) * 100;
        
        trackingPoints.forEach(point => {
            if (progress >= point && !trackedPoints.has(point)) {
                console.log(`📊 ${point}% watched!`);
                trackedPoints.add(point);
            }
        });
    });
});
