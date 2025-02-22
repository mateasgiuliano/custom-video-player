document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ player.js loaded!");

    var video = document.getElementById("customPlayer");
    if (!video) {
        console.error("❌ ERROR: Video element 'customPlayer' not found.");
        return;
    }

    // ✅ Load HLS Video
    if (Hls.isSupported()) {
        var hls = new Hls({ debug: false });
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8");
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log("✅ Video source loaded!");
        });
    } else {
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";
    }

    // ✅ Play/Pause
    document.getElementById("playPauseBtn").addEventListener("click", function () {
        if (video.paused) {
            video.play();
            this.innerText = "⏸";
        } else {
            video.pause();
            this.innerText = "▶";
        }
    });

    // ✅ Mute/Unmute
    document.getElementById("muteBtn").addEventListener("click", function () {
        video.muted = !video.muted;
        this.innerText = video.muted ? "🔊" : "🔇";
    });

    // ✅ Fullscreen
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

    // ✅ Seek Bar
    var seekBar = document.getElementById("seekBar");
    video.addEventListener("timeupdate", function () {
        var value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
    });
    seekBar.addEventListener("input", function () {
        var time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    // ✅ Volume Slider
    var volumeSlider = document.getElementById("volumeSlider");
    volumeSlider.value = video.volume;
    volumeSlider.addEventListener("input", function () {
        video.volume = this.value;
    });

    // ✅ Progress Tracking (25%, 50%, 75%, 100%)
    let progressTracked = { 25: false, 50: false, 75: false, 100: false };
    video.addEventListener("timeupdate", function () {
        var percentWatched = (video.currentTime / video.duration) * 100;
        if (percentWatched >= 25 && !progressTracked[25]) {
            console.log("📊 25% watched!");
            progressTracked[25] = true;
        }
        if (percentWatched >= 50 && !progressTracked[50]) {
            console.log("📊 50% watched!");
            progressTracked[50] = true;
        }
        if (percentWatched >= 75 && !progressTracked[75]) {
            console.log("📊 75% watched!");
            progressTracked[75] = true;
        }
        if (percentWatched >= 100 && !progressTracked[100]) {
            console.log("🎉 Video fully watched!");
            progressTracked[100] = true;
        }
    });
});
