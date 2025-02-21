{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;}
{\colortbl;\red255\green255\blue255;\red155\green162\blue177;}
{\*\expandedcolortbl;;\cssrgb\c67059\c69804\c74902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww34360\viewh20460\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs26 \cf2 document.addEventListener("DOMContentLoaded", function () \{\
    console.log("\uc0\u9989  player.js loaded!");\
\
    var video = document.getElementById("customPlayer");\
\
    if (!video) \{\
        console.error("\uc0\u55357 \u57000  ERROR: Video element 'customPlayer' not found.");\
        return;\
    \}\
\
    // Cloudflare Stream Video URL\
    var videoURL = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";\
\
    if (Hls.isSupported()) \{\
        var hls = new Hls();\
        hls.loadSource(videoURL);\
        hls.attachMedia(video);\
        hls.on(Hls.Events.MANIFEST_PARSED, function () \{\
            console.log("\uc0\u9989  Video source loaded!");\
        \});\
    \} else \{\
        video.src = videoURL;\
    \}\
\
    // Play/Pause button\
    document.getElementById("playPauseBtn").addEventListener("click", function () \{\
        if (video.paused) \{\
            video.play();\
            this.innerText = "Pause";\
        \} else \{\
            video.pause();\
            this.innerText = "Play";\
        \}\
    \});\
\
    // Mute button\
    document.getElementById("muteBtn").addEventListener("click", function () \{\
        video.muted = !video.muted;\
        this.innerText = video.muted ? "Unmute" : "Mute";\
    \});\
\
    // Fullscreen button\
    document.getElementById("fullscreenBtn").addEventListener("click", function () \{\
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
    // Volume Control\
    document.getElementById("volumeSlider").addEventListener("input", function () \{\
        video.volume = this.value;\
    \});\
\
    // Seekbar\
    document.getElementById("seekBar").addEventListener("input", function () \{\
        var seekTo = video.duration * (this.value / 100);\
        video.currentTime = seekTo;\
    \});\
\
    // Update seekbar\
    video.addEventListener("timeupdate", function () \{\
        var progress = (video.currentTime / video.duration) * 100;\
        document.getElementById("seekBar").value = progress;\
    \});\
\
    // Tracking Video Progress\
    var progressTracked = \{ "25": false, "50": false, "75": false, "100": false \};\
\
    video.addEventListener("timeupdate", function () \{\
        var percentWatched = (video.currentTime / video.duration) * 100;\
\
        if (percentWatched >= 25 && !progressTracked["25"]) \{\
            console.log("\uc0\u55357 \u56522  25% watched!");\
            progressTracked["25"] = true;\
        \}\
        if (percentWatched >= 50 && !progressTracked["50"]) \{\
            console.log("\uc0\u55357 \u56522  50% watched!");\
            progressTracked["50"] = true;\
        \}\
        if (percentWatched >= 75 && !progressTracked["75"]) \{\
            console.log("\uc0\u55357 \u56522  75% watched!");\
            progressTracked["75"] = true;\
        \}\
        if (percentWatched >= 100 && !progressTracked["100"]) \{\
            console.log("\uc0\u55357 \u56522  100% (Complete) watched!");\
            progressTracked["100"] = true;\
        \}\
    \});\
\
\});}