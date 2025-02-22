document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Minimal Player JS loaded!");

  const video = document.getElementById("customPlayer");
  const volumeSlider = document.getElementById("volumeSlider");
  const seekBar = document.querySelector(".progress-bar");
  const settingsIcon = document.getElementById("settingsIcon");
  const settingsMenu = document.getElementById("settingsMenu");
  const fullscreenIcon = document.getElementById("fullscreenIcon");

  // Load Cloudflare Stream Video
  const videoId = "48dfe82856166ea0935772228fbe428a"; 
  const videoUrl = `https://customer-pcv8v9br19tspxo3.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

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

  // Click to Play/Pause
  video.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });

  // Volume Control
  volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
  });

  // Seek Bar Logic
  video.addEventListener("timeupdate", () => {
    const progress = (video.currentTime / video.duration) * 100;
    document.querySelector(".progress-bar-fill").style.width = `${progress}%`;
    document.querySelector(".progress-bar-handle").style.left = `${progress}%`;
  });

  seekBar.addEventListener("click", (e) => {
    const newTime = (e.offsetX / seekBar.clientWidth) * video.duration;
    video.currentTime = newTime;
  });

  // Settings Toggle
  settingsIcon.addEventListener("click", () => {
    settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
  });

  // Playback Speed
  document.getElementById("playbackSelect").addEventListener("change", (e) => {
    video.playbackRate = parseFloat(e.target.value);
  });

  // Fullscreen Toggle
  fullscreenIcon.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // Tracking at 25%, 50%, 75%, 95%, 100%
  const trackPoints = [25, 50, 75, 95, 100];
  const tracked = {};
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    trackPoints.forEach(point => {
      if (percent >= point && !tracked[point]) {
        console.log(`✅ Watched ${point}%`);
        tracked[point] = true;
      }
    });
  });
});
