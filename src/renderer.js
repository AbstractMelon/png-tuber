const { ipcRenderer } = require('electron');

// Scale image when receiving stretch and reset events
ipcRenderer.on('stretch-image', () => {
  const img = document.getElementById('vtuber-image');
  img.style.transform = 'scale(1.2)'; // Example scaling
});

ipcRenderer.on('reset-image', () => {
  const img = document.getElementById('vtuber-image');
  img.style.transform = 'scale(1)'; // Reset scaling
});

// Audio processing to detect speech and scale image
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    detectSpeech();
  })
  .catch(err => {
    console.error('Error accessing microphone: ', err);
  });

function detectSpeech() {
  analyser.getByteTimeDomainData(dataArray);
  let sum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += Math.abs(dataArray[i] - 128);
  }
  const average = sum / bufferLength;

  if (average > 10) {
    ipcRenderer.send('stretch-image');
  } else {
    ipcRenderer.send('reset-image');
  }

  requestAnimationFrame(detectSpeech);
}
