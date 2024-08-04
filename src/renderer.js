const { ipcRenderer } = require('electron');

ipcRenderer.on('update-image', (event, data) => {
  const img = document.getElementById('vtuber-image');
  img.src = data;
});

ipcRenderer.on('stretch-image', () => {
  const img = document.getElementById('vtuber-image');
  img.style.transform = 'scale(1.2)'; 
});

ipcRenderer.on('reset-image', () => {
  const img = document.getElementById('vtuber-image');
  img.style.transform = 'scale(1)'; 
});
