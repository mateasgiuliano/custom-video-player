document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ player.js loaded!");

    const video = document.getElementById("customPlayer");
    const playOverlay = document.getElementById("play-overlay");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const seekBar = document.getElementById("seekBar");
    const muteBtn = document.getElementById("muteBtn");
    const volumeWave = document.getElementById("volume-wave");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    // HLS.js Support
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8");
        hls.attachMedia(video);
    }

    // Play/Pause
    playOverlay.addEventListener("click", function () {
        video.play();
        playOverlay.classList.add("hide");
    });

    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseBtn.innerText = "⏸";
        } else {
            video.pause();
            playPauseBtn.innerText = "▶";
        }
    });

    // Seek Bar
    video.addEventListener("timeupdate", function () {
        let value = (video.currentTime / video.duration) * 100;
        seekBar.value = value;
    });

    // Mute/Unmute
    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        muteBtn.innerText = video.muted ? "🔇" : "🔊";
    });

    // Fullscreen
    fullscreenBtn.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
});
