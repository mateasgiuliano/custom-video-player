/* General Styling */
body {
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.video-container {
    position: relative;
    width: 90%;
    max-width: 800px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

/* Video Frame */
.video-frame {
    width: 100%;
    display: block;
    border-radius: 10px;
}

/* Controls Overlay */
.controls-overlay {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
}

.control-btn {
    background: rgba(0, 255, 255, 0.7);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s ease;
}

.control-btn:hover {
    background: rgba(0, 255, 255, 1);
}

/* Seek & Volume Sliders */
.sliders-container {
    position: absolute;
    bottom: 5px;
    width: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.seek-bar {
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, cyan, blue);
    border-radius: 5px;
    cursor: pointer;
}

.volume-bar {
    width: 60%;
    height: 3px;
    background: linear-gradient(to right, cyan, blue);
    border-radius: 3px;
    cursor: pointer;
}
