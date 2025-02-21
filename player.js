document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ player.js loaded!");

    var video = document.getElementById("customPlayer");

    if (!video) {
        console.error("🚨 ERROR: Video element 'customPlayer' not found.");
        return;
    }

    // Cloudflare Stream Video URL
    var videoURL = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";

    // Load HLS video for browsers that support it
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoURL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("✅ Video source loaded!");
        });
    } else {
        video.src = videoURL;
    }

    // Play/Pause button
    document.getElementById("playPauseBtn").addEventListener("click", function () {
        if (video.paused) {
            video.play();
            this.innerText = "Pause";
        } else {
            video.pause();
            this.innerText = "Play";
        }
    });

    // Mute button
    document.getElementById("muteBtn").addEventListener("click", function () {
        video.muted = !video.muted;
        this.innerText = video.muted ? "Unmute" : "Mute";
    });

    // Fullscreen button
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

    // Volume Control
    document.getElementById("volumeSlider").addEventListener("input", function () {
        video.volume = this.value;
    });

    // Seekbar
    document.getElementById("seekBar").addEventListener("input", function () {
        var seekTo = video.duration * (this.value / 100);
        video.currentTime = seekTo;
    });

    // Update seekbar
    video.addEventListener("timeupdate", function () {
        var progress = (video.currentTime / video.duration) * 100;
        document.getElementById("seekBar").value = progress;
    });

    // 📊 Tracking Video Progress (25%, 50%, 75%, 100%)
    var progressTracked = { "25": false, "50": false, "75": false, "100": false };

    video.addEventListener("timeupdate", function () {
        var percentWatched = (video.currentTime / video.duration) * 100;

        if (percentWatched >= 25 && !progressTracked["25"]) {
            console.log("📊 25% watched!");
            progressTracked["25"] = true;
        }
        if (percentWatched >= 50 && !progressTracked["50"]) {
            console.log("📊 50% watched!");
            progressTracked["50"] = true;
        }
        if (percentWatched >= 75 && !progressTracked["75"]) {
            console.log("📊 75% watched!");
            progressTracked["75"] = true;
        }
        if (percentWatched >= 100 && !progressTracked["100"]) {
            console.log("📊 100% (Complete) watched!");
            progressTracked["100"] = true;
        }
    });

});
