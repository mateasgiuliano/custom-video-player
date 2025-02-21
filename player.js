{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;}
{\colortbl;\red255\green255\blue255;\red155\green162\blue177;}
{\*\expandedcolortbl;;\cssrgb\c67059\c69804\c74902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww34360\viewh20460\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs26 \cf2 document.addEventListener("DOMContentLoaded", function () \{\
    console.log("\uc0\u9989  player.js loaded!");\
\
    const video = document.getElementById("customPlayer");\
    const playPauseBtn = document.getElementById("playPauseBtn");\
    const muteBtn = document.getElementById("muteBtn");\
    const fullscreenBtn = document.getElementById("fullscreenBtn");\
    const seekBar = document.getElementById("seekBar");\
    const volumeSlider = document.getElementById("volumeSlider");\
\
    if (!video) \{\
        console.error("\uc0\u10060  ERROR: Video element 'customPlayer' not found.");\
        return;\
    \}\
\
    // HLS.js Setup\
    if (Hls.isSupported()) \{\
        console.log("\uc0\u55357 \u56960  HLS.js is supported!");\
        const hls = new Hls();\
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8");\
        hls.attachMedia(video);\
        hls.on(Hls.Events.MANIFEST_PARSED, function () \{\
            console.log("\uc0\u55356 \u57253  Video source loaded!");\
        \});\
    \} else if (video.canPlayType('application/vnd.apple.mpegurl')) \{\
        console.log("\uc0\u55356 \u57253  Using native HLS playback.");\
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";\
    \}\
\
    // Play/Pause Button\
    playPauseBtn.addEventListener("click", function () \{\
        if (video.paused) \{\
            video.play();\
            playPauseBtn.innerText = "Pause";\
        \} else \{\
            video.pause();\
            playPauseBtn.innerText = "Play";\
        \}\
    \});\
\
    // Mute Button\
    muteBtn.addEventListener("click", function () \{\
        video.muted = !video.muted;\
        muteBtn.innerText = video.muted ? "Unmute" : "Mute";\
    \});\
\
    // Fullscreen Button\
    fullscreenBtn.addEventListener("click", function () \{\
        if (video.requestFullscreen) \{\
            video.requestFullscreen();\
        \} else if (video.mozRequestFullScreen) \{ // Firefox\
            video.mozRequestFullScreen();\
        \} else if (video.webkitRequestFullscreen) \{ // Chrome, Safari, Opera\
            video.webkitRequestFullscreen();\
        \}\
    \});\
\
    // Seek Bar\
    video.addEventListener("timeupdate", function () \{\
        const value = (100 / video.duration) * video.currentTime;\
        seekBar.value = value;\
    \});\
\
    seekBar.addEventListener("input", function () \{\
        const time = (video.duration * seekBar.value) / 100;\
        video.currentTime = time;\
    \});\
\
    // Volume Control\
    volumeSlider.addEventListener("input", function () \{\
        video.volume = volumeSlider.value;\
    \});\
\
    // \uc0\u55357 \u56960  Tracking Watch Progress\
    const trackingPoints = [25, 50, 75, 95, 100]; // Track these points\
    const trackedPoints = new Set();\
\
    video.addEventListener("timeupdate", function () \{\
        const progress = (video.currentTime / video.duration) * 100;\
        \
        trackingPoints.forEach(point => \{\
            if (progress >= point && !trackedPoints.has(point)) \{\
                console.log(`\uc0\u55357 \u56522  $\{point\}% watched!`);\
                trackedPoints.add(point);\
            \}\
        \});\
    \});\
\});}