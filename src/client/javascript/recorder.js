import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const videoDisplay = document.getElementById("video-display");
const recorderBtn = document.getElementById("recorder-btn");
const I = document.querySelector("#recorder-btn i");

let stream = null;
let record = null;
let videoFile = null;
let thumbnailFile = null;

const openStream = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  videoDisplay.srcObject = stream;
  videoDisplay.play();
};
openStream();

const getRecordData = (event) => {
  videoDisplay.srcObject = null;
  videoFile = URL.createObjectURL(event.data);
  videoDisplay.src = videoFile;
  videoDisplay.loop = true;
  videoDisplay.play();
};

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });

  I.classList.remove("fa-download");
  I.classList.add("fa-check");
  I.classList.add("disabled");
  recorderBtn.disabled = true;
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  const filenames = {
    webm: "videoFile.webm",
    mp4: "videoFile.mp4",
    thumb: "thumbnail.jpg",
  };
  const unlink = (...f) => {
    for (let i = 0; i < f.length; i++) {
      ffmpeg.FS("unlink", f[i]);
    }
  };
  const downloadFIle = (URL, filename) => {
    const a = document.createElement("a");
    a.href = URL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  };

  await ffmpeg.FS("writeFile", filenames.webm, await fetchFile(videoFile));
  await ffmpeg.run("-i", filenames.webm, "-r", "60", filenames.mp4);
  await ffmpeg.run(
    "-i",
    filenames.webm,
    "-ss",
    "00:00:01",
    "-vframes",
    "1",
    filenames.thumb
  );

  const arrayBufferVideo = [await ffmpeg.FS("readFile", filenames.mp4).buffer];
  console.log(arrayBufferVideo);
  const arrayBufferThumbnail = [
    await ffmpeg.FS("readFile", filenames.thumb).buffer,
  ];

  const blobVideo = new Blob(arrayBufferVideo, { type: "video/mp4" });
  const blobThumbnail = new Blob(arrayBufferThumbnail, { type: "image/jpg" });
  videoFile = URL.createObjectURL(blobVideo);
  thumbnailFile = URL.createObjectURL(blobThumbnail);

  downloadFIle(videoFile, "MyRecording.mp4");
  downloadFIle(thumbnailFile, "MyThumbnail.jpg");

  unlink(filenames.webm, filenames.mp4, filenames.thumb);
  URL.revokeObjectURL(videoFile, thumbnailFile);

  videoDisplay.srcObject = stream;
  videoDisplay.play();
  I.classList.remove("fa-ellipsis");
  I.classList.remove("disabled");
  I.classList.add("fa-video");
  recorderBtn.disabled = false;
  recorderBtn.removeEventListener("click", handleDownload);
  recorderBtn.addEventListener("click", handleRecord);
};

const handleStop = () => {
  I.classList.remove("fa-stop");
  I.classList.add("fa-download");
  recorderBtn.removeEventListener("click", handleStop);
  recorderBtn.addEventListener("click", handleDownload);

  record.stop();
};

const handleRecord = () => {
  I.classList.remove("fa-video");
  I.classList.add("fa-stop");
  recorderBtn.removeEventListener("click", handleRecord);
  recorderBtn.addEventListener("click", handleStop);
  const recordOption = { mimeType: "video/webm" };
  record = new MediaRecorder(stream, recordOption);
  record.addEventListener("dataavailable", getRecordData);
  record.start();
};

recorderBtn.addEventListener("click", handleRecord);
