// Function to compress the video
const compressVideo = async () => {
    const videoFile = document.getElementById("videoInput").files[0];
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }
  
    const outputSize = document.getElementById("outputSize").value;
    const outputQuality = document.getElementById("outputQuality").value;
  
    const compressedData = await compressWithFFmpeg(videoFile, outputSize, outputQuality);
    displayVideo(compressedData);
  };
  
  // Function to compress the video using FFmpeg
  const compressWithFFmpeg = async (videoFile, outputSize, outputQuality) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoFile);
    await video.load();
  
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = (video.videoHeight / video.videoWidth) * outputSize;
  
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const compressedBlob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", outputQuality);
    });
  
    return compressedBlob;
  };
  
  // Function to decompress the video
  const decompressVideo = async () => {
    const videoFile = document.getElementById("videoInput").files[0];
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }
  
    const decompressedData = await decompressWithFFmpeg(videoFile);
    displayVideo(decompressedData);
  };
  
  // Function to decompress the video using FFmpeg
  const decompressWithFFmpeg = async (videoFile) => {
    const compressedData = await new Response(videoFile).blob();
    return compressedData;
  };
  