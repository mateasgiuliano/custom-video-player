document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Minimal Player JS loaded!");

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

  // HLS.js
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

  // Click on video -> Play/Pause
  video.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });

  // Volume Icon -> (Hover to show slider if needed, or keep always)
  // Already handled in CSS if you want the slider to expand on .left-controls:hover
  volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
  });

  // Seek Bar
  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;
    const progress = (video.currentTime / video.duration) * 100;
    seekBar.value = progress;
  });
  seekBar.addEventListener("input", () => {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
  });

  // Settings Icon -> Toggle settings menu
  settingsIcon.addEventListener("click", () => {
    if (settingsMenu.style.display === "flex") {
      settingsMenu.style.display = "none";
    } else {
      settingsMenu.style.display = "flex";
    }
  });

  // Settings Menu -> Playback Speed
  const playbackSelect = document.getElementById("playbackSelect");
  if (playbackSelect) {
    playbackSelect.addEventListener("change", () => {
      video.playbackRate = parseFloat(playbackSelect.value);
    });
  }

  // Fullscreen Icon
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
