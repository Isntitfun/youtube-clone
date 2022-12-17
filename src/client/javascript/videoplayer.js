const videoContainer = document.getElementById("video-container");
const controlsContainer = document.querySelector(".controls-container");
const volumeContainer = document.getElementById("volume-container");

const video = document.querySelector(".video-watch");
const play = document.getElementById("play");
const mute = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreen");
const textarea = Array.from(document.querySelectorAll("textarea"));

let volumeValue = 1;
let controlsTimeout = null;

// Component f
const formatTime = (time) => {
  const s = 1;
  const m = s * 60;
  const h = m * 60;

  if (time > h) {
    const sec = (time % m) / s;
    const min = ((time - sec) % h) / m;
    const hour = (time - sec - min * m) / h;
    return `${hour}:${min > 10 ? min : "0" + min}:${
      sec > 10 ? sec : "0" + sec
    }`;
  } else if (time > m) {
    const sec = (time % m) / s;
    const min = ((time - sec) % h) / m;

    return `${min}:${sec > 10 ? sec : "0" + sec}`;
  } else {
    const sec = time / s;
    const min = 0;
    return `0:${sec > 10 ? sec : "0" + sec}`;
  }
};
const showControls = () => {
  controlsContainer.classList.add("showing");
};
const hideControls = () => {
  controlsContainer.classList.remove("showing");
};
const changeIcon = (target, boolean) => {
  const defBtn = target.querySelector("i:first-child");
  const modBtn = target.querySelector("i:last-child");
  if (boolean) {
    defBtn.classList.remove("hide-icon");
    modBtn.classList.add("hide-icon");
  } else {
    defBtn.classList.add("hide-icon");
    modBtn.classList.remove("hide-icon");
  }
};

// Execution f
const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  changeIcon(play, video.paused);
  //   play.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
    volume.value = volumeValue;
  } else {
    video.muted = true;
    volume.value = 0;
  }
  changeIcon(mute, !video.muted);
};

const handleVolumeInput = (event) => {
  video.volume = event.target.value;
  volumeValue = event.target.value;
  changeIcon(mute, video.volume != 0);
};

const handleTimlineInput = (event) => {
  video.currentTime = event.target.value;
};

const handleLoadedMetaData = () => {
  const duration = Math.floor(video.duration);
  totalTime.innerText = formatTime(duration);
  timeline.max = duration;
};

const handleTImeUpdate = () => {
  const playTimeText = Math.floor(video.currentTime);
  const playTime = video.currentTime;
  currentTime.innerText = formatTime(playTimeText);
  timeline.value = playTime;
};

const handleFullscreenBtnClick = () => {
  const fullscreen = document.fullscreenElement;
  if (!fullscreen) {
    videoContainer.requestFullscreen();
    changeIcon(fullscreenBtn, fullscreen);

    return;
  }
  document.exitFullscreen();
  changeIcon(fullscreenBtn, fullscreen);
};

const handleVideoMousemove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  showControls();
  controlsTimeout = setTimeout(hideControls, 5000);
};

const handleVideoMouseleave = () => {
  controlsTimeout = setTimeout(hideControls, 1000);
};

const handleVideoClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  changeIcon(play, video.paused);
};

const handleVideoKeydown = (event) => {
  if (
    event.target.tagName.toLowerCase() !== "textarea" &&
    event.keyCode === 32
  ) {
    handleVideoClick();
  }
};

const handleVideoEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`http://localhost:4000/api/viewapi/${id}`, {
    method: "POST",
  });
};

play.addEventListener("click", handlePlayClick);
mute.addEventListener("click", handleMuteClick);
volume.addEventListener("input", handleVolumeInput);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTImeUpdate);
video.addEventListener("click", handleVideoClick);
video.addEventListener("ended", handleVideoEnded);
timeline.addEventListener("input", handleTimlineInput);
fullscreenBtn.addEventListener("click", handleFullscreenBtnClick);
videoContainer.addEventListener("mousemove", handleVideoMousemove);
videoContainer.addEventListener("mouseleave", handleVideoMouseleave);
window.addEventListener("keydown", handleVideoKeydown);
