{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;}
{\colortbl;\red255\green255\blue255;\red155\green162\blue177;}
{\*\expandedcolortbl;;\cssrgb\c67059\c69804\c74902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww34360\viewh20460\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs26 \cf2 document.addEventListener("DOMContentLoaded", function () \{\
    console.log("\uc0\u55357 \u56960  player.js loaded!");\
\
    const video = document.getElementById("customPlayer");\
    const playPauseBtn = document.getElementById("playPauseBtn");\
    const muteBtn = document.getElementById("muteBtn");\
    const fullscreenBtn = document.getElementById("fullscreenBtn");\
    const seekBar = document.getElementById("seekBar");\
    const volumeSlider = document.getElementById("volumeSlider");\
\
    if (!video) \{\
        console.error("\uc0\u10060  ERROR: Video element not found.");\
        return;\
    \}\
\
    // Load Cloudflare Stream Video\
    if (Hls.isSupported()) \{\
        var hls = new Hls();\
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/your-video-id/manifest/video.m3u8");\
        hls.attachMedia(video);\
        hls.on(Hls.Events.MANIFEST_PARSED, function () \{\
            console.log("\uc0\u9989  Video source loaded!");\
        \});\
    \} else \{\
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/your-video-id/manifest/video.m3u8";\
    \}\
\
    // Play/Pause Button\
    playPauseBtn.addEventListener("click", function () \{\
        if (video.paused) \{\
            video.play();\
            this.innerHTML = "\uc0\u9208 "; // Pause Icon\
        \} else \{\
            video.pause();\
            this.innerHTML = "\uc0\u9654 \u65039 "; // Play Icon\
        \}\
    \});\
\
    // Mute Button\
    muteBtn.addEventListener("click", function () \{\
        video.muted = !video.muted;\
        this.innerHTML = video.muted ? "\uc0\u55357 \u56583 " : "\u55357 \u56586 "; // Mute/Unmute Icon\
    \});\
\
    // Fullscreen Button\
    fullscreenBtn.addEventListener("click", function () \{\
        if (video.requestFullscreen) \{\
            video.requestFullscreen();\
        \} else if (video.mozRequestFullScreen) \{\
            video.mozRequestFullScreen();\
        \} else if (video.webkitRequestFullscreen) \{\
            video.webkitRequestFullscreen();\
        \} else if (video.msRequestFullscreen) \{\
            video.msRequestFullscreen();\
        \}\
    \});\
\
    // Seek Bar\
    video.addEventListener("timeupdate", function () \{\
        let progress = (video.currentTime / video.duration) * 100;\
        seekBar.value = progress;\
    \});\
\
    seekBar.addEventListener("input", function () \{\
        let seekTime = (this.value / 100) * video.duration;\
        video.currentTime = seekTime;\
    \});\
\
    // Volume Slider\
    volumeSlider.addEventListener("input", function () \{\
        video.volume = this.value;\
    \});\
\
    // Video Tracking Points (25%, 50%, 75%, 100%)\
    const trackPoints = [0.25, 0.5, 0.75, 1];\
    let trackTriggered = [false, false, false, false];\
\
    video.addEventListener("timeupdate", function () \{\
        let progress = video.currentTime / video.duration;\
        trackPoints.forEach((point, index) => \{\
            if (!trackTriggered[index] && progress >= point) \{\
                console.log(`\uc0\u9989  $\{point * 100\}% watched!`);\
                trackTriggered[index] = true;\
            \}\
        \});\
    \});\
\});}