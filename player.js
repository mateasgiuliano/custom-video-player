document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Custom Player JS Loaded!");

    const video = document.getElementById("customPlayer");
    const volumeIcon = document.getElementById("volumeIcon");
    const volumeSlider = document.getElementById("volumeSlider");
    const seekBar = document.getElementById("seekBar");
    const settingsIcon = document.getElementById("settingsIcon");
    const settingsMenu = document.getElementById("settingsMenu");
    const fullscreenIcon = document.getElementById("fullscreenIcon");

    // Replace with your Cloudflare Stream Video ID
    const videoId = "48dfe82856166ea0935772228fbe428a"; 
    const videoUrl = `https://customer-pcv8v9br19tspxo3.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

    // HLS.js FIXED
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("✅ Video source loaded!");
        });
    } else {
        video.src = videoUrl;
    }

    // Click-to-Play/Pause
    video.addEventListener("click", () => {
        if (video.paused) video.play();
        else video.pause();
    });

    // Volume Control
    volumeSlider.addEventListener("input", () => {
        video.volume = volumeSlider.value;
    });

    // Seek Bar Update
    video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        seekBar.value = (video.currentTime / video.duration) * 100;
    });

    seekBar.addEventListener("input", () => {
        video.currentTime = (seekBar.value / 100) * video.duration;
    });

    // Settings Menu Toggle
    settingsIcon.addEventListener("click", () => {
        settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
    });

    // Playback Speed
    document.getElementById("playbackSelect").addEventListener("change", (event) => {
        video.playbackRate = parseFloat(event.target.value);
    });

    // Fullscreen Toggle
    fullscreenIcon.addEventListener("click", () => {
        if (!document.fullscreenElement) video.requestFullscreen();
        else document.exitFullscreen();
    });

    // Video Watch Tracking
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
});
