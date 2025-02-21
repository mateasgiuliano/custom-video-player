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
        console.error("\uc0\u10060  ERROR: Video element 'customPlayer' not found.");\
        return;\
    \}\
\
    if (Hls.isSupported()) \{\
        var hls = new Hls();\
        hls.loadSource("https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8");\
        hls.attachMedia(video);\
        hls.on(Hls.Events.MANIFEST_PARSED, function () \{\
            console.log("\uc0\u9989  Video source loaded!");\
        \});\
    \} else \{\
        video.src = "https://customer-pcv8v9br19tspxo3.cloudflarestream.com/48dfe82856166ea0935772228fbe428a/manifest/video.m3u8";\
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
    // Seek bar\
    var seekBar = document.getElementById("seekBar");\
    seekBar.addEventListener("input", function () \{\
        video.currentTime = (video.duration * seekBar.value) / 100;\
    \});\
\
    video.addEventListener("timeupdate", function () \{\
        seekBar.value = (100 * video.currentTime) / video.duration;\
    \});\
\
    // Volume control\
    var volumeSlider = document.getElementById("volumeSlider");\
    volumeSlider.addEventListener("input", function () \{\
        video.volume = volumeSlider.value;\
    \});\
\
    // \uc0\u9989  Add tracking for 25%, 50%, 75%, 95%, and Complete Video Watch\
    var trackedPoints = \{ "25%": false, "50%": false, "75%": false, "95%": false, "100%": false \};\
\
    video.addEventListener("timeupdate", function () \{\
        var watchedPercentage = (video.currentTime / video.duration) * 100;\
\
        if (watchedPercentage >= 25 && !trackedPoints["25%"]) \{\
            trackedPoints["25%"] = true;\
            console.log("\uc0\u9989  User watched 25% of the video.");\
        \}\
        if (watchedPercentage >= 50 && !trackedPoints["50%"]) \{\
            trackedPoints["50%"] = true;\
            console.log("\uc0\u9989  User watched 50% of the video.");\
        \}\
        if (watchedPercentage >= 75 && !trackedPoints["75%"]) \{\
            trackedPoints["75%"] = true;\
            console.log("\uc0\u9989  User watched 75% of the video.");\
        \}\
        if (watchedPercentage >= 95 && !trackedPoints["95%"]) \{\
            trackedPoints["95%"] = true;\
            console.log("\uc0\u9989  User watched 95% of the video.");\
        \}\
        if (watchedPercentage >= 99 && !trackedPoints["100%"]) \{\
            trackedPoints["100%"] = true;\
            console.log("\uc0\u9989  User watched 100% (Completed the video).");\
        \}\
    \});\
\});}