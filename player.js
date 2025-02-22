document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 player.js loaded!");

  const video = document.getElementById("customPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const seekBar = document.getElementById("seekBar");
  const volumeSlider = document.getElementById("volumeSlider");

  if (!video) {
    console.error("❌ Video element not found.");
    return;
  }

  // Replace with your actual Cloudflare Stream Video ID
  const videoId = "48dfe82856166ea0935772228fbe428a";
  const videoUrl = `https://customer-pcv8v9br19tspxo3.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

  // Load Cloudflare Stream Video via HLS
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

  // ▶️ Play/Pause
  playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseBtn.innerText = "⏸";
    } else {
      video.pause();
      playPauseBtn.innerText = "▶";
    }
  });

  // 🔇 Mute/Unmute
  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.innerText = video.muted ? "🔇" : "🔊";
  });

  // ⛶ Fullscreen
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // 🎥 Seek Bar
  video.addEventListener("timeupdate", () => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      seekBar.value = progress;
    }
  });

  seekBar.addEventListener("input", () => {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
  });

  // 🔉 Volume Slider
  volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
  });

  // 📊 Tracking 25%, 50%, 75%, 95%, 100%
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
