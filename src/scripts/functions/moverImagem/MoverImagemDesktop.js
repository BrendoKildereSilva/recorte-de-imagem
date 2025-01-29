import { ImagePreview } from '../../index'
var isDraggimg = false;
var offsetXImg = 0;
var offsetYImg = 0;
// 
var x = 0;
var y = 0;

ImagePreview.addEventListener('mousedown', (event) => {
  event.preventDefault();
      isDraggimg = true;
      offsetXImg = event.clientX - ImagePreview.getBoundingClientRect().left;
      offsetYImg = event.clientY - ImagePreview.getBoundingClientRect().top;
  });
  
  window.addEventListener('mousemove', (event) => {
  
      if (isDraggimg) {
          const containerRect = document.querySelector('.area_de_trabalho').getBoundingClientRect();
          x = event.clientX - offsetXImg - containerRect.left;
          y = event.clientY - offsetYImg  - containerRect.top;
          ImagePreview.style.top = `${y}px`;
          ImagePreview.style.left = `${x}px`;
   
      }
  
  });
  
  window.addEventListener('mouseup', () => {
      isDraggimg = false
  });
  