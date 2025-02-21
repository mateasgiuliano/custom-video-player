document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ customn-player.js loaded!");

    var video = document.getElementById("customPlayer");

    if (!video) {
        console.error("❌ ERROR: Video element 'customPlayer' not found.");
        return;
    }

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8");
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("✅ Video source loaded!");
            video.play();
        });
    } else {
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";
    }

    // Play/Pause Button
    document.getElementById("playPauseBtn").addEventListener("click", function () {
        if (video.paused) {
            video.play();
            this.innerText = "Pause";
        } else {
            video.pause();
            this.innerText = "Play";
        }
    });

    // Fullscreen Button
    document.getElementById("fullscreenBtn").addEventListener("click", function () {
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

    // Tracking at 25%, 50%, 75%, and 100% Video Watch Progress
    video.addEventListener("timeupdate", function () {
        var progress = (video.currentTime / video.duration) * 100;

        if (progress >= 25 && !video.dataset.tracked25) {
            console.log("📊 Video 25% watched");
            video.dataset.tracked25 = true;
        }
        if (progress >= 50 && !video.dataset.tracked50) {
            console.log("📊 Video 50% watched");
            video.dataset.tracked50 = true;
        }
        if (progress >= 75 && !video.dataset.tracked75) {
            console.log("📊 Video 75% watched");
            video.dataset.tracked75 = true;
        }
        if (progress >= 100 && !video.dataset.tracked100) {
            console.log("🎉 Video fully watched!");
            video.dataset.tracked100 = true;
        }
    });
});
